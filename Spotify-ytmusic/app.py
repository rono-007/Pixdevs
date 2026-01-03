from flask import Flask, render_template, request, redirect, session, url_for, Response, stream_with_context, jsonify
import os
import json
import time
from dotenv import load_dotenv
from spotify_service import SpotifyService
from ytmusic_service import YTMusicService

load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Initialize Services
spotify_service = SpotifyService()
# We initialize YTMusicService lazily or check it on use, 
# but for now let's assume oauth.json is there or will be handled.
yt_service = YTMusicService()

@app.route('/')
def index():
    # Check if user is logged in to Spotify
    token_info = session.get('token_info')
    is_logged_in = False
    if token_info:
        is_logged_in = True
    
    return render_template('index.html', is_logged_in=is_logged_in)

@app.route('/login')
def login():
    # JIT Config Check:
    if not spotify_service.is_configured() or not yt_service.is_configured():
        # Redirect to setup, and come back to login afterwards
        return redirect(url_for('setup', next='login'))

    auth_url = spotify_service.get_auth_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    code = request.args.get('code')
    if code:
        # Service now handles saving token to session via FlaskSessionCacheHandler
        spotify_service.get_token(code)
    return redirect(url_for('index'))

    return redirect(url_for('index'))

@app.route('/setup', methods=['GET', 'POST'])
def setup():
    if request.method == 'POST':
        # 1. Spotify Credentials
        s_id = request.form.get('spotify_client_id')
        s_secret = request.form.get('spotify_client_secret')
        
        # 2. YT Credentials (Json File or Text)
        yt_json_file = request.files.get('yt_browser_json')
        yt_headers_text = request.form.get('yt_headers_text')

        # --- Validation ---
        if not s_id or not s_secret:
            return render_template('setup.html', error="Missing Spotify Credentials")
        
        # Configure Spotify
        if not spotify_service.validate_and_setup(s_id, s_secret):
             return render_template('setup.html', error="Invalid Spotify Credentials. Could not authenticate.")
        
        # Configure YTMusic
        yt_success = False
        if yt_json_file and yt_json_file.filename != '':
            try:
                content = yt_json_file.read().decode('utf-8')
                yt_success = yt_service.setup_from_json(content)
            except Exception as e:
                return render_template('setup.html', error=f"Invalid browser.json: {e}")
        elif yt_headers_text and yt_headers_text.strip():
            yt_success = yt_service.setup_from_headers(yt_headers_text)
        else:
            # Check if it was already configured (e.g. existing browser.json on disk)
            if yt_service.is_configured():
                # Re-validate existing
                yt_success = yt_service._validate()
            else:
                 return render_template('setup.html', error="Missing YouTube Music Credentials")

        if not yt_success:
             return render_template('setup.html', error="Failed to authenticate with YouTube Music. Please check headers/json.")
        
        # Success!
        next_route = request.form.get('next')
        if next_route == 'login' or not next_route:
            return redirect(url_for('login'))
        
        return redirect(url_for('index'))

    return render_template('setup.html')

@app.route('/analyze/<playlist_id>')
def analyze_playlist(playlist_id):
    if not spotify_service.is_configured():
        return jsonify({'error': 'Spotify not configured'}), 401
    
    data = spotify_service.analyze_playlist(playlist_id)
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'Analysis failed'}), 500

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/docs')
def docs():
    return render_template('docs.html')

@app.route('/convert', methods=['POST'])
def convert():
    token_info = session.get('token_info')
    if not token_info:
        return json.dumps({'error': 'Not authenticated with Spotify'}), 401

    playlist_url = request.form.get('playlist_url')
    if not playlist_url:
        return json.dumps({'error': 'No playlist URL provided'}), 400

    def generate():
        try:
            yield f"data: {json.dumps({'status': 'Fetching Spotify playlist...'})}\n\n"
            
            yield f"data: {json.dumps({'status': 'Fetching Spotify playlist...'})}\n\n"
            
            # Auth is now handled internally by the service (using Flask Session)
            # which automatically refreshes the token if needed.
            playlist_name, tracks = spotify_service.get_playlist_tracks(playlist_url)
            total_tracks = len(tracks)
            
            yield f"data: {json.dumps({'status': 'Playlist fetched', 'total': total_tracks, 'playlist_name': playlist_name})}\n\n"

            yield f"data: {json.dumps({'status': 'Playlist fetched', 'total': total_tracks, 'playlist_name': playlist_name})}\n\n"

            
            # Create YT Music Playlist
            yt_playlist_name = f"Spotify – {playlist_name}"
            yt_description = "Converted from Spotify using a free Python tool"
            
            yield f"data: {json.dumps({'status': 'Creating YouTube Music playlist...'})}\n\n"
            
            try:
                playlist_id = yt_service.create_playlist(yt_playlist_name, yt_description)
            except Exception as e:
                yield f"data: {json.dumps({'error': f'Failed to create playlist: {str(e)}'})}\n\n"
                return

            added_count = 0
            skipped_count = 0

            for index, track in enumerate(tracks):
                track_name = track['name']
                artist_name = track['artist']
                query = f"{track_name} {artist_name}"
                
                yield f"data: {json.dumps({'status': 'processing', 'current_track': track_name, 'artist': artist_name, 'progress': index + 1, 'total': total_tracks, 'added': added_count, 'skipped': skipped_count})}\n\n"
                
                # Search on YT Music
                search_result = yt_service.search_song(query)
                
                if search_result:
                    video_id = search_result['videoId']
                    # Optional: Verify duration if needed, but for now we trust the top result
                    
                    success = yt_service.add_track_to_playlist(playlist_id, video_id)
                    if success:
                        added_count += 1
                    else:
                        skipped_count += 1
                else:
                    skipped_count += 1
                
                # Small delay to be nice to the API
                time.sleep(0.5)

            yield f"data: {json.dumps({'status': 'completed', 'added': added_count, 'skipped': skipped_count, 'playlist_id': playlist_id})}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return Response(stream_with_context(generate()), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True, port=5000)

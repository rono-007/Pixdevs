import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth, SpotifyClientCredentials
from spotipy.cache_handler import CacheHandler
from flask import session

class FlaskSessionCacheHandler(CacheHandler):
    """
    A cache handler that stores the token info in the Flask session.
    This ensures that tokens are stored in memory (or whatever backend Flask session uses)
    and are unique to each user session.
    """
    def __init__(self, session_key='token_info'):
        self.session_key = session_key

    def get_cached_token(self):
        token_info = session.get(self.session_key)
        return token_info

    def save_token_to_cache(self, token_info):
        session[self.session_key] = token_info

class SpotifyService:
    def __init__(self):
        # Strict Manual Mode: No environment variables
        self.client_id = None
        self.client_secret = None
        self.redirect_uri = 'http://127.0.0.1:5000/callback'
        self.scope = "playlist-read-private"

    def is_configured(self):
        return bool(self.client_id and self.client_secret)

    def validate_and_setup(self, client_id, client_secret):
        """
        Validates the credentials by attempting to get a client token.
        If successful, saves them to the instance.
        """
        try:
            # Check if credentials work by requesting a token (Client Credentials Flow)
            # This verifies the ID and Secret are a valid pair on Spotify.
            cc_manager = SpotifyClientCredentials(
                client_id=client_id, 
                client_secret=client_secret
            )
            cc_manager.get_access_token()
            
            # If no exception, credentials are valid
            self.client_id = client_id
            self.client_secret = client_secret
            return True
        except Exception as e:
            print(f"Spotify Validation Failed: {e}")
            return False

    def get_auth_manager(self):
        """
        Returns a SpotifyOAuth object with a custom cache handler that syncs with Flask session.
        """
        if not self.is_configured():
            raise Exception("Spotify credentials not set. Please go to /setup")
            
        cache_handler = FlaskSessionCacheHandler()
        return SpotifyOAuth(
            client_id=self.client_id,
            client_secret=self.client_secret,
            redirect_uri=self.redirect_uri,
            scope=self.scope,
            show_dialog=True,
            cache_handler=cache_handler
        )

    def get_auth_url(self):
        auth_manager = self.get_auth_manager()
        return auth_manager.get_authorize_url()

    def get_token(self, code):
        auth_manager = self.get_auth_manager()
        # This will automatically save the token to the session via the cache handler
        token_info = auth_manager.get_access_token(code)
        return token_info

    def get_spotify_client(self):
        """
        Returns a valid spotipy.Spotify client.
        Automatically handles token refreshing using the refresh_token in the session.
        """
        auth_manager = self.get_auth_manager()
        
        # Get the token info from the session (via cache handler)
        token_info = auth_manager.cache_handler.get_cached_token()
        
        if not token_info:
            return None
            
        # validate_token checks expiry and refreshes if needed. 
        # If it refreshes, it calls save_token_to_cache (updating the session).
        try:
            token_info = auth_manager.validate_token(token_info)
        except Exception:
            # If refresh fails, return None (calling code should handle re-login)
            return None

        if not token_info:
            return None
            
        return spotipy.Spotify(auth=token_info['access_token'])

    def analyze_playlist(self, playlist_id):
        """
        Analyzes playlist audio features and genres to determine mood.
        Returns a dict with stats, curve data, and mood labels.
        """
        sp = self.get_spotify_client()
        if not sp:
            return None

        try:
            # 1. Fetch Tracks (Limit to first 50 for speed/relevance in this demo)
            results = sp.playlist_items(playlist_id, limit=50)
            items = results['items']
            track_ids = []
            artist_ids = set()
            
            for item in items:
                track = item.get('track')
                if track and track.get('id'):
                    track_ids.append(track['id'])
                    for artist in track.get('artists', []):
                        if artist.get('id'):
                            artist_ids.add(artist['id'])

            if not track_ids:
                return None

            # 2. Fetch Audio Features (Batch)
            features_list = []
            try:
                # Spotify allows 100 ids per request
                features_list = sp.audio_features(track_ids)
            except Exception as e:
                print(f"Audio Features fetch failed (likely 403 restricted): {e}")
                features_list = [] # Proceed without features
            
            # 3. Calculate Stats
            total_energy = 0
            total_valence = 0
            energy_curve = []
            valence_curve = []
            valid_count = 0

            # Fallback for when features are empty or restricted
            if not features_list or all(f is None for f in features_list):
                 # Create neutral dummy data so visualization doesn't break
                 for _ in track_ids:
                     energy_curve.append(0.5)
                     valence_curve.append(0.5)
                 avg_energy = 0.5
                 avg_valence = 0.5
                 valid_count = len(track_ids)
            else:
                for f in features_list:
                    if f:
                        total_energy += f['energy']
                        total_valence += f['valence']
                        energy_curve.append(round(f['energy'], 2))
                        valence_curve.append(round(f['valence'], 2))
                        valid_count += 1
                    else:
                        energy_curve.append(0.5) # Fallback
                        valence_curve.append(0.5)

                avg_energy = total_energy / valid_count if valid_count > 0 else 0.5
                avg_valence = total_valence / valid_count if valid_count > 0 else 0.5

            # 4. Determine Mood Label
            mood_label = "Neutral"
            if avg_energy > 0.65:
                if avg_valence > 0.6: mood_label = "Exuberant / Pumped"
                else: mood_label = "Intense / Aggressive"
            elif avg_energy < 0.35:
                if avg_valence > 0.6: mood_label = "Peaceful / Calm"
                else: mood_label = "Melancholic / Sad"
            else:
                if avg_valence > 0.6: mood_label = "Happy / Chill"
                elif avg_valence < 0.4: mood_label = "Moody / Dark"
                else: mood_label = "Balanced / Focused"

            # 5. Fetch Genres (aggregating efficiently)
            # Limit artist fetch to top 20 to save API calls time
            artist_check_ids = list(artist_ids)[:20]
            if artist_check_ids:
                artists_info = sp.artists(artist_check_ids)
                genre_counts = {}
                for artist in artists_info['artists']:
                    for genre in artist.get('genres', []):
                        genre_counts[genre] = genre_counts.get(genre, 0) + 1
                
                # Sort and take top 5
                sorted_genres = sorted(genre_counts.items(), key=lambda x: x[1], reverse=True)[:5]
                top_genres = {k: v for k, v in sorted_genres}
            else:
                top_genres = {}

            return {
                "mood_label": mood_label,
                "avg_energy": round(avg_energy, 2),
                "avg_valence": round(avg_valence, 2),
                "energy_curve": energy_curve,
                "valence_curve": valence_curve,
                "genres": top_genres,
                "track_count": valid_count
            }

        except Exception as e:
            print(f"Analysis failed: {e}")
            return None

    def get_playlist_tracks(self, playlist_url):
        """
        Fetches tracks from the given Spotify playlist URL.
        Uses the internal get_spotify_client to ensure valid auth.
        """
        sp = self.get_spotify_client()
        if not sp:
            raise Exception("Session expired. Please login again.")

        try:
            results = sp.playlist_items(playlist_url, limit=100)
            tracks = results['items']
            
            while results['next']:
                results = sp.next(results)
                tracks.extend(results['items'])
            
            cleaned_tracks = []
            for item in tracks:
                track = item.get('track')
                if not track or track.get('is_local'):
                    continue
                
                cleaned_tracks.append({
                    'name': track['name'],
                    'artist': track['artists'][0]['name'] if track['artists'] else "Unknown Artist",
                    'id': track['id'],
                    'artist_id': track['artists'][0]['id'] if track['artists'] else None,
                    'duration_ms': track['duration_ms'],
                    'uri': track['uri']
                })
            
            playlist_info = sp.playlist(playlist_url, fields="name")
            playlist_name = playlist_info['name']

            return playlist_name, cleaned_tracks
            
        except Exception as e:
            print(f"Error fetching playlist: {e}")
            raise e



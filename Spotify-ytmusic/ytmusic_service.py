from ytmusicapi import YTMusic
import time

class YTMusicService:
    def __init__(self):
        # Dictionary to store config if manually setup
        self.auth_data = None 
        # Attempt minimal init if browser.json exists on disk, else None
        try:
            self.yt = YTMusic("browser.json")
        except Exception:
            self.yt = None

    def is_configured(self):
        return self.yt is not None

    def _validate(self):
        """
        Performs a test search to verify credentials work.
        """
        try:
            # Try a lightweight search
            self.yt.search("test", limit=1)
            return True
        except Exception as e:
            print(f"YTMusic Validation Failed: {e}")
            self.yt = None # Reset on failure
            return False

    def setup_from_json(self, json_data):
        """
        Initialize using a dictionary (parsed from browser.json or constructed).
        """
        try:
            import json
            if isinstance(json_data, str):
                self.auth_data = json.loads(json_data)
            else:
                self.auth_data = json_data
                
            self.yt = YTMusic(self.auth_data)
            return self._validate()
        except Exception as e:
            print(f"Setup failed: {e}")
            return False

    def setup_from_headers(self, headers_raw):
        """
        Initialize using raw headers string.
        """
        try:
            self.yt = YTMusic(auth=headers_raw)
            return self._validate()
        except Exception as e:
            print(f"Setup from headers failed: {e}")
            return False

    def create_playlist(self, title, description):
        if not self.yt:
            raise Exception("YTMusic not initialized. Check browser.json.")
        try:
            playlist_id = self.yt.create_playlist(title=title, description=description)
            return playlist_id
        except Exception as e:
            print(f"Error creating playlist: {e}")
            raise e

    def search_song(self, query):
        if not self.yt:
            raise Exception("YTMusic not initialized.")
        try:
            # Search for songs
            results = self.yt.search(query, filter="songs")
            if not results:
                return None
            
            # Return the first result (best match)
            # We could add more complex logic here to check duration, etc.
            return results[0]
        except Exception as e:
            print(f"Error searching for song '{query}': {e}")
            return None

    def add_track_to_playlist(self, playlist_id, video_id):
        if not self.yt:
            raise Exception("YTMusic not initialized.")
        try:
            self.yt.add_playlist_items(playlist_id, [video_id])
            return True
        except Exception as e:
            print(f"Error adding track to playlist: {e}")
            return False

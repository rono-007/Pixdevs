# Spotify to YouTube Music Converter

A local, privacy-focused Python application that converts your Spotify playlists to YouTube Music playlists.

## Features
- **Zero Cost**: Uses free APIs and runs locally.
- **Privacy First**: Credentials and tokens are stored in memory or local files only.
- **Smart Matching**: Searches for the best match on YouTube Music.
- **Beautiful UI**: A clean, modern interface to track your conversion progress.

## Prerequisites
- Python 3.10+
- A Spotify Developer Account (for API credentials)
- A YouTube Music account

## Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Spotify Configuration
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2. Create a new app.
3. In the app settings, add `http://127.0.0.1:5000/callback` to the **Redirect URIs**.
4. Note down your **Client ID** and **Client Secret**.

Set them as environment variables:

**Windows (PowerShell):**
```powershell
$env:SPOTIFY_CLIENT_ID="your_client_id"
$env:SPOTIFY_CLIENT_SECRET="your_client_secret"
```

**Mac/Linux:**
```bash
export SPOTIFY_CLIENT_ID="your_client_id"
export SPOTIFY_CLIENT_SECRET="your_client_secret"
```

### 3. YouTube Music Configuration
1. Open a terminal in the project directory.
2. Run the following command to generate `oauth.json`:
   ```bash
   ytmusicapi oauth
   ```
3. Follow the instructions to authenticate with your Google account.

## Usage

1. Start the application:
   ```bash
   python app.py
   ```
2. Open your browser and go to `http://127.0.0.1:5000`.
3. Click **Login with Spotify** to authenticate.
4. Paste a Spotify Playlist URL (e.g., `https://open.spotify.com/playlist/...`).
5. Click **Convert Playlist** and watch the magic happen!

## Troubleshooting
- **429 Errors**: If you see rate limit errors, wait a few minutes and try again.
- **No Match Found**: Some songs might not be available on YouTube Music or have different names. These will be skipped and logged.

## License
Personal and Educational Use Only.

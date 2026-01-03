from ytmusicapi import YTMusic
import sys

try:
    print("Attempting to initialize YTMusic with browser.json...")
    yt = YTMusic("browser.json")
    print("Initialization successful!")
    # Try a simple search to verify it actually works
    print("Running a test search...")
    search_results = yt.search("test")
    print(f"Search successful, found {len(search_results)} results.")
except Exception as e:
    print(f"CRITICAL ERROR: {e}")
    # Print more details if available
    import traceback
    traceback.print_exc()

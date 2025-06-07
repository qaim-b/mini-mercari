# Web Client

This simple web client displays items from the backend service in a layout inspired by Mercari Japan. It fetches items from `http://localhost:8000/items` and shows them in a responsive grid with a search box.

## Running

1. Ensure the backend service is running (`uvicorn app:app --reload --port 8000`).
2. Serve this directory with any static file server. For example:

```bash
cd web_client
python3 -m http.server 3000
```

3. Visit `http://localhost:3000` in your browser.

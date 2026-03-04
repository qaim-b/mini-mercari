# Web Client

Modern vanilla JS marketplace UI with:
- Search/filter/sort
- Listing creation flow
- Loading/error/empty states
- Responsive, animated interface

## Running
1. Start backend service on `http://localhost:8000`.
2. Serve this directory:
```bash
cd web_client
python -m http.server 3000
```
3. Open `http://localhost:3000`.
4. If needed, change backend URL from the UI "Backend URL" field.

## Vercel Deployment
1. Set `web_client/config.js` `API_BASE_URL` to your deployed backend URL.
2. Push to GitHub.
3. Import repo in Vercel.
4. Deploy from repo root (the included root `vercel.json` serves `web_client` files).

CLI alternative:
```bash
vercel --prod
```

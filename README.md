# Mini Mercari

Production-oriented mini marketplace project with three working services:
- `ml_service`: price suggestion microservice
- `backend_service`: marketplace API (users, items, orders)
- `web_client`: responsive frontend

## Architecture
- Backend: FastAPI + SQLite with repository/service layering.
- ML service: FastAPI rule-based estimator with stable `/predict` contract.
- Frontend: Vanilla JS + modern CSS visual system.
- Search data structure: in-memory token index for item discovery (`OOP + DSA` focus).

## What Was Upgraded
- Replaced backend global in-memory state with SQLite persistence.
- Added typed request validation and safer error handling.
- Added health/readiness endpoints for backend and ML.
- Added resilient ML fallback estimator in backend.
- Added backend tests for critical flows.
- Rebuilt frontend UI/UX with filtering, sorting, item creation, and robust states.
- Added environment templates and refreshed service docs.

## Quick Start
Open three terminals.

1. ML service
```bash
cd ml_service
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 5000 --reload
```

2. Backend service
```bash
cd backend_service
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

3. Web client
```bash
cd web_client
python -m http.server 3000
```

Open `http://localhost:3000`.

## Docker Compose
Run all services with one command:
```bash
docker compose up --build
```

Endpoints:
- Web: `http://localhost:3000`
- Backend: `http://localhost:8000/health`
- ML: `http://localhost:5000/health`

## Deploy Web Client To Vercel
1. Deploy backend first (for example Render/Railway/Fly) and note its base URL.
2. Update `web_client/config.js`:
```js
window.APP_CONFIG = {
    API_BASE_URL: "https://your-backend-service.example.com"
};
```
3. Push changes to GitHub.
4. Import this repo into Vercel and deploy.
5. The included `vercel.json` serves the frontend from `web_client` at your Vercel root URL.

## Deploy Backend/ML (Render Blueprint)
1. Push repository to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Use `render.yaml` and set:
- `ML_SERVICE_URL` on backend to your deployed ML URL + `/predict`
- `CORS_ORIGINS` on backend to your Vercel URL
4. After backend is live, set `web_client/config.js` `API_BASE_URL` and redeploy Vercel.

## Backend Test
```bash
cd backend_service
python -m pytest -q
```

## Next Production Steps
1. Add authentication/authorization (JWT + role policies).
2. Add Dockerfiles + docker-compose + CI pipeline.
3. Move from SQLite to PostgreSQL for multi-instance deployment.
4. Add observability (structured logs, metrics, tracing).
5. Replace rule-based model with trained artifact + model monitoring.

## Product Execution Kit (One-Go)
For a complete adoption plan focused on smooth Mercari user switching and real usage, use:
- `docs/00_EXECUTIVE_ONE_GO.md`
- `docs/01_PRD_SELLER_LISTING_ASSISTANT.md`
- `docs/02_USER_JOURNEYS_AND_SWITCH_FLOW.md`
- `docs/03_SYSTEM_REQUIREMENTS_AND_NFR.md`
- `docs/04_BACKLOG_P0_P1_P2.md`
- `docs/05_SPRINT_PLAN_6_WEEKS.md`
- `docs/06_METRICS_EXPERIMENTS_AND_DASHBOARD.md`
- `docs/07_LAUNCH_RUNBOOK_AND_SUPPORT.md`
- `docs/08_PROMPT_PACK_EXECUTION.md`
- `docs/09_RISK_REGISTER_AND_MITIGATIONS.md`
- `docs/10_DEFINITION_OF_DONE_AND_ACCEPTANCE.md`

# Backend Service

Simple FastAPI API for the Mercari mini marketplace.

## Endpoints
- `POST /users` register a new user
- `GET /users` list all users
- `GET /items` list all items
- `GET /items/{id}` retrieve a single item
- `POST /items` create an item and fetch a price suggestion from the ML service
- `POST /orders` create an order
- `GET /orders` list all orders
- `GET /health` health check

The service expects the ML microservice to be running and accessible via `ML_SERVICE_URL` (defaults to `http://localhost:5000/predict`).
If your ML service runs on a different port, export `ML_SERVICE_URL` before starting:

```bash
export ML_SERVICE_URL=http://localhost:5001/predict
```

## Running
```bash
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

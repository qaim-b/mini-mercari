# Backend Service

Simple FastAPI API for the Mercari mini marketplace.

## Endpoints
- `POST /users` register a new user
- `GET /items` list all items
- `POST /items` create an item and fetch a price suggestion from the ML service
- `POST /orders` create an order
- `GET /health` health check

The service expects the ML microservice to be running on `http://localhost:5000/predict`.

## Running
```bash
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

# System Requirements and NFR

## Architecture Decisions
1. Keep 3-service split:
- `backend_service`: API + orchestration + storage.
- `ml_service`: price + quality scoring contracts.
- `web_client`: assistant UX.
2. Add API gateway concerns at backend level:
- auth verification
- request validation
- rate limiting (basic)

## Data Requirements
1. Add tables:
- `user_sessions`
- `listing_drafts`
- `recommendation_feedback`
- `event_logs`
2. Add indices for:
- listing search fields
- timestamped event aggregation

## API Contract Additions
1. `POST /auth/login`
2. `POST /drafts`
3. `GET /drafts/{id}`
4. `POST /assist/listing`
5. `POST /assist/discovery`
6. `POST /feedback/recommendation`
7. `GET /metrics/summary` (internal only)

## Observability
1. Structured JSON logs.
2. Request ID on every response.
3. Key timers:
- recommendation latency
- search latency
- draft save latency

## Performance Targets
1. `POST /assist/listing`: p95 < 1500ms.
2. `GET /items`: p95 < 500ms.
3. `POST /drafts`: p95 < 300ms.

## Security Baseline
1. JWT auth with expiration and refresh flow.
2. CORS restricted to known app origins.
3. Input sanitization on all text fields.
4. Audit log for write operations.

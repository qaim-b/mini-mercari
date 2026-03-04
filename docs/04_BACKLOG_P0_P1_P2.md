# Backlog (P0/P1/P2)

## P0 (Must Ship for Pilot)
1. Authentication
- JWT login and protected endpoints.
- Acceptance: unauthenticated write requests return 401.

2. Listing Drafts
- Save/edit/retrieve draft.
- Acceptance: draft persistence survives page refresh.

3. Listing Assistant Endpoint
- Return quality score, missing fields, suggestion list, price range, confidence.
- Acceptance: valid payload response <1500ms p95.

4. Explainability
- Include `reason_tags` in response.
- Acceptance: at least one reason tag always present.

5. Feedback Capture
- Track user vote on suggestion usefulness.
- Acceptance: feedback write success and queryable daily aggregate.

6. Event Instrumentation
- Track core funnel events.
- Acceptance: dashboard query shows hourly counts.

7. UI Integration
- Form for listing input + suggestion panel + one-click apply.
- Acceptance: complete flow executable without page reload bugs.

## P1 (High Impact Next)
1. Discovery intent parser + relevance reasons.
2. Search result explanation chips.
3. Saved filter presets.
4. Retry and offline-safe draft queue.

## P2 (Later)
1. Personalized recommendation profiles.
2. A/B experimentation framework.
3. Advanced model monitoring and drift alerts.

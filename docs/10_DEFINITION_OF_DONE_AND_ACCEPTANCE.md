# Definition of Done and Acceptance

## Definition of Done (P0 Feature)
1. Code merged with review.
2. Unit and integration tests passing.
3. API contract documented.
4. Observability hooks added.
5. Feature validated in staging.
6. Acceptance criteria signed by product owner.

## Global Pilot Acceptance
1. Auth and security checks complete.
2. Listing assistant flow is stable end-to-end.
3. Feedback and event logging are queryable.
4. No open P0 bugs at launch.
5. Rollback plan verified in dry run.

## Feature Acceptance Templates
## Listing Assistant
1. Given valid listing input, when user requests assist, then system returns score, suggestions, price range, confidence, and reasons.
2. Given ML failure, when assist is requested, then deterministic fallback response is returned within SLA.

## Drafts
1. Given authenticated user, when draft is saved, then data persists and can be restored after reload.

## Feedback
1. Given suggestion displayed, when user votes, then vote and reason are stored and visible in daily aggregate.

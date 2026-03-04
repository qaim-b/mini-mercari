# PRD: Mercari Listing and Discovery Assistant

## 1. Problem
Mercari users face friction in two places:
1. Creating high-quality listings quickly.
2. Finding the right items without repeated search/filter loops.

Users abandon tools that add steps without clear value.

## 2. Goal
Deliver a companion app that users can switch to/from Mercari with minimal friction and immediate utility.

## 3. Personas
1. Casual Seller
- Lists occasionally, low confidence on pricing/category.
- Needs speed and simple guidance.

2. Power Seller
- Lists many items.
- Needs consistent quality and fast workflow.

3. Value Hunter Buyer
- Wants high-signal search results fast.
- Needs better relevance and filter confidence.

## 4. Jobs To Be Done
1. "Help me create a good listing quickly."
2. "Help me pick a confident price range."
3. "Help me find what I need with less trial-and-error."

## 5. Core Features (MVP)
1. Listing Quality Assistant
- Inputs: title, description, category, condition.
- Output: quality score (0-100), missing fields, improvement tips.

2. Price Suggestion with Explainability
- Output: suggested range, confidence, reason tags.
- Example reasons: category baseline, condition term, rarity term.

3. Discovery Assistant
- Intent query + smart filters.
- Ranked results with match reasons.

4. Fast Switch Flow
- Persistent session, deep-link landing state, one-tap return.

5. Feedback Loop
- Thumbs up/down for suggestions.
- Capture rejection reason options.

## 6. Functional Requirements
1. User can create and save listing draft in <5 seconds.
2. User receives price suggestion in <700ms p95 (cached) and <1500ms p95 (uncached).
3. User can view "why this price" and "why this result".
4. User can apply recommended edits in one click.
5. User can filter results by category, price, and relevance.

## 7. Non-Functional Requirements
1. Availability: 99.5% during pilot.
2. API p95 latency: <500ms excluding ML call.
3. Security: JWT auth, scoped endpoints, CORS allowlist.
4. Logging: structured event logs for all recommendation interactions.
5. Privacy: no sensitive personal data stored beyond required account metadata.

## 8. Success Metrics
1. Median listing creation time.
2. Suggestion acceptance rate.
3. Discovery success proxy: search-to-detail and detail-to-action.
4. Retention: D1, D7 pilot retention.
5. User-rated usefulness score.

## 9. Risks
1. Users may not trust opaque pricing.
2. Switch cost may still feel high if workflow is disconnected.
3. Rule-based model may underperform for edge categories.

## 10. Release Criteria
1. All P0 acceptance criteria met.
2. No open P0 severity bugs.
3. Metrics instrumentation validated in production.
4. Pilot onboarding docs complete.

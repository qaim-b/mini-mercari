# User Journeys and Smooth Switch Flow

## Journey A: Seller Listing Creation
1. User opens assistant app from Mercari context.
2. App restores last draft state automatically.
3. User enters item basics.
4. App returns:
- quality score
- price range
- concrete improvement actions
5. User taps "Apply Suggestions".
6. User taps "Return to Mercari" with copied optimized details.

## Journey B: Buyer Discovery
1. User enters intent query (example: "cheap but good wireless earbuds").
2. App maps intent to category and filter candidates.
3. User sees ranked items with "why matched" labels.
4. User refines with one-tap chips.
5. User uses deep link / copy summary to continue in Mercari.

## Zero-Friction Switch Principles
1. No repeated login across short sessions.
2. Keep state for 24 hours.
3. Every page has clear return action.
4. Never force extra forms before giving value.

## UX Copy Standards
1. Keep action-first labels:
- "Improve Title"
- "Raise Confidence"
- "Use Suggested Price"
2. Avoid technical ML wording:
- Do not show "model inference score".
- Show "confidence" and "reason".

## Empty/Error States
1. Empty search: show 3 recommended starter filters.
2. ML timeout: show fallback range and "estimated from similar category."
3. API failure: preserve entered draft and retry CTA.

# Metrics, Experiments, and Dashboard

## KPI Tree
## North Star
Successful assistant-supported listing/discovery sessions.

## Input Metrics
1. Listing flow starts per day.
2. Suggestion view rate.
3. Suggestion apply rate.
4. Feedback submission rate.

## Outcome Metrics
1. Median listing completion time.
2. Listing completeness score.
3. Search-to-detail conversion.
4. Detail-to-action conversion.
5. D1 and D7 retention.

## Quality Metrics
1. API error rate.
2. Suggestion latency p95.
3. ML fallback rate.

## Experiment Framework (Manual MVP)
1. Control: no suggestion panel.
2. Variant A: suggestion panel with reasons.
3. Variant B: suggestion panel + one-click apply.

Primary readout:
- time to complete listing
- suggestion acceptance

## Dashboard Minimum Panels
1. Daily active pilot users.
2. Funnel (start -> suggest view -> apply -> complete).
3. Latency and errors by endpoint.
4. Usefulness votes over time.
5. Top rejection reasons.

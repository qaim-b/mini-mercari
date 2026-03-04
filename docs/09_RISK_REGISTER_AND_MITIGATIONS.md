# Risk Register and Mitigations

## R1: Low User Trust in Suggestions
- Signal: low apply rate, high rejection feedback.
- Mitigation: add reason tags and confidence explanation.
- Trigger: apply rate <20% for 7 consecutive days.

## R2: Slow Assistant Response
- Signal: p95 > 1500ms.
- Mitigation: cache common category heuristics, async precompute.
- Trigger: latency SLO violation for 2 days.

## R3: Session Friction in Switch Flow
- Signal: high drop-off after entry.
- Mitigation: persistent session, restore drafts automatically.
- Trigger: >35% drop between open and first action.

## R4: Model Quality Drift
- Signal: rising negative feedback by category.
- Mitigation: category-specific fallback tuning and retraining queue.
- Trigger: usefulness <60% in any major category.

## R5: Pilot Support Overload
- Signal: unresolved P1 tickets >5 per day.
- Mitigation: clear runbook, on-call rotation, issue templates.
- Trigger: SLA miss for 2 consecutive days.

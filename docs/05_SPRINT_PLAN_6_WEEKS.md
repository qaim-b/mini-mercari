# Sprint Plan (6 Weeks)

## Team Assumption
1 product owner, 1 designer, 2 backend engineers, 1 frontend engineer, 1 QA (shared).

## Week 1: Discovery + Scope Lock
1. Interview 5 target users (seller ops + active sellers).
2. Finalize top 3 pain points.
3. Freeze MVP scope and acceptance criteria.
4. Define KPI baseline collection method.
5. Create release board with P0 tasks.

## Week 2: Foundation
1. Implement JWT auth and protected write endpoints.
2. Add draft and feedback tables.
3. Add event logging middleware.
4. Add initial internal metrics endpoint.
5. Add integration test skeleton.

## Week 3: Core Assistant APIs
1. Build `/assist/listing` response schema.
2. Integrate ML + fallback rule model with reason tags.
3. Add validation, retries, and error mapping.
4. Add latency and failure metrics.
5. Load-test core endpoint.

## Week 4: UX and Switch Flow
1. Implement listing assistant panel in `web_client`.
2. Add one-click apply suggestions.
3. Add draft auto-save + restore.
4. Add feedback controls.
5. Add "return to Mercari" affordance on all key pages.

## Week 5: Pilot Hardening
1. Fix top UX and reliability bugs.
2. Complete E2E smoke tests and regression list.
3. Validate analytics events and dashboards.
4. Prepare user onboarding guide.
5. Pilot with 5 to 10 users.

## Week 6: Measure and Decide
1. Analyze pilot metrics vs baseline.
2. Run post-pilot interviews.
3. Rank improvements by KPI impact.
4. Produce go/no-go report.
5. Plan next 6-week cycle.

## Daily Rituals
1. 15-minute blocker standup.
2. Same-day bug triage for P0 severity.
3. End-of-day KPI pulse check.

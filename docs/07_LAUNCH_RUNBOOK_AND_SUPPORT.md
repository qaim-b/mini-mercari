# Launch Runbook and Support

## T-7 Days
1. Freeze P0 scope.
2. Run E2E smoke tests.
3. Validate auth and CORS in production config.
4. Confirm dashboards are live.
5. Finalize pilot user list.

## T-3 Days
1. Dry run onboarding with internal teammate.
2. Confirm rollback procedure.
3. Confirm support owner rotation.
4. Prepare known issues log.

## Launch Day
1. Enable pilot users.
2. Monitor:
- API error rates
- latency
- auth failures
3. Check first-hour funnel completion.
4. Run same-day bug fix patch if needed.

## Support SLA (Pilot)
1. P0 outage: response in 15 minutes.
2. P1 broken flow: response in 2 hours.
3. P2 cosmetic issue: next sprint queue.

## Rollback Plan
1. Disable assistant endpoints via feature flag.
2. Keep drafts read-only.
3. Display temporary fallback UI with clear notice.

# Growth Engine release-readiness follow-up — 2026-09-13

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: integrations, production-readiness, monitoring, business-boundary
- lastVerifiedAt: 2026-09-16
- sourceHead: eae36d84bcc2a663aef9de0b6ff5329a130f14d6
- productionHead: eae36d84bcc2a663aef9de0b6ff5329a130f14d6
- productionRunId: 34948937359
- productionRunNumber: 13
- productionStatus: verified

## Verified repository state

Growth Engine main and Production are aligned at `eae36d84bcc2a663aef9de0b6ff5329a130f14d6`.

The Free/Pro support-boundary release-readiness work plus the Growth Engine → Numeria Studio handoff contract updates are now Production verified.

Key merged work:

- APC operational endpoint uses the current Cloudflare endpoint and `/release/status` exposes release-readiness metadata.
- Production workflow injects the exact deployed Git commit SHA and verifies it through `/version` and `/release/status`.
- Future Business cross-app access remains fail-closed behind `planId=business`, Business availability `available`, and `business.cross_app.flow`.
- Normal Professional surfaces do not expose unreleased Business navigation.
- Operational cross-app `*-test` endpoints require a signed owner session.
- Numeria handoff uses `https://numeria-studio.com` and carries reference-first trace/correlation context.
- Numeria session-start operational test body uses canonical `customerId`, `traceId`, and `correlationId` fields.
- SNS Planner operational tests use server-side `SNS_PLANNER_BASE_URL`; its current preview URL remains intentional until that app migrates.
- No public Business product flow, refund UI, sales UI expansion, D1 schema redesign, or Numeria Pro / Velvet Pro mixing was introduced.

PR #10 through PR #19 passed the relevant typecheck, contract tests, Next build, and Cloudflare build verification before merge. Post-merge main CI also passed for the handoff changes.

## Production verification — complete through eae36d84

Cloudflare Production run #13 (`34948937359`) targeted exact SHA `eae36d84bcc2a663aef9de0b6ff5329a130f14d6`.

The first attempt hit a transient post-deploy version convergence race: `/release/status.latestDeploy.commitSha` already reported `eae36d84`, while `/version.commitSha` temporarily returned the prior deployed SHA `a86ca6b`. D1, auth, contracts, release metadata, and the deployment itself were otherwise healthy.

The failed job was rerun as attempt 2. Attempt 2 completed successfully and verified the deployed Worker, including:

- `/health` healthy.
- `/version.commitSha` equals `eae36d84bcc2a663aef9de0b6ff5329a130f14d6`.
- `/contracts/status` healthy and aligned with the current identity/contract boundary.
- `/release/status` reports Free ready, Pro ready, Business unavailable.
- Business remains not purchasable, not publicly visible, and `BUSINESS_CROSS_APP_FLOW_ENABLED=false`.
- Future Business integration gate remains fail-closed.
- Operational integration tests remain signed-owner-session only.
- `/auth/status` reports auth ready without exposing secret values.
- `/persistence/status` and `/api/persistence/status` report D1 reachable and database-backed persistence ready.
- An authenticated Customer/Reservation D1 roundtrip succeeded.
- Canonical Customer/Reservation rows were verified directly in D1.

The optional canonical Postgres export/import/count verification steps were skipped because the source Postgres migration input was not configured; this was expected and did not block D1 Production verification.

## Growth Engine → Numeria Studio handoff

PR #18 added the formal reference-first handoff context required by `professional-platform-contracts/docs/contracts/api-catalog.md`:

- `workspaceId`
- `userId`
- `reservationId`
- `customerId`
- `traceId`
- `correlationId`

Growth Engine generates trace/correlation IDs once per rendered Numeria handoff and reuses those same IDs in both the outbound URL and displayed handoff reference payload. Routing metadata remains `sourceApp=growth-engine` and `intent=start_appraisal_session`.

PR #19 aligned the owner-only Numeria `Session.Start` operational test body with the same canonical reference fields.

The sensitive-data boundary is preserved: Payment status, Sales amount, Stripe data, Customer master, full Report/Appraisal bodies, transcripts, API keys, and secret prompts are not added to the handoff.

Both PR #18 and PR #19 are included in Production SHA `eae36d84` and are now Production verified.

## Numeria receiver — implemented and deployed

The receiver gap previously tracked as `karukimori-wq/numeria-studio-site#1` has been resolved.

Numeria Studio PR #2 implemented the `/app/growth/start` receiver while keeping authenticated Clerk identity authoritative. Growth Engine URL identity values are not treated as authentication. Reservation/Customer/trace/correlation values are retained as external references only, and restricted Growth Engine-owned business data is not duplicated.

The receiver can initialize `Session.Start` after authenticated Growth Engine handoff while preserving existing in-progress appraisal and Free/Pro limit behavior. Direct Numeria usage is not auto-started by this path.

Numeria PR #2 merged at `b6cd7759` and its automatic Cloudflare Production run #233 completed successfully, including tests, build, D1 migrations, Worker deployment, and Production verification. Issue #1 is closed as completed.

The remaining handoff verification is an authenticated browser smoke through the real user flow: Growth Engine reservation detail → Numeria Studio → Clerk authentication → referenced appraisal session initialization.

## Business and ownership boundary

- Business remains `unavailable` for normal users.
- `business.cross_app.flow` remains disabled.
- Free and Pro do not authorize Business integrations.
- Direct internal owner-pilot Business URLs remain behind signed owner-session protection.
- Growth Engine remains Source of Truth for Customer, Reservation, Payment, Sales, Public Site, and Business plan workflow.
- Cross-app data remains reference-first; full report/conversation/payment/sales/customer-master/Stripe/secret payloads are not accepted across the Professional boundary.

## Monitoring follow-up

Platform Admin stale Growth Engine/Numeria monitoring URLs were cleaned up in PR #3 on 2026-09-16. The cleanup updates the Growth Engine example to the current Cloudflare Production URL, updates Numeria monitoring defaults/examples to `https://numeria-studio.com`, and adds a regression verifier forbidding the retired Growth Engine Vercel and Numeria preview URLs.

The branch verification passed the monitoring URL regression check, TypeScript typecheck, and Next.js Production build. PR #3 merged as `63bd2e95220f57c6aeed1dd5a75fd1a79d814180`, and Platform Admin issue #2 closed as completed. SNS Planner's current preview endpoint was intentionally left unchanged pending its own confirmed migration.

No Platform Admin Production deploy was triggered solely for this small monitoring cleanup; it can be included with the next Platform Admin release boundary.

## Sensitive-data review

No secrets, owner access code, customer data, database credentials, API keys, or raw authentication material are included.
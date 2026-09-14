# Growth Engine release-readiness follow-up — 2026-09-13

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: integrations, production-readiness, monitoring, business-boundary
- lastVerifiedAt: 2026-09-14
- sourceHead: 4c9f2e6a174a9b780ace6f86df29ca944c63ef92
- productionHead: a86ca6b622b9a12ee09ff555b28445273cf6ff58
- productionRunId: 34799730375
- productionRunNumber: 12
- productionStatus: verified-with-post-production-main-delta

## Verified repository state

Growth Engine main is `4c9f2e6a174a9b780ace6f86df29ca944c63ef92`.

The Free/Pro release-readiness batch through `a86ca6b622b9a12ee09ff555b28445273cf6ff58` is Production verified. A later contract-only handoff fix was merged as PR #18 and is CI-verified but not yet deployed.

Key merged work in the release-readiness batch:

- APC operational endpoint uses the current Cloudflare endpoint and `/release/status` exposes release-readiness metadata.
- Production workflow injects the exact deployed Git commit SHA and verifies it through `/version` and `/release/status`.
- Future Business cross-app access remains fail-closed behind `planId=business`, Business availability `available`, and `business.cross_app.flow`.
- Normal Professional surfaces do not expose unreleased Business navigation.
- Operational cross-app `*-test` endpoints require a signed owner session.
- Numeria handoff fallback and session-start operational test use `https://numeria-studio.com`.
- SNS Planner operational tests use server-side `SNS_PLANNER_BASE_URL`; its current preview URL remains intentional until that app migrates.
- No public Business product flow, refund UI, sales UI expansion, D1 schema redesign, or Numeria Pro / Velvet Pro mixing was introduced.

PR #10 through PR #17 passed typecheck, contract tests, Next build, and Cloudflare build. Post-merge main CI for `a86ca6b` also passed the same verification stages.

## Production verification — complete through a86ca6b

Cloudflare Production run #12 (`34799730375`) completed successfully on 2026-09-14 and deployed exact SHA `a86ca6b622b9a12ee09ff555b28445273cf6ff58` to `https://growth-engine.karukimori.workers.dev`.

The run verified all of the following against the deployed Worker:

- `/health` healthy.
- `/version.commitSha` equals the deployed GitHub SHA.
- `/contracts/status` healthy and aligned with the current identity/contract boundary.
- `/release/status` reports Free ready, Pro ready, Business unavailable.
- Business remains not purchasable, not publicly visible, and `BUSINESS_CROSS_APP_FLOW_ENABLED=false`.
- Future Business integration gate remains fail-closed.
- Operational integration tests are signed-owner-session only; unauthenticated APC activity-test returned the expected HTTP 401 before upstream side effects.
- `/auth/status` reports auth ready without exposing secret values.
- `/persistence/status` and `/api/persistence/status` report D1 reachable and database-backed persistence ready.
- An authenticated Customer/Reservation D1 roundtrip succeeded and the created canonical rows were verified directly in D1.
- Production runtime bindings point to current APC, Numeria Studio custom domain, Velvet, Communication Planner, and the current SNS Planner endpoint.

The optional canonical Postgres export/import/count verification steps were skipped because `GROWTH_ENGINE_SOURCE_POSTGRES_URL` was unset; this was expected and did not block the D1 Production verification.

## Post-Production main delta — PR #18

PR #18, merged as `4c9f2e6`, aligns the Growth Engine → Numeria Studio start handoff with `professional-platform-contracts/docs/contracts/api-catalog.md`.

The handoff URL now carries the formal reference-first context:

- `workspaceId`
- `userId`
- `reservationId`
- `customerId`
- `traceId`
- `correlationId`

Growth Engine generates trace/correlation IDs once per rendered Numeria handoff and reuses those same IDs in both the outbound URL and the displayed handoff reference payload. Routing metadata remains `sourceApp=growth-engine` and `intent=start_appraisal_session`.

PR #18 preserves the sensitive-data boundary: Payment status, Sales amount, Stripe data, Customer master, full Report/Appraisal bodies, transcripts, API keys, and secret prompts are not added to the handoff.

PR #18 passed typecheck, contract tests, Next build, and Cloudflare build before merge.

Important distinction: `4c9f2e6` is newer than the Production-verified SHA `a86ca6b`. Do not describe the trace/correlation URL addition as Production verified until a future intentional Growth Engine release-boundary deploy includes it.

Do not trigger a new Production deploy solely for PR #18. Batch it with the next deploy-affecting release boundary.

## Numeria receiver gap discovered

Cross-repository inspection found that current `karukimori-wq/numeria-studio-site` main accepts `/app/growth/start` through the Worker SPA fallback, so the route can open, but the current React client does not parse the Growth Engine handoff query and `/api/sessions/start` does not retain `reservationId` or `customerId` as session references.

Current Numeria D1 migrations define usage/report persistence but no dedicated persisted Session reference model for Growth Engine Reservation/Customer references.

This is tracked as `karukimori-wq/numeria-studio-site#1` — `Accept Growth Engine reservation handoff context on /app/growth/start`.

The Numeria implementation should keep authenticated Clerk identity authoritative, validate workspace scope, retain Reservation/Customer as external references only, and must not duplicate Growth Engine Customer master, Payment, Sales, Stripe, full Report, or other restricted bodies.

An authenticated browser smoke from Growth Engine reservation detail to Numeria Studio should be performed only after that receiver implementation is merged and deployed.

## Business and ownership boundary

- Business remains `unavailable` for normal users.
- `business.cross_app.flow` remains disabled.
- Free and Pro do not authorize Business integrations.
- Direct internal owner-pilot Business URLs remain behind signed owner-session protection.
- Growth Engine remains Source of Truth for Customer, Reservation, Payment, Sales, Public Site, and Business plan workflow.
- Cross-app data remains reference-first; full report/conversation/payment/sales/customer-master/Stripe/secret payloads are not accepted across the Professional boundary.

## Monitoring follow-up

Platform Admin runtime monitoring already uses the canonical Growth Engine Cloudflare fallback, but stale Growth Engine/Numeria example/fallback URLs remain elsewhere. Cleanup is tracked in `karukimori-wq/Platform-Admin#2`.

Avoid concurrent blind writes while Platform Admin PR #1 remains open; its monitoring cleanup should be reconciled against current main before editing.

## Sensitive-data review

No secrets, owner access code, customer data, database credentials, API keys, or raw authentication material are included.

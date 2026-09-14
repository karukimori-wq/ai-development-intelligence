# Growth Engine release-readiness follow-up — 2026-09-13

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: integrations, production-readiness, monitoring, business-boundary
- lastVerifiedAt: 2026-09-14
- sourceHead: a86ca6b622b9a12ee09ff555b28445273cf6ff58
- productionRunId: 34799730375
- productionRunNumber: 12
- productionStatus: verified

## Verified repository state

Growth Engine main is `a86ca6b622b9a12ee09ff555b28445273cf6ff58` after the Free/Pro release-readiness batch.

Key merged work in the batch:

- APC operational endpoint uses the current Cloudflare endpoint and `/release/status` exposes release-readiness metadata.
- Production workflow injects the exact deployed Git commit SHA and verifies it through `/version` and `/release/status`.
- Future Business cross-app access remains fail-closed behind `planId=business`, Business availability `available`, and `business.cross_app.flow`.
- Normal Professional surfaces do not expose unreleased Business navigation.
- Operational cross-app `*-test` endpoints require a signed owner session.
- Numeria handoff fallback and session-start operational test use `https://numeria-studio.com`.
- SNS Planner operational tests use server-side `SNS_PLANNER_BASE_URL`; its current preview URL remains intentional until that app migrates.
- No public Business product flow, refund UI, sales UI expansion, D1 schema redesign, or Numeria Pro / Velvet Pro mixing was introduced.

PR #10 through PR #17 passed typecheck, contract tests, Next build, and Cloudflare build. Post-merge main CI for `a86ca6b` also passed the same verification stages.

## Production verification — complete

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

## Business and ownership boundary

- Business remains `unavailable` for normal users.
- `business.cross_app.flow` remains disabled.
- Free and Pro do not authorize Business integrations.
- Direct internal owner-pilot Business URLs remain behind signed owner-session protection.
- Growth Engine remains Source of Truth for Customer, Reservation, Payment, Sales, Public Site, and Business plan workflow.
- Cross-app return data remains reference-only; full report/conversation/payment/sales/customer-master/Stripe/secret payloads are not accepted across the Professional boundary.

## Monitoring follow-up discovered after Production verification

Platform Admin current code already uses the canonical Growth Engine Cloudflare fallback in its plan-readiness and connection-test logic, and its Production workflow explicitly checks that monitored Growth Engine base URL equals `https://growth-engine.karukimori.workers.dev`.

However, Platform Admin still contains stale documentation/config examples and Numeria fallback values:

- `.env.example` still shows the retired Growth Engine Vercel URL.
- `.env.example`, `lib/plan-readiness.ts`, and `lib/connection-test.ts` still contain the retired Numeria preview URL instead of `https://numeria-studio.com`.

Treat this as a Platform Admin monitoring cleanup, not a Growth Engine code defect. Avoid concurrent blind writes if Platform Admin is being actively developed in another thread; branch from its latest main and add regression coverage before merging.

## Next Growth Engine verification

The remaining deferred product-flow check is an authenticated browser smoke for Growth Engine → Numeria Studio handoff. This requires an authenticated owner session and should confirm that a reservation handoff reaches `https://numeria-studio.com` with only approved reference fields.

Do not require another Growth Engine Production deploy merely to perform that browser smoke unless new deploy-affecting code is merged.

## Sensitive-data review

No secrets, owner access code, customer data, database credentials, API keys, or raw authentication material are included.

# Growth Engine latest development status — 2026-08-25

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: customer-master, reservations, persistence, business-ui, production-readiness
- lastVerifiedAt: 2026-09-13
- sourceHead: f3d430ba990461aff209c04b1aa54b35cdda28c3

## Current implementation state

The current `main` head is `f3d430b` (`Verify release readiness in Production smoke checks`).

### 2026-09-13 Business boundary and release-readiness refresh

Growth Engine now aligns its future Business boundary with the current `professional-platform-contracts/docs/contracts/plan-contract.md` while keeping Business out of the Numeria Studio / Velvet Free + Pro release.

Verified repository state:

- Canonical `PlanId` remains `free`, `pro`, `business`.
- Business availability uses `unavailable` now, with `preparing` reserved for planned/admin-only visibility and `available` only for a future explicit Business release.
- Normal-user Business purchase visibility is false and the public Business entry remains hidden while Business is unavailable/preparing.
- `business.cross_app.flow` remains default-off and future access requires Business plan + available Business state + enabled feature flag.
- Free and Pro cannot pass the Business integration gate.
- Growth Engine remains Source of Truth for Customer, Reservation, Payment, Sales, Public Site, and Business plan workflow.
- Numeria Studio / Velvet return payloads are limited to approved reference/status fields: `workspaceId`, `userId`, `customerId`, `reservationId`, `sessionId`, `reportId`, `reportRef`, `status`, `completedAt`, `sourceApp`, `correlationId`.
- Full appraisal/report/conversation text, payment details, sales details, full Customer master, Stripe information, API keys, secrets, and secret prompts are explicitly outside that return boundary.
- `/contracts/status` exposes the non-sensitive Business availability, source-of-truth, and allowed/forbidden return-boundary metadata.
- Platform Admin monitoring endpoints now exist at `/release/status`, `/auth/status`, and `/persistence/status` in addition to the existing `/health`, `/version`, and `/contracts/status` surfaces.
- `/release/status` reports a `free-pro-support-boundary`, Free/Pro ready, and Business unavailable/not purchasable.
- `/auth/status` reports signed-owner-session readiness without exposing secret values.
- `/persistence/status` and `/api/persistence/status` share the same D1/Postgres readiness implementation.
- The manual `Cloudflare Production` workflow now smoke-checks `/release/status`, `/auth/status`, `/persistence/status`, Business unavailable state, Production auth configuration, and D1 readiness after deployment while preserving existing D1 roundtrip verification.

Verification evidence:

- PR #7 (`Refresh Growth Engine Business boundary contract`) merged as `27646bf`; PR CI passed typecheck, contract tests, Next.js build, and OpenNext Cloudflare build.
- PR #8 (`Add release readiness status endpoints`) merged as `0574959`; PR CI passed typecheck, contract tests, Next.js build, and OpenNext Cloudflare build.
- PR #9 (`Verify release readiness in Production smoke checks`) merged as `f3d430b`; PR CI passed typecheck, contract tests, Next.js build, and OpenNext Cloudflare build.
- No Business product functionality, Business purchase flow, reservation/sales/refund UI expansion, D1 schema change, or Numeria Pro / Velvet Pro feature mixing was added by these changes.

Important deployment distinction:

- The repository state through `f3d430b` is verified by CI but has **not** yet been deployed by a new Cloudflare Production workflow run.
- Do not describe the new monitoring endpoints or `unavailable/preparing` contract as Production-verified until the next intentional release-boundary Production run is completed and its smoke checks pass.
- Continue batching changes and run Cloudflare Production once at a release boundary rather than after every small merge.

Recent verified development also includes:

- `9a8d69d`: added the customer-list action for registering a new Customer.
- `288a210`: added `/app/business/customers/new`; the Server Action creates the canonical Growth Engine Customer, publishes `growth.customer.created.v1`, records an audit event, and redirects to the Customer detail.
- `85efdd2`: changed the Business home to use repository-backed reservations and business metrics instead of fixture reservation data, and unified it on the shared Business sidebar.
- `c12c68f`: added a Professional App switcher to the Business sidebar.
- Cloudflare Workers Production and D1 are the active production baseline. Postgres remains an optional rollback/source-migration path.
- `e571b58`: added `/app/business/reservations/new`; an owner can create a D1-backed Reservation for an existing active Customer.
- Reservation creation is reachable from the reservation list, Customer detail, and repeat candidate list. Customer detail preselects the Customer reference.
- The flow calculates the end time from the canonical Product duration, publishes `growth.reservation.created.v1`, records an audit event, and redirects to Reservation detail.
- Stale Vercel/Postgres runtime URLs and launch-readiness copy were aligned to the Cloudflare Workers/D1 production baseline.

Verification for `e571b58` passed `npm run typecheck`, `npm run build`, and `npm run cf:build`. The OpenNext build includes `/app/business/reservations/new`.

Historical Business preparation at `3ff5c9e` adopted the canonical `PlanId` values from professional-platform-contracts. At that time Business used `not_offered`; this historical wording is superseded in current Growth Engine code by the current contract-aligned `unavailable` / `preparing` model described above.

This preparation does not add Business product functionality, a public purchase route, a D1 migration, or a new Business database record. Contract tests prove Free and Pro cannot pass the Business gate and distinguish the professional's SaaS subscription from Customer Payment/Sales owned by Growth Engine.

A follow-up contract compliance audit found that the unauthenticated Professional App surface still rendered Business navigation despite the then-current unavailable offering state. Commit `7c2fc19` connected that surface to the offering contract, hid Business navigation/admin links/home CTA while unavailable, and kept direct owner-protected internal pilot routes unchanged. No Business feature, D1 schema, persistence, payment, sales, or cross-app API behavior was added. Growth Engine contract tests, typecheck, Next.js build, and OpenNext Cloudflare build passed. Cloudflare Production Workflow for `7c2fc19` was user-confirmed Green and production route verification passed on 2026-09-03.

A second contract-only audit at `2290622` locked the current owner Business API inventory to the shared authenticated, active-user, Business-plan and workspace resolver. It also clarified that future cross-app Business APIs must combine canonical Business entitlement, offering availability and `business.cross_app.flow`, fail closed on missing state, and keep the existing Velvet Customer integration from becoming a Business entitlement bypass.

## Production verification state

The production persistence and external pilot checks were verified through the real user flow before the 2026-09-13 repository-only Business-boundary refresh:

- Cloudflare D1 repository configured and reachable.
- Database-backed persistence ready.
- External pilot readiness reported ready with no issues.
- A public booking persisted into the owner Business reservation list and its detail page opened.
- Owner-protected Customer/Reservation roundtrip returned `roundtripReady: true`.
- Unauthenticated Business APIs retained their authentication-required behavior.
- Cloudflare Production Workflow for `e571b58` completed Green on 2026-09-01.
- Production `/health` returned HTTP 200; `/api/persistence/status` reported `status: success`, `repositoryDriver: d1`, `d1Configured: true`, `d1Reachable: true`, and `databaseBackedPersistenceReady: true`.
- Production `/api/persistence/preflight` reported `status: success`, `repositoryDriver: d1`, `databaseBackedPersistenceReady: true`, and no issues.
- Production external-pilot readiness and MVP-final readiness both returned HTTP 200 with `status: ready`, zero warnings/errors, and no issues.
- `/app/business/reservations/new` is deployed behind the expected owner sign-in redirect.
- Cloudflare Production Workflow for `3ff5c9e` was user-confirmed Green on 2026-09-03.
- Direct Production verification returned HTTP 200 for `/health`, `/version`, `/contracts/status`, `/api/persistence/status`, and `/api/persistence/preflight`.
- Production D1 remained healthy: `repositoryDriver: d1`, configured, reachable, database-backed persistence ready, with no blocked user flows or issues.
- Cloudflare Production Workflow for `7c2fc19` was user-confirmed Green on 2026-09-03.
- Production `/api/persistence/status` continued to report D1 as the active repository driver, configured, reachable, database-backed persistence ready, with no issues or blocked user flows.
- Production `/api/persistence/preflight` continued to report `status: success`, `repositoryDriver: d1`, `databaseBackedPersistenceReady: true`, no issues, and no blocked user flows.
- Production external-pilot readiness and MVP-final readiness returned `status: ready` with no issues.
- Production `/app/professional/numeria` and `/app/professional/velvet` returned HTTP 200 and did not render `/app/business` links, `Businessホーム`, or `予約確認` while Business was not publicly offered.
- Direct unauthenticated Production access to `/app/business` returned the expected sign-in redirect.
- A later Cloudflare Production workflow was user-confirmed Green before PRs #7-#9; that run verified typecheck, Production configuration, Cloudflare identity, D1 schema, OpenNext build/deploy, auth secrets, public endpoints, owner session, Customer/Reservation D1 roundtrip, and canonical D1 rows.

The current `f3d430b` repository additions (`/release/status`, `/auth/status`, `/persistence/status`, and the refreshed Business `unavailable/preparing` monitoring contract) remain pending the next intentional Production deployment.

Evidence: `EVID-growth-production-persistence-e2e-20260818` plus Growth Engine PRs #7, #8, and #9.

## Source-of-truth boundary

Growth Engine remains authoritative for Customer, Reservation, Customer Payment, Sales, Public Site, and Business plan workflow. SaaS subscription billing for Free/Pro/Business is a separate entitlement concern. Professional Studio handoffs should carry references rather than copying the full Customer master or internal payment/sales state.

## Relevant reusable intelligence

- `RULE-readiness-must-prove-runtime-capability`
- `PAT-production-readiness-needs-roundtrip`
- `RULE-canonical-owner-reference-first`
- `RULE-secrets-never-enter-intelligence`

## Recommended reconnect point

Do not begin Business product implementation until Numeria Studio and Velvet Free/Pro are released and an explicit Business release decision changes the formal availability state. At that point, integrate the real subscription/entitlement provider with `business.cross_app.flow`, preserve reference-only cross-app boundaries, and re-run the full Cloudflare/D1 verification story.

Before that decision, safe Growth Engine work should stay limited to contract/readiness/monitoring boundaries and existing Free/Pro support integrations. Batch such changes and use one intentional Cloudflare Production workflow run at the release boundary.

## Sensitive-data review

No owner access code, secret value, database connection string, customer identity, or raw credential is included.

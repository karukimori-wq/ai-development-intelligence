# Growth Engine latest development status — 2026-08-25

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: customer-master, reservations, persistence, business-ui, production-readiness
- lastVerifiedAt: 2026-09-03
- sourceHead: 3ff5c9e08c7614d9d377892e7f64cf45e396c8e3

## Current implementation state

The current `main` head is `3ff5c9e` (`Prepare Business plan contract boundaries`).

Recent verified development includes:

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

Business plan preparation at `3ff5c9e` adopts the canonical `PlanId` values from professional-platform-contracts `4a1f479`: `free`, `pro`, and `business`. Business remains `not_offered`; the `business.cross_app.flow` feature gate defaults off, public Business entry visibility is false, and access is fail-closed until the Business Plan is explicitly released. Contract metadata exposes this non-sensitive preparation state.

This preparation does not add Business product functionality, a public purchase route, a D1 migration, or a new Business database record. Contract tests prove Free and Pro cannot pass the Business gate and distinguish the professional's SaaS subscription from Customer Payment/Sales owned by Growth Engine. Verification passed professional-platform-contracts tests (21), Growth Engine contract tests (2), `npm run typecheck`, `npm run build`, and `npm run cf:build`.

## Production verification state

The production persistence and external pilot checks were verified through the real user flow:

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
- Production `/contracts/status` reported `status: success`, supported PlanIds `free`, `pro`, and `business`; Business remained `not_offered`; `business.cross_app.flow` remained default-off; Business access remained fail-closed; the public Business entry remained hidden; and SaaS subscription payment remained separated from Growth Engine Customer Payment.
- Production D1 remained healthy: `repositoryDriver: d1`, configured, reachable, database-backed persistence ready, with no blocked user flows or issues.
- Production external-pilot readiness and MVP-final readiness again returned HTTP 200 with `status: ready` and no issues.

Evidence: `EVID-growth-production-persistence-e2e-20260818`.

## Source-of-truth boundary

Growth Engine remains authoritative for Customer, Reservation, Customer Payment, and Sales. SaaS subscription billing for Free/Pro/Business is a separate entitlement concern. Professional Studio handoffs should carry references rather than copying the full Customer master or internal payment/sales state.

## Relevant reusable intelligence

- `RULE-readiness-must-prove-runtime-capability`
- `PAT-production-readiness-needs-roundtrip`
- `RULE-canonical-owner-reference-first`
- `RULE-secrets-never-enter-intelligence`

## Recommended reconnect point

Do not begin Business product implementation until Numeria Studio and Velvet Free/Pro are released and an explicit Business release decision changes the formal offering state. At that point, integrate the real subscription/entitlement provider with `business.cross_app.flow`, preserve reference-only cross-app boundaries, and re-run the full Cloudflare/D1 verification story.

## Sensitive-data review

No owner access code, secret value, database connection string, customer identity, or raw credential is included.

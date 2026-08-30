# Growth Engine latest development status — 2026-08-25

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: customer-master, reservations, persistence, business-ui, production-readiness
- lastVerifiedAt: 2026-08-30
- sourceHead: e571b584ffc8b023371ef00deeb1e0e55257fd2c

## Current implementation state

The current `main` head is `e571b58` (`Add owner-side reservation creation flow`).

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

## Production verification state

The production persistence and external pilot checks were verified through the real user flow:

- Cloudflare D1 repository configured and reachable.
- Database-backed persistence ready.
- External pilot readiness reported ready with no issues.
- A public booking persisted into the owner Business reservation list and its detail page opened.
- Owner-protected Customer/Reservation roundtrip returned `roundtripReady: true`.
- Unauthenticated Business APIs retained their authentication-required behavior.

Evidence: `EVID-growth-production-persistence-e2e-20260818`.

## Source-of-truth boundary

Growth Engine remains authoritative for Customer and Reservation. Professional Studio handoffs should carry references rather than copying the full Customer master or internal payment/sales state.

## Relevant reusable intelligence

- `RULE-readiness-must-prove-runtime-capability`
- `PAT-production-readiness-needs-roundtrip`
- `RULE-canonical-owner-reference-first`
- `RULE-secrets-never-enter-intelligence`

## Recommended reconnect point

Continue from current `main` and improve the post-reservation Business workflow. The natural sequence is:

1. add workspace-scoped Reservation status changes while preserving D1 persistence;
2. turn follow-up, repeat, and referral candidates into trackable Growth Engine records;
3. improve the public-booking-to-Business confirmation and next-action UX;
4. keep Numeria Studio, Velvet, Communication Planner, and SNS Planner integrations reference-only.

## Sensitive-data review

No owner access code, secret value, database connection string, customer identity, or raw credential is included.

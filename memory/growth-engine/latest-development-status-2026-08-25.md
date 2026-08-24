# Growth Engine latest development status — 2026-08-25

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: customer-master, reservations, persistence, business-ui, production-readiness
- lastVerifiedAt: 2026-08-25
- sourceHead: c12c68f9a84b02d65fdc246b99041728db06d920

## Current implementation state

The current `main` head is `c12c68f` (`Add professional app switcher to business sidebar`).

Recent verified development includes:

- `9a8d69d`: added the customer-list action for registering a new Customer.
- `288a210`: added `/app/business/customers/new`; the Server Action creates the canonical Growth Engine Customer, publishes `growth.customer.created.v1`, records an audit event, and redirects to the Customer detail.
- `85efdd2`: changed the Business home to use repository-backed reservations and business metrics instead of fixture reservation data, and unified it on the shared Business sidebar.
- `c12c68f`: added a Professional App switcher to the Business sidebar.

The current tree has Customer registration and reservation list/detail routes. It does not yet contain `/app/business/reservations/new`.

## Production verification state

The production persistence and external pilot checks were verified through the real user flow:

- Postgres repository configured and reachable.
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

Continue from current `main` and implement the missing manual reservation creation path. The natural sequence is:

1. add `/app/business/reservations/new`;
2. allow Customer detail to open reservation creation with the Customer preselected;
3. keep creation workspace-scoped and persisted by the Growth Repository;
4. verify list/detail visibility and then perform reference-only Numeria Studio handoff.

## Sensitive-data review

No owner access code, secret value, database connection string, customer identity, or raw credential is included.

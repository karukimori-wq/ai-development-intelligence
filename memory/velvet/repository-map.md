# MEM-Velvet-RepositoryMap

- type: memory
- status: active
- project: karukimori-wq/Velvet
- domains: professional-memory, capture, ai-integration, contracts

## Repository landmarks
Velvet has dedicated documentation for AI capabilities/connection, auth permissions, capture interaction, data/domain models, database schema, coding rules, and Codex guidance.

## Boundary reminder
Velvet owns professional memory/service-history domains, not the canonical Customer, Reservation, Payment, Sales, Communication, Report, or AI Usage domains. Cross-app integration should be reference/summary-first and avoid exporting confidential professional note bodies by default.

## Release-hardening landmarks
- `lib/input-limits.ts` is the shared boundary for high-volume user text and bulk import payloads. Write APIs and the capture composer are guarded against oversized input; keep server validation authoritative even when UI `maxLength` exists.
- Capture suggestion generation is intentionally bounded and must not load the user's full capture history just to render shortcuts. `scripts/check-query-efficiency.mjs` guards this invariant.
- Authenticated memory surfaces and APIs are configured `private, no-store` in `next.config.js`; `scripts/check-privacy-cache.mjs` guards the sensitive-route coverage.
- Free history-window enforcement must cover direct detail/API/organize routes as well as navigation surfaces; old IDs must not become a bypass.

## Retrieval guidance
Before changing domain ownership or AI integration, inspect `docs/data-model.md`, `docs/domain-model.md`, `docs/ai-platform-connection.md`, `docs/auth-permissions.md`, and the platform contracts. Before capture/import/privacy changes, also inspect the shared input limits, query-efficiency guard, privacy-cache guard, and plan-enforcement guard.

## Evidence
- repository docs structure
- `professional-platform-contracts/docs/contracts/data-ownership.md`
- Velvet CI release-hardening guards on `main`

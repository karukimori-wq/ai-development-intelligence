# MEM-PlatformAdmin-RepositoryMap

- type: memory
- status: active
- project: karukimori-wq/Platform-Admin
- domains: observability, operations, monitoring

## Repository landmarks
Platform Admin contains application code plus operational documentation for database, deployment, ingestion, and operations.

## Boundary reminder
Platform Admin is an operational monitoring surface. It should retain operational snapshots rather than becoming a source of truth for Customer, Payment, Sales, Communication, professional memory, Report, or AI Usage domains.

## Retrieval guidance
For deployment or monitoring changes, inspect `docs/deployment-checklist.md`, `docs/operations.md`, `docs/ingestion-api.md`, and the current platform contracts before editing.

## Evidence
- repository root/docs structure
- `professional-platform-contracts/docs/contracts/data-ownership.md`
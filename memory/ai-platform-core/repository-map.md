# MEM-AIPlatformCore-RepositoryMap

- type: memory
- status: active
- project: karukimori-wq/ai-platform-core
- domains: ai-runtime, architecture, contracts, testing

## Repository landmarks
AI Platform Core is organized as a pnpm/Turbo monorepo with `apps/`, `packages/`, `examples/`, and substantial architecture/API/requirements/contract documentation. Vitest workspace configuration is present.

## Retrieval guidance
Before modifying runtime behavior, inspect `docs/ARCHITECTURE.md`, `docs/REQUIREMENTS.md`, `docs/API_SERVER.md`, `docs/contracts.md`, and `docs/integration.md`, then narrow to the affected package/app.

## Boundary reminder
The platform contracts identify AI Capability, AI Activity, and AI Usage as AI Platform Core canonical domains. Application repositories should not create competing AI usage ledgers.

## Evidence
- repository root structure
- `professional-platform-contracts/docs/contracts/data-ownership.md`
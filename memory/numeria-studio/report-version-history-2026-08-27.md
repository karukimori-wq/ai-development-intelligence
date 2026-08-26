# Numeria Studio Report Version History

Date: 2026-08-27 JST
Source repo: karukimori-wq/numeria-studio
Local commit: b9b610c feat: add report version history

## Implemented

Continued Numeria Studio product development without redoing Cloudflare migration.

D1 schema:

- Added `appraisal_report_versions` for Numeria-owned Report version history.
- Added indexes for `(report_id, version_number)`, `(workspace_id, user_id, created_at)`, and `(report_id, created_at)`.

Worker APIs:

- `POST /api/reports` now creates a Report version on each generation/update.
- `GET /api/reports/{reportId}/versions` lists scoped version metadata only and excludes `reportBody`.
- `GET /api/reports/{reportId}/versions/{versionId}` reads a scoped version body for Numeria-only report editing.
- Cross-scope version reads return `REPORT_VERSION_NOT_FOUND`.

UI:

- Added Report Versions panel below the Report editor.
- Added `version履歴を同期` action.
- Added per-version `この版を開く` action.
- Version list displays version metadata only; body is loaded only after explicit version open.

Contracts/docs/CI:

- Updated `contracts/status.json`, `contracts/operational-manifest.json`, `contracts/ui-readiness.json`, and `contracts/release-checklist.json`.
- Updated README and manual smoke test docs.
- Extended Cloudflare Production workflow E2E to verify Report version list/read and ensure list responses do not leak `reportBody`.
- Updated static tests for schema, Worker routes, UI actions, and readiness flags.

## Verification

Passed locally:

- `node --test`: 5 tests passed.
- `node scripts/build.mjs`: static build succeeded.
- `git diff --check`: no whitespace errors.

## Notes

Report version history is a Numeria-owned capability. Growth Engine and other apps continue to receive reference IDs only (`sessionId`, `reportId`, `reportRef`) and do not receive Report body or version body.

Direct GitHub push from the local environment remains blocked by missing GitHub username/token.

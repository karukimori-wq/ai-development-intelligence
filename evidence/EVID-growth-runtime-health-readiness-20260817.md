# EVID-growth-runtime-health-readiness-20260817

Source: `karukimori-wq/Growth-Engine`
Commit: `e948dd14b4622bb648253fe20dfdd1ca6bf63057`

Persistence status was changed from configuration/preflight-only reporting to an actual Postgres health check. The endpoint now reports `postgresReachable` and derives `databaseBackedPersistenceReady` from runtime health. It is also forced dynamic so readiness is not served from stale static/cache behavior.

Reusable lesson: production readiness for infrastructure-backed features must include runtime reachability. Configuration presence is necessary but not sufficient.
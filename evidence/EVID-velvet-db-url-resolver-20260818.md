# EVID-velvet-db-url-resolver-20260818

Source: `karukimori-wq/Velvet`
Commit: `d1d25dc958ab236d8a12f1fe40ee9f4d5e3683d1`
Observed: 2026-08-18

## Observation

Persistence detection originally depended on one environment variable name. The implementation introduced a shared `getDatabaseUrl()` resolver accepting `DATABASE_URL` or `POSTGRES_URL`, then reused it for storage-mode detection, production readiness assertions, and readiness reporting.

## Reusable signal

When a deployment platform or database integration can expose equivalent connection strings under multiple supported names, connection resolution should be centralized. Persistence detection, migrations, runtime clients, and readiness checks should not each implement different environment-variable logic.

## Safety

No connection-string value is stored here.
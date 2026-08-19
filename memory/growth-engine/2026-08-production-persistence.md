# MEM-GrowthEngine-ProductionPersistence

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: persistence, postgres, vercel, production-readiness
- lastVerifiedAt: 2026-08-20

## What was learned
Growth Engine distinguishes a process-local `mock` repository from production `postgres` persistence. A successful deployment or object creation is not sufficient evidence of durable persistence.

Production readiness is established through an explicit persistence status plus an owner-protected Customer/Reservation roundtrip and a public-booking-to-Business-UI flow.

## Reusable lesson
For serverless applications, verify persistence across request boundaries and user flows. Do not infer production durability from a successful write response alone.

## Evidence
- https://github.com/karukimori-wq/Growth-Engine/blob/main/docs/production-persistence.md
- `GET /api/persistence/status`
- `POST /api/persistence/roundtrip`

## Safety boundary
Database connection strings and secrets must never be copied into this intelligence repository. Record variable names and verification outcomes only.
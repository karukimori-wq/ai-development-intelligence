# MEM-Numeria-ContractBoundary

- type: memory
- status: active
- project: karukimori-wq/numeria-studio
- domains: contracts, snapshots, data-safety, cross-app-integration

## What was learned
Numeria Studio owns appraisal Session and Report work, but not Customer, Reservation, Payment, Sales, communication records, Velvet professional memory, or AI usage/activity ledgers.

Growth Engine handoffs are reference-only. Numeria explicitly ignores prohibited inbound fields and returns IDs/statuses rather than Report bodies or business-sensitive data.

## Reusable lesson
Professional/domain applications should preserve their domain artifacts while consuming shared business entities by reference. URL handoffs and exports deserve the same data-minimization rules as APIs.

## Evidence
- https://github.com/karukimori-wq/numeria-studio/blob/main/docs/contract-alignment.md
# MEM-CommunicationPlanner-SafetyGates

- type: memory
- status: active
- project: karukimori-wq/Communication-Planner
- domains: safety, identity-scope, messaging, auditability

## What was learned
Wrong-person and wrong-conversation prevention is enforced as a sequence of hard gates, not as a prompt-only instruction. Reply generation requires person and conversation identity; retrieval is scoped to workspace + person; SafetyCheck is mandatory; stale checks fail; send confirmation must match person, conversation and channel; successful send decisions are auditable.

Provider delivery remains dry-run until production adapter readiness conditions are met.

## Reusable lesson
For high-consequence actions, encode identity/context invariants in application state and server-side gates. Do not rely on model attention or UI wording alone.

## 2026-08-24 Development Run Note
Communication Planner latest retrieval found this memory as the active project-specific guidance. The prior `channel-audit-contracts` failure is resolved on current main. A local follow-up run fixed adapter webhook and LINE live adapter static contract failures by making the webhook route's raw-payload stripping, received-event metadata, routed workspace handling, D1 persistence branch, and LINE missing-credential response explicit in source text.

Verification performed locally without installed dependencies:

- `node --test` over dependency-free contract suites: 47 tests passed, 0 failed.
- Full `node --test tests/*.test.mjs`, `npm test`, and `npm run typecheck` were not completed in the scratch environment because dependencies were absent and `npm ci` could not create `/root/.npm` on the read-only filesystem.

Communication Planner code commit was created locally, but remote push was not completed: direct `main` push was blocked by safety review, and normal branch push failed due missing git HTTPS credentials. The change remains suitable for explicit main approval or GitHub API based application.

## Evidence
- https://github.com/karukimori-wq/Communication-Planner/blob/main/docs/safety-rules.md
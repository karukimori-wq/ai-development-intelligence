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

## Evidence
- https://github.com/karukimori-wq/Communication-Planner/blob/main/docs/safety-rules.md
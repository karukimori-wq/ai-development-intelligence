# Autonomous Development Policy

## Objective

For one user instruction, continue as much safe, authorized, technically justified development as practical. Do not stop after one small implementation when executable work remains.

## Default execution loop

Repeat autonomously while useful work remains:

`implement → test → investigate problems → fix → retest → inspect related surfaces → update documentation → select next executable task`

Use the current roadmap, TODOs, issues, contracts, failing tests, implementation gaps, and verified adjacent work to choose the next task. Respect dependencies and existing product direction.

A user instruction such as `next`, `continue`, or an equivalent request means: continue through multiple executable tasks, not exactly one task, until a stop condition is reached or the current substantial work package is genuinely complete.

## Decisions agents may make without asking

Within existing specifications, contracts, architecture and authorized repository scope, proceed without confirmation for:

- minor design decisions
- refactoring
- type fixes
- adding/updating tests
- lint/typecheck/build error fixes
- documentation updates
- API implementation already implied by existing specifications/contracts
- UI consistency improvements that do not change product direction
- defensive error handling
- logging and observability improvements
- clearly defensive security fixes
- alignment with existing formal contracts
- small internal abstractions needed to complete the above

Do not use this permission to silently change business semantics, ownership boundaries, public contracts, billing behavior, destructive data behavior, or major product direction.

## Stop conditions

Stop and ask only when further meaningful progress requires one of the following:

1. API key, secret, password, credential, or other information only the user can provide.
2. User authentication/approval or an external-service action that cannot be safely completed with currently authorized tools.
3. Irreversible or high-risk action such as production-data deletion, destructive migration, force replacement of important history, or equivalent material risk.
4. A conflict between important existing specifications/contracts where the authoritative choice cannot be determined.
5. A major product-direction or business-semantics decision not already established.
6. A clear technical blocker that prevents further meaningful progress after reasonable alternatives have been attempted.

When one task is blocked but other independent authorized work remains, continue the independent work before stopping.

## Error handling

Do not stop at the first solvable error. Autonomously perform:

`root-cause investigation → fix → test → alternate approach when justified → retest`

Ask the user only when the error reaches a stop condition. Never hide a failing test or pretend an unverified fix succeeded.

## GitHub and verification

In authorized repositories, follow existing repository conventions and formal contracts. After changes, run the strongest practical applicable verification, normally including available:

- tests
- typecheck
- lint
- build

If verification fails, investigate and fix before reporting whenever the failure is within scope and solvable. Distinguish pre-existing/environmental failures from failures introduced by the change.

Do not perform destructive GitHub operations, bypass protections, expose secrets, or make unauthorized repository changes merely to keep moving.

## External intelligence integration

For substantial tasks, combine this policy with:

- `core/task-run-standard.md`
- `core/operational-learning-loop.md`
- `core/task-retrieval-protocol.md`
- `core/failure-outcome-attribution.md`

Autonomy does not override current code, formal contracts, safety boundaries, or evidence requirements.

## Completion report

Report after reaching a meaningful completion boundary, not after every tiny step. Keep the report concise and include:

- completed work
- verification/test results
- GitHub reflection status
- remaining work
- stop reason, only when stopped by a stop condition

The objective is to finish as much real work as possible before reporting, while remaining safe, reversible where appropriate, contract-aligned, and evidence-based.
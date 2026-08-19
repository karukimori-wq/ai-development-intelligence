# Task Retrieval Protocol

Use this protocol before substantial coding, debugging, architecture, deployment, integration, or production-readiness work.

## 1. Build a task fingerprint

Extract only the signals needed to retrieve prior intelligence:

- target project/repository
- operation: build | debug | deploy | integrate | migrate | test | review
- technologies/providers
- affected domain: auth | persistence | API | events | routing | UI | safety | observability | etc.
- side-effect level: none | reversible | external/high-consequence
- known symptom/error terms
- cross-app participants

Do not put secrets or raw customer/user data into the fingerprint.

## 2. Read compact indexes first

Read:

1. `index/knowledge-index.json`
2. `index/project-index.md`
3. `memory/<project>/` only for the target project when useful

Never begin by bulk-reading `knowledge/` or `evidence/`.

## 3. Rank candidates

Prefer entries matching, in order:

1. active Rules matching the domain or operation
2. active/candidate Failures matching the symptom, provider, route, or integration
3. Patterns matching the technology or architecture
4. project Memory for prior local decisions

Increase priority when an entry:

- was observed in the target project
- was observed in multiple projects
- has high confidence
- was verified recently
- has direct evidence from the same technology/provider

Decrease priority when stale, superseded, contradicted, or only weakly analogous.

## 4. Retrieval budget

Default initial budget:

- up to 3 Rules
- up to 3 Failures
- up to 2 Patterns
- up to 2 project memories

Expand only when the task remains ambiguous. The goal is to avoid loading the library into context.

## 5. Evidence escalation

Read evidence only when:

- the remembered claim changes architecture or a production decision
- the task is high-consequence
- the knowledge conflicts with current code/contracts
- confidence is insufficient
- the receiving repository has changed since last verification

Current implementation and formal contracts always override remembered summaries.

## 6. Pre-work intelligence brief

Before editing, form a compact internal brief:

- applicable Rules
- relevant prior Failures
- likely traps
- required verification
- facts that must be rechecked in current code

This is a working aid, not a substitute for inspecting the target repository.

## 7. Post-work capture

After meaningful work:

1. identify new Discovery/Failure/Decision evidence
2. search for an existing underlying claim
3. add evidence instead of duplicating when possible
4. update observation count/confidence only when supported
5. evaluate Pattern/Rule promotion using `core/promotion-policy.md`
6. update compact indexes

## Non-negotiable boundaries

- Never retrieve or store secrets as intelligence.
- Never let memory override current contracts or code evidence.
- Never claim an old fix applies without checking the current failure surface.
- Never treat retrieval count or cache rate as proof of better engineering outcomes.
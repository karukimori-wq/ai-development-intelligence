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

Read `index/knowledge-index.json` and relevant project memory. Never begin by bulk-reading `knowledge/` or `evidence/`.

When a local checkout is available, use the deterministic ranker to produce the initial candidate order, for example:

`node scripts/rank-knowledge.mjs --project=Growth-Engine --domains=deployment,persistence --keywords=postgres,readiness`

The ranking policy lives in `config/retrieval-ranking.json`.

## 3. Ranking semantics

Ranking is triage, not truth. It prefers active Rules, then Failures, then Patterns; exact project/domain matches; multi-project observations; evidence; and verified knowledge. It penalizes stale/unverified knowledge and excludes rejected/superseded/subsumed entries from default ranked output.

A high score means **read this earlier**, not **apply this automatically**.

## 4. Retrieval budget

Default initial budget:

- up to 3 Rules
- up to 3 Failures
- up to 2 Patterns
- up to 2 other/project memories
- maximum 10 total candidates

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

After meaningful work, run `core/knowledge-extraction-protocol.md`, deduplicate against existing knowledge, preserve evidence/contradictions, evaluate promotion, and regenerate derived artifacts.

## Non-negotiable boundaries

- Never retrieve or store secrets as intelligence.
- Never let memory override current contracts or code evidence.
- Never claim an old fix applies without checking the current failure surface.
- Never treat ranking score, retrieval count, or cache rate as proof of better engineering outcomes.
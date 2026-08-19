# Phase 2 Audit — 2026-08-20

## Scope

Audit the external development-intelligence foundation before Phase 3: retrieval, extraction, promotion, evidence, usage metrics, and project entrypoints.

## Verified inventory

- Rules directory: 3 entries.
- Patterns directory: 5 entries.
- Failures directory: 3 entries.
- Evidence directory contains evidence for the JSON Failure/Pattern/Rule entries added during Phase 2.
- Compact index currently lists 11 knowledge entries.
- Retrieval, extraction, promotion, usage-ledger, metrics, and schemas are present.
- Six development repositories have an `AGENTS.md` entrypoint to this intelligence system.

## Findings

### A1 — Mixed Markdown/JSON knowledge representation

Severity: medium

Some early Rule/Pattern entries are Markdown while newer entries are structured JSON. This is valid for human reading but prevents uniform schema validation and reliable automated aggregation.

Action for Phase 3: introduce a canonical machine-readable manifest/metadata record for every entry, without requiring human-readable documents to disappear.

### A2 — Promotion relationship does not yet change source Pattern status

Severity: medium

`RULE-readiness-must-prove-runtime-capability` records a superseding relationship to the live-side-effects readiness Pattern, while that Pattern remains `active`. Relationship history is useful, but automated retrieval could return both as equally current guidance.

Action: define promotion semantics: promoted/superseded Patterns remain historical evidence but retrieval should prefer the active Rule and mark the narrower Pattern as `superseded` or `subsumed` where appropriate.

### A3 — Index maintenance is manual

Severity: high for scale, low for current size

The compact index is hand-maintained. As knowledge grows, omitted entries and stale paths will become likely.

Action: Phase 3 should add deterministic index validation/generation.

### A4 — Evidence integrity is convention-based

Severity: medium

Evidence IDs are referenced by structured entries, but there is no automated check that every ID resolves to an evidence file and no reverse index showing which knowledge depends on each evidence item.

Action: add evidence-reference validation and a reverse evidence index.

### A5 — Usage ledger concurrency needs a safe write strategy

Severity: medium

Monthly JSONL is compact, but multiple agents writing the same file can conflict through GitHub contents updates.

Action: prefer immutable per-event files (`usage/YYYY/MM/<eventId>.json`) for concurrent agents, with optional generated JSONL aggregation.

### A6 — Outcome metrics are correctly unproven

Severity: none / positive finding

Outcome metrics remain unknown rather than being inferred from repository size or cache behavior. Preserve this discipline.

### A7 — External intelligence authority boundary is explicit

Severity: none / positive finding

Agent entrypoints state that current target code and formal contracts outrank learned intelligence. Preserve this invariant.

### A8 — Secrets boundary is explicit

Severity: none / positive finding

The system prohibits secrets, credentials, connection-string values, tokens, private keys, and sensitive personal data from intelligence/evidence/usage capture. Preserve and later automate secret scanning where practical.

## Phase 2 exit assessment

Status: **ready_for_phase_3_with_known_debt**

The learning loop is complete enough for controlled use:

`retrieve → work → verify → extract → deduplicate → evidence → promote → log usage → measure`

Phase 3 should focus on reliability and automation rather than adding large amounts of new knowledge:

1. canonical metadata/manifest
2. index generation/validation
3. evidence-reference validation
4. promotion/subsumption semantics
5. concurrency-safe usage events
6. stale-knowledge checks
7. lightweight CI integrity checks

Do not add a vector database until repository-scale retrieval demonstrates that the compact index/search approach is insufficient.
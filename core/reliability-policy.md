# Reliability Policy

Phase 3 makes the intelligence system reliable before making it larger.

## Canonical metadata

`index/knowledge-manifest.json` is the canonical machine-readable inventory of knowledge entries. Human-readable Markdown and structured JSON entry bodies may coexist, but every retrievable entry must have one manifest record.

`index/knowledge-index.json` remains a compact retrieval surface and may later be generated from the manifest.

## Retrieval status semantics

Default retrieval priority:

1. active Rule
2. active Failure
3. candidate Pattern/Failure when relevant
4. project memory

`subsumed`, `superseded`, `stale`, and `rejected` entries are not default guidance. They remain available for history, evidence, contradiction analysis, or explicit investigation.

When a Pattern is generalized into an active Rule, mark the narrower Pattern `subsumed` in canonical metadata unless it still contains independent guidance not represented by the Rule.

## Evidence integrity

Every `evidenceIds` value in the manifest must resolve to `evidence/<id>.md` or a future explicitly supported evidence representation. Missing evidence is an integrity error, not a reason to invent evidence.

Entries with no evidence may remain when they are policy/architecture bootstrap knowledge, but they must not be presented as empirically validated merely because they are active.

## Index integrity

Every retrievable knowledge file must appear exactly once in the manifest. Every manifest path must resolve to a real file. Duplicate IDs are invalid.

## Usage concurrency

New usage events should use immutable per-event files by default:

`usage/YYYY/MM/events/<eventId>.json`

Monthly JSONL is an optional generated aggregate, not the primary concurrent-write surface.

## Staleness

Staleness is domain-sensitive. Provider/framework/deployment knowledge should be revalidated after material upstream changes. Formal-contract knowledge should be revalidated when the contracts repository changes. `stale` means revalidation required, not automatically false.

## Automation target

Phase 3 automation should eventually fail CI for:

- duplicate knowledge IDs
- manifest paths that do not exist
- indexed entries missing from manifest
- unresolved evidence references
- invalid structured JSON/schema
- usage events that violate schema

Warnings should cover:

- stale knowledge
- active Pattern apparently subsumed by an active Rule
- evidence-free promoted empirical Rules
- project AGENTS entrypoints that stop referencing the intelligence repository

Automation must not rewrite knowledge claims or confidence without evidence.
# AI Development Intelligence — Agent Map

## Mission

Preserve verified development experience so future agents can reuse prior reasoning without loading the entire knowledge base.

## Start every substantial task

1. Identify the target project, technologies, operation, and failure mode.
2. Follow `core/task-retrieval-protocol.md`.
3. Read `index/knowledge-index.json` and `index/project-index.md`.
4. Search `knowledge/` and the relevant `memory/<project>/` before expensive rediscovery.
5. Read only entries relevant to the current task.
6. Follow links to evidence when a remembered claim affects an important decision.
7. Inspect current target code/contracts before applying remembered guidance.

For trivial edits with no meaningful engineering decision, retrieval may be skipped.

## Source-of-truth boundaries

- This repository is authoritative for development memory and learned engineering knowledge only.
- Target repositories are authoritative for their implementation.
- Formal platform/API/event/data-ownership contracts remain authoritative in their contracts repository.
- Never copy a product source of truth into this repository as if this repository owned it.

## Capture after meaningful work

At completion of meaningful engineering work, run `core/knowledge-extraction-protocol.md`.

Capture only information likely to change a future engineering decision. Classify it as one of:

- discovery
- failure
- decision
- pattern
- rule

A completed task does not automatically deserve a knowledge entry. Selectivity is required.

Do not store raw logs, secrets, credentials, personal data, generated build output, or generic documentation that is easy to rediscover.

## Evidence requirements

Every promoted pattern or rule must point to evidence. Prefer stable references such as repository + commit SHA, PR, issue, test, endpoint result, or reproducible observation. Distinguish observed facts from inference.

## Deduplication

Before creating an entry, search for the same underlying claim. If it exists, add evidence, projects observed, verification date, or contradiction data instead of creating a duplicate.

## Promotion

Use `core/promotion-policy.md`. Never promote an item just because it appears plausible. Repeated independent observations increase confidence; contradictions decrease it and must be preserved.

## Retrieval discipline

Use progressive disclosure:

1. indexes
2. entry summaries/front matter
3. full relevant entries
4. evidence only when needed

Default to the retrieval budget in `core/task-retrieval-protocol.md`. Do not bulk-load the repository into context.

## Safety and integrity

- Never commit secrets, tokens, passwords, connection strings, private keys, or sensitive personal information.
- Redact evidence before capture when necessary.
- Never fabricate evidence, observation counts, test results, commits, or confidence.
- Mark stale or superseded knowledge rather than silently rewriting history.

## Completion

For meaningful work, completion means both:

1. the target engineering task is verified, and
2. knowledge extraction has been evaluated, even when the correct result is `capture: no`.

When changing this repository, keep indexes consistent with added knowledge and validate structured JSON against its schema where practical.
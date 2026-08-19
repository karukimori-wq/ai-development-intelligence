# Retrieval Policy

## Goal

Retrieve the smallest useful slice of prior intelligence that can materially improve the current task.

## Query construction

Derive retrieval terms from:

- target repository/project
- technology/framework/service
- operation being attempted
- observed symptom/error
- architectural domain
- relevant contract or invariant

## Retrieval order

1. `index/knowledge-index.json`
2. `index/project-index.md`
3. exact relevant entries under `knowledge/`
4. relevant project memory under `memory/`
5. supporting evidence only when a claim needs verification

## Ranking

Prefer entries with:

- direct domain overlap
- matching failure symptom or operation
- active status
- higher evidence quality
- recent verification for fast-changing technology
- cross-project confirmation

Do not rank solely by confidence score.

## Context budget discipline

Do not load all knowledge. Start with summaries and IDs. Expand only entries that can change the next action. If several entries say the same thing, prefer the canonical entry and its evidence links.

## Reconnect behavior

When a task resembles previous work, first retrieve the relevant project memory to recover prior state, then retrieve reusable cross-project knowledge to guide the new decision.

## When retrieval conflicts with reality

Current verified source code, tests, authoritative contracts, and current service behavior override stale memory. Record the contradiction and update or supersede the knowledge entry after verification.

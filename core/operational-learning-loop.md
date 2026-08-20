# Operational Learning Loop

Phase 5 turns the repository from a maintained library into a routine development feedback system.

## Per substantial engineering task

### 1. Retrieve
Build the task fingerprint and retrieve a bounded intelligence brief using `core/task-retrieval-protocol.md`. Record an immutable `retrieval` event only when intelligence was actually consulted.

### 2. Work and verify
Inspect current code/contracts, perform the engineering task, and verify the result. Retrieved intelligence is advisory.

### 3. Attribute use honestly
After verification, classify retrieved knowledge:

- `knowledge_used` when it materially changed investigation, implementation or verification
- `knowledge_rejected` when current evidence showed it should not apply
- `failure_prevented` only when `core/failure-outcome-attribution.md` requirements are satisfied
- `repeat_failure` only when the same attribution policy proves a known failure actually recurred

Do not infer usefulness merely from retrieval. Never manufacture prevention or recurrence events to populate metrics.

### 4. Extract
Run `core/knowledge-extraction-protocol.md`. Record `extraction_evaluated` even when `capture: no` for substantial tasks where operational instrumentation is enabled.

### 5. Capture selectively
If reusable knowledge exists, deduplicate, attach stable evidence, update or create the smallest appropriate entry, evaluate promotion, regenerate derived artifacts, and record `knowledge_captured`.

### 6. Learn from rejection and contradiction
Rejected or contradicted knowledge is not a system failure by itself. Use it to refine applicability, exceptions, confidence, freshness, or supersession.

## Operational task identity

Events belonging to one engineering task should share a non-sensitive `taskRunId`. The task ID is correlation metadata only; it must not contain user/customer data, secrets, branch credentials, or raw prompts.

## Adoption strategy

Start instrumentation on the connected development repositories already carrying AGENTS.md. Keep logging lightweight. The first objective is trustworthy observations, not high event volume.

## Success criteria

Phase 5 succeeds when real tasks produce enough trustworthy events to answer which knowledge is retrieved but never useful, which rules repeatedly help across projects, which failures recur despite being known, where retrieval misses relevant knowledge, and whether comparable work improves over time.

Do not claim model improvement from repository growth alone.
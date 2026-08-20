# Task Run Standard

This standard makes the Operational Learning Loop routine rather than optional ceremony.

## When a Task Run is required

Create a Task Run for substantial coding, debugging, deployment, migration, integration, architecture, production-readiness, safety, or non-trivial review work. Skip trivial formatting, typo-only edits, generated-file refreshes, and other work with no meaningful engineering decision.

## TaskRunId

Use:

`TASK-<project>-<short-purpose>-<YYYYMMDD>-<unique-suffix>`

Keep it non-sensitive. Do not include customer names, secrets, tokens, credentials, private issue text, or raw prompts.

## Standard lifecycle

1. **Start** — identify project, taskClass, domains, technologies, symptom/goal and side-effect level.
2. **Retrieve** — run bounded retrieval. If intelligence is actually consulted, write one immutable `retrieval` event containing only the knowledge IDs read.
3. **Work** — inspect current code/contracts and perform the task.
4. **Verify** — run the strongest practical verification for the task.
5. **Attribute** — for retrieved knowledge, write `knowledge_used` and/or `knowledge_rejected` only after verification. Use `failure-outcome-attribution.md` for prevention/recurrence.
6. **Extract** — evaluate reusable learning and write `extraction_evaluated` when instrumentation is enabled.
7. **Capture** — only when warranted: deduplicate, attach evidence, update/create knowledge, evaluate promotion, then record `knowledge_captured`.
8. **Regenerate** — refresh indexes/metrics when the intelligence repository changed.

## Minimum complete loop

A Task Run counts as complete when it has:

- at least one `retrieval` event when prior intelligence was consulted, and
- one `extraction_evaluated` event after verification.

`knowledge_used`, `knowledge_rejected`, and `knowledge_captured` are optional outcomes, not completion requirements.

## Event write rules

- one event = one immutable JSON file
- filename equals eventId
- all events for the task share taskRunId
- timestamps must reflect actual observation time; never pre-date or future-date events for convenience
- notes state observable engineering facts, not hidden reasoning
- never overwrite an event to change history; corrections should be explicit unless fixing a metadata-entry mistake immediately after creation

## Lightweight operating principle

The loop should cost seconds/minutes, not become a second project. Retrieve a small working set and capture only knowledge likely to change a future engineering decision.

## Automation boundary

AGENTS.md should instruct agents to follow this standard. Scripts may generate IDs/templates and validate events, but automation must never infer `knowledge_used`, `failure_prevented`, `repeat_failure`, confidence, or promotion without verified evidence.
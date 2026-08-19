# Usage Ledger Protocol

Record compact intelligence-use events for substantial tasks after the fact. Logging must never become more expensive than the engineering benefit.

## When to record

For a substantial task, record events when applicable:

- `retrieval` — prior intelligence was consulted
- `knowledge_used` — one or more entries materially changed the work
- `knowledge_rejected` — retrieved guidance was checked and intentionally not applied
- `failure_prevented` — a prior failure/check concretely caught a repeat condition before impact
- `repeat_failure` — a known failure recurred despite available intelligence
- `extraction_evaluated` — post-work extraction review was performed
- `knowledge_captured` — new/updated reusable knowledge was persisted
- `contradiction_observed` — current evidence contradicted existing intelligence

Do not log every file read or every thought.

## Event construction

Use `schemas/intelligence-event.schema.json`.

Required minimum:

- unique eventId
- eventType
- timestamp
- project
- taskClass

Add `knowledgeIds` only for entries actually retrieved/used/rejected. Add Evidence IDs when the event relies on stable evidence.

## Outcome integrity

- `helped`: knowledge materially shortened investigation or changed a decision/verification.
- `neutral`: retrieved/evaluated but no material effect.
- `rejected`: current code/contracts/evidence showed it should not apply.
- `prevented_failure`: concrete known failure condition was caught before impact.
- `failed`: intelligence was applied but contributed to an incorrect/failed result.

Never infer `prevented_failure` merely because a Rule was read.

## Privacy and safety

Event notes must be terse and engineering-only. No secrets, credentials, connection values, customer data, raw messages, source dumps, or hidden reasoning.

## File organization

Append events to `usage/YYYY/MM/events.jsonl`. Keep one JSON object per line. If concurrent writers make append unsafe, create uniquely named event files and consolidate later rather than overwriting another event.

## Aggregation

Metrics may be computed from ledger events, but low sample sizes must remain explicit. Do not report causal improvement until comparable tasks provide enough observations.
# Intelligence Metrics

Metrics answer a different question from the knowledge library: **is the external intelligence actually becoming more useful and trustworthy?**

## Three metric layers

### 1. Inventory

Counts what exists: Rules, Failures, Patterns, Evidence, project memories, connected agent entrypoints.

Inventory growth is not success by itself. A smaller high-signal library can be better than a large noisy one.

### 2. Knowledge health

Track:

- evidence coverage
- multi-project observations
- contradictions
- superseded knowledge
- stale verification
- unresolved evidence references
- candidate-to-active promotion quality

### 3. Engineering outcomes

These are the important metrics once usage instrumentation exists:

- retrieval events per substantial task
- retrieved knowledge actually used
- repeat failure rate
- failures prevented by prior intelligence
- iterations to verified fix
- time to root cause
- expensive rediscovery avoided
- new input tokens per comparable task

Do not infer these from repository size.

## What not to optimize directly

Do not optimize for:

- total character count
- total knowledge-entry count
- cache percentage alone
- number of Rules
- number of retrievals

Those can all increase while engineering quality gets worse.

## Staleness

An entry is a stale candidate when its `lastVerifiedAt` exceeds the domain's reasonable verification horizon or when the underlying provider/framework/contract materially changes. Stale does not mean false; it means revalidation is required before relying on it for an important decision.

## Baseline

`intelligence-health.json` is the current machine-readable baseline. Unknown outcome values stay `null` until observed. Never backfill invented success metrics.
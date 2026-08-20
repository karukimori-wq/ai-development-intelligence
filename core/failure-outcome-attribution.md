# Failure Outcome Attribution

Use this policy before recording `failure_prevented` or `repeat_failure`. These events are high-value metrics and require stronger evidence than ordinary retrieval/use events.

## `failure_prevented`

Record only when all are true:

1. A known Failure/Rule was retrieved or an equivalent automated check derived from it ran before impact.
2. The current task contained the same underlying hazardous condition or root-cause structure, not merely a vaguely similar domain.
3. The knowledge/check caused a concrete intervention: code changed, deployment blocked, send blocked, test added/fixed, configuration corrected, or release stopped.
4. Evidence shows the condition existed before the intervention and was absent/controlled after it.
5. The prevented outcome is described conservatively. Do not claim an incident definitely would have happened.

Good evidence: failing regression test caught before merge; readiness gate blocks live side effect; pre-deploy check finds unreachable DB; review catches sender/source precedence regression before release.

Not enough: reading a Rule, adding a checklist item, or believing the advice was useful.

## `repeat_failure`

Record only when all are true:

1. The Failure/Rule already existed and was retrievable before the new occurrence.
2. Current evidence demonstrates the same underlying failure/root cause recurred.
3. The occurrence reached a meaningful failure boundary (test failure, broken behavior, invalid integration, unsafe state, deployment failure, etc.).
4. Link the prior knowledge ID and current evidence.

A repeat failure is valuable evidence. Do not hide it to protect success metrics.

## Classification boundaries

- Historical failure is fixed in current code → `knowledge_rejected` for current applicability, not `repeat_failure`.
- Similar symptom with different root cause → neither; capture a new Failure if reusable.
- Rule catches a risky condition but there is no evidence it existed → `knowledge_used`, not `failure_prevented`.
- Current evidence contradicts the stored root cause → `contradiction_observed`, then refine knowledge.

## Evidence requirements

Prefer commit SHA + diff, regression test, CI result, endpoint/readiness result, or reproducible current-code observation. Event notes should summarize the engineering fact without raw logs, secrets, customer data, or hidden reasoning.

## Metrics discipline

Report prevention and recurrence counts alongside sample size and task count. A falling repeat-failure rate is interesting only after enough comparable operational tasks exist.
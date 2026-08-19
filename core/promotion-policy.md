# Promotion Policy

Promotion converts observations into stronger reusable guidance. It is deliberately conservative.

## Lifecycle

`observation -> discovery/failure/decision -> pattern candidate -> pattern -> rule candidate -> rule`

Not every entry needs to reach `rule`.

## Promotion dimensions

Evaluate:

1. **Evidence quality** — Is the claim backed by reproducible or stable evidence?
2. **Independence** — Was it observed in genuinely different contexts rather than repeated in one run?
3. **Relevance** — Would it change a future engineering decision?
4. **Generality** — Is the claim broader than one repository-specific implementation detail?
5. **Contradictions** — Are there counterexamples or incompatible environments?
6. **Freshness** — Is the evidence recent enough for the technology involved?

## Default thresholds

These are defaults, not mechanical truth:

- One verified observation: discovery/failure/decision.
- Two independent observations: pattern candidate may be justified.
- Three or more independent observations with no material contradiction: pattern may be justified.
- A rule requires a verified pattern, actionable wording, explicit applicability, evidence, and documented exceptions or known limits.

Security, destructive operations, data integrity, and contract invariants may justify a rule with fewer observations when the underlying requirement is authoritative. The authority must be cited.

## Confidence

Use a value from `0.0` to `1.0` as a retrieval aid, not as fake precision.

Suggested bands:

- `<0.50` tentative
- `0.50–0.74` useful but verify
- `0.75–0.89` strong
- `>=0.90` high confidence within stated scope

Confidence must never substitute for evidence.

## Contradictions

Do not delete inconvenient counterexamples. Link them, reduce confidence if appropriate, narrow applicability, or mark the entry superseded.

## Demotion and supersession

Knowledge may become stale. Set status to `deprecated` or `superseded`, explain why, and link to the replacement. Preserve history so agents can understand old decisions.

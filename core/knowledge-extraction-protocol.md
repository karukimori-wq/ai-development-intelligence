# Knowledge Extraction Protocol

Run this review after meaningful engineering work. The goal is not to document everything; it is to preserve only experience likely to change a future engineering decision.

## 1. Ask five questions

1. Did something fail or behave differently from expectation?
2. Was a root cause established with evidence?
3. Was a non-obvious engineering decision made and why?
4. Did this work confirm, contradict, narrow, or extend existing intelligence?
5. Would a future agent save meaningful investigation, avoid a failure, or make a better decision by knowing this?

If all answers are no, do not capture knowledge.

## 2. Candidate classification

- **Discovery** — newly observed fact or mechanism with reuse potential.
- **Failure** — symptom + root cause + correction/avoidance when known.
- **Decision** — chosen approach with alternatives/tradeoffs and evidence.
- **Pattern** — recurring structure supported by more than a one-off observation.
- **Rule** — strongly supported guidance with clear applicability and exceptions.

Do not promote directly to Pattern/Rule merely because an idea sounds generally useful. Use `core/promotion-policy.md`.

## 3. Evidence first

Before writing the conclusion, identify stable evidence:

- repository + commit SHA
- PR or issue
- regression/contract test
- endpoint/readiness result
- reproducible observation

Record the minimum evidence needed to reconnect to the original work. Do not copy raw logs when a stable reference is enough.

## 4. Deduplicate before create

Search `index/knowledge-index.json` and matching knowledge domains.

If the same underlying claim exists:

- add evidence
- add project observation
- update verification date
- adjust confidence only when justified
- record contradiction/exception when applicable

Prefer strengthening an existing entry over creating synonyms.

## 5. Capture threshold

Capture when at least one is true:

- root cause was non-obvious
- investigation was expensive
- failure could recur across projects
- security/safety/data-integrity impact exists
- production/deployment behavior differed from local assumptions
- integration contract drift occurred
- a reusable test/check prevented recurrence
- existing intelligence was contradicted or materially refined

Usually skip:

- trivial typo fixes
- obvious formatting/UI copy changes
- routine dependency bumps with no learned behavior
- generic framework knowledge easy to rediscover
- raw task summaries

## 6. Contradictions are valuable

Never delete or hide a contradiction to keep a Rule looking clean. Link it, lower confidence if warranted, add exceptions, or mark knowledge superseded when evidence supports that conclusion.

## 7. Sensitive-data filter

Before capture, reject/redact:

- passwords and secrets
- API/access tokens
- connection-string values
- private keys
- personal/customer data
- raw sensitive messages/transcripts
- proprietary payload bodies not needed to preserve the engineering lesson

Store names of configuration keys only when useful; never their secret values.

## 8. Post-capture maintenance

After adding or updating intelligence:

1. update `index/knowledge-index.json`
2. update project memory/index when appropriate
3. validate structured entry shape against schema where practical
4. evaluate promotion
5. ensure Evidence IDs resolve
6. ensure current contracts/code remain the higher authority

## Extraction output shape

An agent performing extraction should be able to state internally:

- `capture`: yes/no
- `candidateType`
- `claim`
- `reuseReason`
- `evidence`
- `existingEntryMatch`
- `contradiction`
- `sensitiveDataRemoved`
- `promotionAction`

This review is part of completion for meaningful work, but knowledge creation itself must remain selective.
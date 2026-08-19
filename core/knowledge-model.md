# Knowledge Model

## Two-layer model

### Project Memory

Project memory answers: **What happened before in this project?**

It may contain milestones, architectural decisions, failed approaches, verified operational state, reconnect pointers, and links to evidence. It is intentionally project-specific.

### Reusable Knowledge

Reusable knowledge answers: **What should a future agent know when facing a similar problem?**

It is organized into discoveries, failures, decisions, patterns, and rules and should be applicable beyond a single transient task.

## Entry types

### Discovery
A potentially reusable observation whose generality is not yet established.

### Failure
A failed approach or failure mode with symptom, root cause when known, resolution, and prevention guidance.

### Decision
A meaningful engineering choice including context, alternatives, rationale, trade-offs, and revisit conditions.

### Pattern
A structure observed repeatedly across sufficiently independent evidence.

### Rule
A high-confidence actionable constraint or default that should influence future work. Rules must state applicability and exceptions.

## Required distinctions

Every entry should make these boundaries explicit:

- fact vs inference
- project-specific vs cross-project
- current vs superseded
- evidence vs summary
- confidence vs certainty

## Relationships

Entries can relate through:

- `supports`
- `contradicts`
- `supersedes`
- `derived_from`
- `similar_to`
- `applies_to`

Relationships should use stable entry IDs.

## Stable IDs

Use prefixes:

- `DISC-` discovery
- `FAIL-` failure
- `DEC-` decision
- `PAT-` pattern
- `RULE-` rule
- `EVID-` evidence
- `MEM-` project memory

Follow with a zero-padded numeric sequence or another repository-unique stable suffix. IDs do not change when titles change.

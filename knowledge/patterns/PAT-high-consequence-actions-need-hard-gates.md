# PAT-high-consequence-actions-need-hard-gates

- id: PAT-high-consequence-actions-need-hard-gates
- type: pattern
- status: candidate
- confidence: 0.82
- observedCount: 1
- domains: safety, authorization, messaging, ai-assisted-actions
- projectsObserved: Communication-Planner

## Pattern
When an AI-assisted workflow can act on the wrong entity, recipient, account, or irreversible target, safety-critical scope must be revalidated at the action boundary.

## Recommended shape
- require stable entity identifiers before generation;
- retrieve context using the narrowest valid scope;
- persist the scope used for generation/checking;
- invalidate approval when content changes;
- require explicit target confirmation at execution;
- reject mismatches server-side;
- record the passed gate decision for audit;
- keep external delivery disabled or dry-run until adapter readiness is proven.

## Evidence
- Communication Planner `docs/safety-rules.md`

## Promotion note
Candidate until independently validated in other action domains.
# Integrity Negative Fixtures

These fixtures are intentionally invalid. They are not knowledge and must never be indexed.

Phase 3 self-tests copy the real repository into a temporary directory, inject one controlled defect, and assert that the relevant validator fails.

Covered failure classes:

- duplicate knowledge ID
- unresolved evidence reference
- manifest path missing
- knowledge JSON schema violation
- immutable usage event filename mismatch
- immutable usage event partition mismatch
- generated index drift

Fixtures live under `tests/fixtures/` so production validators do not scan them as live intelligence.
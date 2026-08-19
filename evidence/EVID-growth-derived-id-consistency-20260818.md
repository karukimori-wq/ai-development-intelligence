# EVID-growth-derived-id-consistency-20260818

Source: `karukimori-wq/Growth-Engine`
Commit: `f07aa2abc584da1e74d230f73deed29a2eaaafc0`
Observed: 2026-08-18

## Observation

Several actions on one reservation detail screen previously obtained a follow-up identifier through different paths. The change derives `followupId` once from the current reservation and reuses that same value for follow-up, post-draft and message-draft navigation.

## Reusable signal

When several downstream actions represent the same workflow instance, derive the workflow/reference identifier once from the canonical upstream entity and propagate it consistently. Do not mix fixture/default context with live entity-derived identifiers.
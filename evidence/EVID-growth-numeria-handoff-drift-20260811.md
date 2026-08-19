# EVID-growth-numeria-handoff-drift-20260811

Source: `karukimori-wq/Growth-Engine`
Commit: `2988ef710da56eedf7875a72077185671f2bdf45`

The Numeria launch helper previously used `/app/sessions/start`, demo/default identity, and extra handoff parameters. The fix moved the target to `/app/growth/start`, accepted live `workspaceId` and `userId`, and kept the request focused on reservation/customer references plus intent.

Reusable lesson: cross-app navigation is an API contract. The sender should derive route and allowed parameters from the receiver's current contract rather than from stale local assumptions.
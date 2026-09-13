# Growth Engine release-readiness follow-up — 2026-09-13

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: integrations, production-readiness, monitoring, business-boundary
- lastVerifiedAt: 2026-09-13
- sourceHead: 38fa50732079b765436bb26050c4e6c74852c6df

## Verified repository state

Growth Engine main advanced from `f3d430b` to `38fa507` after a second release-readiness audit against the current professional-platform-contracts Plan contract.

Two additional PRs were merged with full CI verification:

- PR #10, merged as `81720ec`, removed the hard-coded legacy AI Platform Core preview URL from `src/app/api/integrations/ai-platform-core/activity-test/route.ts`. The route now reads server-side `AI_PLATFORM_CORE_URL` and falls back to `https://ai-platform-core.karukimori.workers.dev`. `.env.example` documents the same endpoint and regression tests forbid the old preview URL.
- PR #10 also expanded `/release/status` with Platform Admin monitoring metadata for entitlement readiness, usage readiness, AI Platform Core integration state, Feedback Hub release scope, latest deploy identity, and primary error categories. Business remains unavailable/not purchasable and no Business product functionality was added.
- PR #11, merged as `38fa507`, changed the manual Cloudflare Production workflow so the deploy runner injects `GIT_COMMIT_SHA` into the Worker runtime configuration from `GITHUB_SHA`. Production smoke verification now requires `/version.commitSha` and `/release/status.latestDeploy.commitSha` to equal the exact deployed commit.
- The same smoke verification checks entitlement readiness, usage readiness, AI Platform Core endpoint configuration, Feedback Hub release scope, auth readiness, D1 readiness, Business unavailable state, and the existing Customer/Reservation D1 roundtrip.

PR #10 and PR #11 both passed `npm run typecheck`, `npm run test:contracts`, `npm run build`, and `npm run cf:build` before merge.

## Important deployment distinction

The repository state through `38fa507` is CI-verified but has not yet been deployed by a new Cloudflare Production workflow run.

Do not describe the APC endpoint cutover, expanded `/release/status` metadata, or deployed-SHA verification as Production-verified until the next intentional release-boundary `Cloudflare Production` run succeeds.

Continue batching safe release-readiness changes. Do not run Production for every small merge.

## Business boundary remains unchanged

- Business remains `unavailable` for normal users.
- `business.cross_app.flow` remains default-off.
- Free and Pro do not authorize Business integrations.
- Growth Engine remains Source of Truth for Customer, Reservation, Payment, Sales, Public Site, and Business plan workflow.
- No Business purchase flow, refund UI, sales UI expansion, D1 schema change, or Numeria Pro / Velvet Pro feature mixing was introduced.

## Reconnect point

Before the final release-boundary Production run, re-read current Growth Engine main and the formal Plan contract. The manual Production workflow should be run once after the batch is intentionally ready, then its smoke checks should be treated as the runtime evidence for release status.

## Sensitive-data review

No secrets, owner access code, customer data, database credentials, API keys, or raw authentication material are included.

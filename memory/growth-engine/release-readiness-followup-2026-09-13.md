# Growth Engine release-readiness follow-up — 2026-09-13

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: integrations, production-readiness, monitoring, business-boundary
- lastVerifiedAt: 2026-09-14
- sourceHead: 4835be93b09a0218ba4bfd6ab5cedfa8ee2a4184

## Verified repository state

Growth Engine main advanced from `f3d430b` to `4835be9` after continued release-readiness audits against the current professional-platform-contracts Plan contract.

Five additional PRs were merged with full CI verification:

- PR #10, merged as `81720ec`, removed the hard-coded legacy AI Platform Core preview URL from `src/app/api/integrations/ai-platform-core/activity-test/route.ts`. The route now reads server-side `AI_PLATFORM_CORE_URL` and falls back to `https://ai-platform-core.karukimori.workers.dev`. `.env.example` documents the same endpoint and regression tests forbid the old preview URL.
- PR #10 also expanded `/release/status` with Platform Admin monitoring metadata for entitlement readiness, usage readiness, AI Platform Core integration state, Feedback Hub release scope, latest deploy identity, and primary error categories. Business remains unavailable/not purchasable and no Business product functionality was added.
- PR #11, merged as `38fa507`, changed the manual Cloudflare Production workflow so the deploy runner injects `GIT_COMMIT_SHA` into the Worker runtime configuration from `GITHUB_SHA`. Production smoke verification now requires `/version.commitSha` and `/release/status.latestDeploy.commitSha` to equal the exact deployed commit.
- The same smoke verification checks entitlement readiness, usage readiness, AI Platform Core endpoint configuration, Feedback Hub release scope, auth readiness, D1 readiness, Business unavailable state, and the existing Customer/Reservation D1 roundtrip.
- PR #12, merged as `7c1d553`, added a separate future Business cross-app access boundary without changing the existing internal owner-pilot Business APIs. The future resolver requires an active user, `planId: business`, formal Business availability `available`, `business.cross_app.flow` enabled, and matching workspace identity where applicable.
- PR #12 explicitly keeps `BUSINESS_CROSS_APP_FLOW_ENABLED=false` in the Cloudflare runtime configuration and local env example while Business is unreleased. `/release/status` exposes the effective flag and fail-closed gate metadata, and the Production smoke workflow fails if that flag becomes enabled during the current Free/Pro release scope.
- PR #13, merged as `71b4176`, removed unreleased Business wording from the Professional App selector and fixed a deeper Professional section page that still exposed direct links to Growth Engine Business Customer and Business home surfaces while Business was unavailable. Those links now use the same canonical Business availability check as the Professional home page.
- PR #14, merged as `4835be9`, added regression coverage that keeps `/app/business/:path*` behind signed owner-session middleware, constrains sign-in redirects to Business-local paths, and verifies the owner-session cookie remains HttpOnly, SameSite=Lax, and Secure.
- No public cross-app Business endpoint was introduced. The prepared resolver is intentionally unused until the formal Business release decision changes the shared contract.

PR #10 through PR #14 passed `npm run typecheck`, `npm run test:contracts`, `npm run build`, and `npm run cf:build` before merge.

## Important deployment distinction

The repository state through `4835be9` is CI-verified but has not yet been deployed by a new Cloudflare Production workflow run.

Do not describe the APC endpoint cutover, expanded `/release/status` metadata, deployed-SHA verification, future Business integration guard, or Professional Business-link cleanup as Production-verified until the next intentional release-boundary `Cloudflare Production` run succeeds.

Continue batching safe release-readiness changes. Do not run Production for every small merge.

## Business boundary remains unchanged

- Business remains `unavailable` for normal users.
- `business.cross_app.flow` remains default-off and the runtime flag is explicitly false.
- Free and Pro do not authorize Business integrations.
- Normal Professional App surfaces do not expose Business navigation while Business is unavailable.
- Direct internal owner-pilot Business URLs remain protected by signed owner-session middleware and are not public purchase/navigation entry points.
- The future cross-app resolver is separate from internal owner-pilot access and fails closed unless Business plan + Business available + feature flag enabled are all true.
- Growth Engine remains Source of Truth for Customer, Reservation, Payment, Sales, Public Site, and Business plan workflow.
- No Business purchase flow, refund UI, sales UI expansion, D1 schema change, or Numeria Pro / Velvet Pro feature mixing was introduced.

## Reconnect point

Before the final release-boundary Production run, re-read current Growth Engine main and the formal Plan contract. The manual Production workflow should be run once after the batch is intentionally ready, then its smoke checks should be treated as the runtime evidence for release status.

After that Production run, perform the deferred authenticated browser smoke for the Growth Engine → Numeria Studio handoff.

## Sensitive-data review

No secrets, owner access code, customer data, database credentials, API keys, or raw authentication material are included.

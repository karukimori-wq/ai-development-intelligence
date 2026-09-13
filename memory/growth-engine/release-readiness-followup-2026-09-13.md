# Growth Engine release-readiness follow-up — 2026-09-13

- type: memory
- status: active
- project: karukimori-wq/Growth-Engine
- domains: integrations, production-readiness, monitoring, business-boundary
- lastVerifiedAt: 2026-09-14
- sourceHead: d775c1854f08b198c2200a1d03b0fc1374edaaf2

## Verified repository state

Growth Engine main advanced from `f3d430b` to `d775c18` after continued release-readiness audits against the current professional-platform-contracts Plan contract.

Six additional PRs were merged with full CI verification:

- PR #10, merged as `81720ec`, removed the hard-coded legacy AI Platform Core preview URL from `src/app/api/integrations/ai-platform-core/activity-test/route.ts`. The route now reads server-side `AI_PLATFORM_CORE_URL` and falls back to `https://ai-platform-core.karukimori.workers.dev`. `.env.example` documents the same endpoint and regression tests forbid the old preview URL.
- PR #10 also expanded `/release/status` with Platform Admin monitoring metadata for entitlement readiness, usage readiness, AI Platform Core integration state, Feedback Hub release scope, latest deploy identity, and primary error categories. Business remains unavailable/not purchasable and no Business product functionality was added.
- PR #11, merged as `38fa507`, changed the manual Cloudflare Production workflow so the deploy runner injects `GIT_COMMIT_SHA` into the Worker runtime configuration from `GITHUB_SHA`. Production smoke verification now requires `/version.commitSha` and `/release/status.latestDeploy.commitSha` to equal the exact deployed commit.
- The same smoke verification checks entitlement readiness, usage readiness, AI Platform Core endpoint configuration, Feedback Hub release scope, auth readiness, D1 readiness, Business unavailable state, and the existing Customer/Reservation D1 roundtrip.
- PR #12, merged as `7c1d553`, added a separate future Business cross-app access boundary without changing the existing internal owner-pilot Business APIs. The future resolver requires an active user, `planId: business`, formal Business availability `available`, `business.cross_app.flow` enabled, and matching workspace identity where applicable.
- PR #12 explicitly keeps `BUSINESS_CROSS_APP_FLOW_ENABLED=false` in the Cloudflare runtime configuration and local env example while Business is unreleased. `/release/status` exposes the effective flag and fail-closed gate metadata, and the Production smoke workflow fails if that flag becomes enabled during the current Free/Pro release scope.
- PR #13, merged as `71b4176`, removed unreleased Business wording from the Professional App selector and fixed a deeper Professional section page that still exposed direct links to Growth Engine Business Customer and Business home surfaces while Business was unavailable. Those links now use the same canonical Business availability check as the Professional home page.
- PR #14, merged as `4835be9`, added regression coverage that keeps `/app/business/:path*` behind signed owner-session middleware, constrains sign-in redirects to Business-local paths, and verifies the owner-session cookie remains HttpOnly, SameSite=Lax, and Secure.
- PR #15, merged as `d775c18`, closed seven operational cross-app `*-test` API endpoints behind the same signed owner session. These endpoints can invoke APC, Numeria Studio, SNS Planner, Communication Planner, or Velvet and are now operator-only rather than public callable test surfaces.
- PR #15 leaves non-test server-to-server integration endpoints unchanged. `/release/status` reports `operationalTestAccess` as signed-owner-session/non-public, and the next Production smoke run requires an unauthenticated POST to the APC activity-test endpoint to return HTTP 401 before any upstream side effect can occur.
- No public cross-app Business endpoint was introduced. The prepared resolver is intentionally unused until the formal Business release decision changes the shared contract.

PR #10 through PR #15 passed `npm run typecheck`, `npm run test:contracts`, `npm run build`, and `npm run cf:build` before merge.

## Important deployment distinction

The repository state through `d775c18` is CI-verified but has not yet been deployed by a new Cloudflare Production workflow run.

Do not describe the APC endpoint cutover, expanded `/release/status` metadata, deployed-SHA verification, future Business integration guard, Professional Business-link cleanup, or operational integration test protection as Production-verified until the next intentional release-boundary `Cloudflare Production` run succeeds.

Continue batching safe release-readiness changes. Do not run Production for every small merge.

## Business and operator boundary remains unchanged

- Business remains `unavailable` for normal users.
- `business.cross_app.flow` remains default-off and the runtime flag is explicitly false.
- Free and Pro do not authorize Business integrations.
- Normal Professional App surfaces do not expose Business navigation while Business is unavailable.
- Direct internal owner-pilot Business URLs remain protected by signed owner-session middleware and are not public purchase/navigation entry points.
- Operational integration test endpoints that can create upstream test records require the signed owner session and are not public test APIs.
- Non-test integration endpoints retain their existing server-to-server contract and are not implicitly converted into owner-session APIs.
- The future cross-app resolver is separate from internal owner-pilot access and fails closed unless Business plan + Business available + feature flag enabled are all true.
- Growth Engine remains Source of Truth for Customer, Reservation, Payment, Sales, Public Site, and Business plan workflow.
- No Business purchase flow, refund UI, sales UI expansion, D1 schema change, or Numeria Pro / Velvet Pro feature mixing was introduced.

## Reconnect point

Before the final release-boundary Production run, re-read current Growth Engine main and the formal Plan contract. The manual Production workflow should be run once after the batch is intentionally ready, then its smoke checks should be treated as the runtime evidence for release status.

That Production run should also prove that an unauthenticated operational integration test request is rejected with HTTP 401 before an upstream call is made.

After that Production run, perform the deferred authenticated browser smoke for the Growth Engine → Numeria Studio handoff.

## Sensitive-data review

No secrets, owner access code, customer data, database credentials, API keys, or raw authentication material are included.

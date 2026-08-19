# PAT-production-readiness-needs-roundtrip

- id: PAT-production-readiness-needs-roundtrip
- type: pattern
- status: candidate
- confidence: 0.78
- observedCount: 1
- domains: deployment, persistence, integration-testing, production-readiness
- projectsObserved: Growth-Engine

## Pattern
A configured production dependency should not be marked ready from configuration presence alone. Readiness should combine configuration detection, reachability, and a real roundtrip that exercises the same repository path used by the product.

## Why
Serverless/mock fallbacks can make a request appear successful while data is not durable across requests, instances, browsers, or redeploys.

## Recommended verification
1. expose a non-secret readiness/status surface;
2. confirm the intended production driver is active;
3. execute create/read/list or equivalent roundtrip;
4. verify the real user flow across a new request boundary;
5. fail closed when protected verification lacks authentication.

## Evidence
- Growth Engine `docs/production-persistence.md`

## Promotion note
Keep as candidate until independently observed in additional repositories. Do not promote merely because the idea appears in multiple documents copied from the same source.
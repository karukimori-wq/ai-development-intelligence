# MEM-Velvet-ReleaseHardening-2026-09-16

- type: memory
- status: active
- project: karukimori-wq/Velvet
- domains: capture, privacy, plan-enforcement, integration-resilience, performance

## Reusable findings

1. **Capture persistence failures must preserve the user's draft in-page.** Redirecting an error after a failed create discards a controlled mobile input at exactly the moment the user most needs recovery. Prefer server-action state (`useActionState`) for validation/persistence errors, and redirect only after durable raw capture creation succeeds.

2. **Generated private text must not be transported in query strings.** Message drafts can contain customer-specific content and should remain in POST/server-action state rather than `URLSearchParams`, browser history, referrer-visible URLs, or routine request logs.

3. **An unavailable canonical source is not an empty canonical source.** Growth Engine customer reads need an explicit `ok | unconfigured | unavailable` result. Velvet may continue showing its own saved memory snapshots during an outage, but UI must not tell the user that customers were deleted or that the canonical list is empty.

4. **Free/Pro history limits must be enforced on API reads, not only pages.** Any direct history endpoint can otherwise bypass a UI-only rolling window. Capture history now applies the same plan history window server-side; dedicated gift-history reads are Pro-gated because event-specific history views are a Pro capability.

5. **Recent-customer shortcuts should aggregate in storage.** The mobile capture picker needs recent people, but loading every capture to derive recency is unnecessary in D1/Postgres. Use bounded `GROUP BY customer_id ORDER BY MAX(created_at)` queries and keep the all-captures fallback only for non-persistent/dev storage.

6. **Contract guards should cover the bypass surface.** Durable CI checks now include capture API history enforcement, gift-history Pro gating, message-draft URL privacy, recent-customer query efficiency, and capture draft recovery—not just UI labels.

## Current evidence

Velvet main `97d6c7767789aba7db7bf1a7a84058eabe759aa7` passed CI run 662 including contract guards, plan enforcement, query efficiency, TypeScript typecheck, and production build. This is CI evidence only; it is not production deployment verification.

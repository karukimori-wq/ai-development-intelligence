# MEM-Velvet-ReleaseHardening-2026-09-16

- type: memory
- status: active
- project: karukimori-wq/Velvet
- domains: capture, privacy, plan-enforcement, integration-resilience, performance

## Reusable findings

1. **Capture persistence failures must preserve the user's draft in-page.** Redirecting an error after a failed create discards a controlled mobile input at exactly the moment the user most needs recovery. Prefer server-action state (`useActionState`) for validation/persistence errors, and redirect only after durable raw capture creation succeeds.

2. **Generated private text must not be transported in query strings.** Message drafts can contain customer-specific content and should remain in POST/server-action state rather than `URLSearchParams`, browser history, referrer-visible URLs, or routine request logs.

3. **An unavailable canonical source is not an empty canonical source.** Growth Engine customer reads need an explicit `ok | unconfigured | unavailable` result. Velvet may continue showing its own saved memory snapshots during an outage, but UI must not tell the user that customers were deleted or that the canonical list is empty.

4. **Free/Pro history limits must be enforced on every direct read surface, not only list pages.** Capture history, dedicated gift history, completed visit detail APIs, completed visit pages, and capture-organize deep links can each become bypasses if only the primary timeline UI is gated. Apply the same rolling-window helper at the direct resource boundary.

5. **Recent-customer shortcuts should aggregate in storage.** The mobile capture picker needs recent people, but loading every capture to derive recency is unnecessary in D1/Postgres. Use bounded `GROUP BY customer_id ORDER BY MAX(created_at)` queries and keep the all-captures fallback only for non-persistent/dev storage.

6. **Contract guards should cover the bypass surface.** Durable CI checks now include capture API history enforcement, gift-history Pro gating, completed-visit API/page history enforcement, capture-organize page/action enforcement, message-draft URL privacy, recent-customer query efficiency, and capture draft recovery—not just UI labels.

7. **Editing/organizing endpoints need the same entitlement check as their page.** Protecting an organize page is insufficient if its server action can still accept an old resource ID. Re-check current identity, plan, ownership scope, and history eligibility immediately before mutation.

8. **Active work is not historical content.** A long-running active visit should remain operable even if its start timestamp crosses a Free history cutoff. Apply the rolling history lock to completed visits while keeping active visit completion/edit flows available.

9. **Frequent input suggestions must not scan full history.** Capture suggestions are on a high-frequency mobile path. Reuse bounded dictionary rows (use count + last-used time) and customer memory tags for ranking instead of loading every capture and recomputing usage on each render. Guard this in CI because it is easy to regress while improving suggestion quality.

10. **Dashboard metrics must separate total counts from preview limits.** A bounded list such as five due follow-ups or five visit-cycle alerts is appropriate for rendering, but its length is not the total metric. Count due follow-ups in storage and count the full computed alert set before slicing the preview.

11. **Free customer limits must fail closed when the canonical customer source is unavailable.** Velvet cannot safely decide whether a Free workspace is below the 30-customer cap if Growth Engine cannot return the canonical list. Preserve the entered name in page state, show an availability explanation, and do not create until the limit can be verified.

12. **Customer names must not be carried through failure URLs.** Registration errors should use server-action state rather than query-string recovery. This avoids placing customer-identifying text in browser history/referrers while also preserving the draft for retry.

## Current evidence

Velvet main `053117c0e8c7874b7cf5ab8ea5c58be1c76261c8` passed CI run 705 including contract guards, plan enforcement, query efficiency, privacy/cache checks, TypeScript typecheck, and production build. This is CI evidence only; it is not production deployment verification.

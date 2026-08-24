# MEM-Numeria-LatestDevelopmentStatus-2026-08-25

- type: memory
- status: active
- project: karukimori-wq/numeria-studio
- recordedAt: 2026-08-25T00:00:00+09:00
- domains: ui, report-composer, deployment, contracts, data-safety, cross-app-integration

## Retrieved knowledge used
- `memory/numeria-studio/contract-boundary.md`: Numeria Studio owns Session and Report, not Customer, Reservation, Payment, Sales, communication records, Velvet professional memory, or AI usage ledgers.
- `knowledge/rules/RULE-canonical-owner-reference-first.md`: use reference-first integration for canonical owner boundaries.
- `knowledge/failures/FAIL-static-host-asset-path-assumption.json`: static host assumptions have already caused Numeria deployment issues.

## Latest observed development status
- Public Sites URL remains `https://numeria-studio.illusionddt.chatgpt.site`.
- GitHub repository main latest observed commit is `421601b63725a2240e7ca387b45334ece603e5f8` (`Adopt autonomous development policy`).
- Report composer material UI work is present in repo history at `150e4c5a15a9439ee35cb187b20d52010c0c9160`.
- Vercel output directory mismatch was corrected at `1c80962ef66824dddad0d97191f4357ac6d864cc` by adding `vercel.json` with `outputDirectory: dist`.
- Current `vercel.json` on main keeps `buildCommand: npm run build` and `outputDirectory: dist`.

## Current implementation notes
- Report creation UX should keep calculation results and diagrams visible while drafting the Report.
- Cross-app payloads must stay reference-only: `workspaceId`, `userId`, `reservationId`, `customerId` as Growth Engine reference, `sessionId`, `reportId`, `reportRef`, `traceId`, `correlationId`.
- Report body, PDF body, customer master data, payment fields, sales amount, `paymentStatus`, `fullMeetingTranscript`, secrets, and prompt bodies must not be sent to other apps or stored in intelligence.
- If Growth Engine return links are used, only reference IDs should be appended.

## Deployment lesson recorded
A new reusable failure entry was added: `FAIL-vercel-static-output-directory-mismatch`, with evidence `EVID-numeria-vercel-output-directory-20260817`.

## Verification state
- GitHub config check: `vercel.json` currently exists with `outputDirectory: dist`.
- Deployment redeploy result was not verified in this capture because no Vercel deployment status tool was used in this step.

## Sensitive data review
No personal data, report bodies, full transcripts, payment data, API keys, credentials, tokens, or prompt bodies were recorded.

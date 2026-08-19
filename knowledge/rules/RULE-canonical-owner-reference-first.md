# RULE-canonical-owner-reference-first

- id: RULE-canonical-owner-reference-first
- type: rule
- status: active
- confidence: 0.95
- observedCount: 6
- domains: architecture, data-ownership, integrations, privacy
- projectsObserved: Growth-Engine, Numeria-Studio, Communication-Planner, Velvet, AI-Platform-Core, Platform-Admin

## Rule
When data has a canonical owner, other applications should integrate reference-first. They may keep explicitly permitted projections or historical snapshots, but must not silently create a competing source of truth.

## Current platform examples
- Customer / Reservation / Payment / Sales -> Growth Engine
- Session / Report -> Numeria Studio
- Conversation / Message / ConversationContext / ReplyDraft / SafetyCheck -> Communication Planner
- Professional memory and service-history domains -> Velvet
- AI Capability / Activity / Usage -> AI Platform Core
- Platform Admin -> operational snapshots only

## Agent behavior
Before adding a shared field or table to an application:
1. consult `professional-platform-contracts`;
2. identify the canonical owner;
3. prefer an ID/reference or minimum contracted projection;
4. do not copy sensitive bodies merely for convenience;
5. treat snapshots as historical/derived, never current canonical truth.

## Authority
`professional-platform-contracts` remains the authoritative contract. This rule is learned operational guidance and must yield to newer contracts.

## Evidence
- professional-platform-contracts `docs/contracts/data-ownership.md`
- Numeria Studio `docs/contract-alignment.md`
- Growth Engine `docs/production-persistence.md`
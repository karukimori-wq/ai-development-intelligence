# RULE-secrets-never-enter-intelligence

- id: RULE-secrets-never-enter-intelligence
- type: rule
- status: active
- confidence: 1.0
- observedCount: 3
- domains: security, memory, evidence

## Rule
Never store secret values in AI Development Intelligence.

Allowed:
- environment variable names;
- secret purpose;
- configuration location at a non-sensitive level;
- redacted verification outcome;
- evidence links that do not expose credentials.

Forbidden:
- API keys;
- access tokens;
- database connection strings;
- passwords;
- integration secret values;
- private signing keys;
- raw credentials copied from logs/screenshots.

## Agent behavior
If evidence contains a secret, summarize the lesson without copying the value. Prefer repository paths, commit references, endpoint names, error classes, and redacted outcomes.

## Evidence
- Growth Engine production persistence documentation explicitly prohibits exposing connection values.
- Platform data-ownership rules prohibit cross-app propagation of API keys/access tokens/Stripe secrets.
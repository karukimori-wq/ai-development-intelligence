# EVID-webhook-identity-precedence-20260815

Source: `karukimori-wq/Communication-Planner`
Commit: `79d667b97b4372d021a6387b053d8f366cec2232`

The generic webhook identity resolver previously evaluated provider `source` identity before the `sender` object. The fix reverses those fallbacks: explicit top-level identity remains preferred, then sender identity, then source identity.

Reusable lesson: when multiple webhook fields can look like a user identifier, define authority/precedence from provider semantics. Do not treat similarly named IDs as interchangeable.
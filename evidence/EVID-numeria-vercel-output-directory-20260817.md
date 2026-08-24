# EVID-numeria-vercel-output-directory-20260817

- type: evidence
- status: active
- observedAt: 2026-08-17T08:26:57Z
- recordedAt: 2026-08-25T00:00:00+09:00
- project: karukimori-wq/numeria-studio
- domains: deployment, static-hosting, vercel, build-output

## Observation
Vercel builds for Numeria Studio failed when the project expected an output directory named `public` while the build command produced `dist/`.

## Correction
`vercel.json` now sets `outputDirectory` to `dist` while keeping `buildCommand` as `npm run build`.

## Evidence references
- Numeria Studio commit: https://github.com/karukimori-wq/numeria-studio/commit/1c80962ef66824dddad0d97191f4357ac6d864cc
- Current config: https://github.com/karukimori-wq/numeria-studio/blob/main/vercel.json

## Sensitive data review
No secrets, customer data, report bodies, prompt bodies, payment data, or transcripts are included.

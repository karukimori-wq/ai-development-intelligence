# EVID-numeria-pages-relative-assets-20260713

Source: `karukimori-wq/numeria-studio`
Commit: `72a15f6b6d7667b66daf7440385cf4e00daac03e`

The static entry point uses `./src/styles.css` and `./src/main.js`, allowing assets to resolve relative to the deployed page path rather than assuming origin-root hosting.

Reusable lesson: static-site deployment targets with repository/path prefixes need asset-path behavior verified against the real deployment base path.
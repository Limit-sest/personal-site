# My own site
This repo contains source code for my website, which you can find at [**kucera.dev**](https://kucera.dev).

NOTE: the `main` branch is the development branch, while the contents displayed on the website come from the `prod` branch.

## Tech stack
- Astro for fast performance and markdown-based content. 
- Tailwind css

## Run locally
```bash
git clone https://github.com/Limit-sest/personal-site.git
cd personal-site
bun install
bun run dev
```
*I prefer using bun, but you can also use npm*

## Dependency update policy
- Dependabot updates are grouped to reduce lockfile conflicts, with Astro + `@astrojs/*` + Tailwind updates batched together.
- Major updates are reviewed separately from minor/patch updates.
- If multiple open Dependabot PRs depend on the same lockfile or peer-dependencies, close/recreate them as one combined PR (or merge in strict dependency order and rebase the rest).
- Auto-merge is enabled for low-risk Dependabot patch/minor PRs after CI passes.
- Prefer one combined dependency PR over stacked single-package PRs when updates are tightly coupled.

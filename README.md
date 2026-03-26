# Personal website

Static personal site built with [Astro](https://astro.build/) and TypeScript. Content includes blog, papers, projects, and bilingual (English / Chinese) UI.

**Live site:** [caoyumin97.github.io](https://caoyumin97.github.io)

## Requirements

- Node.js **>= 22.12.0** (see `package.json` `engines`)

## Local development

```bash
npm install
npm run dev
```

- **Build:** `npm run build` — output in `dist/`
- **Preview production build:** `npm run preview`

## Deployment

Deployments run automatically on push to the **`master`** branch via [GitHub Actions](.github/workflows/deploy.yml) to **GitHub Pages**.

1. Repo: `https://github.com/Caoyumin97/Caoyumin97.github.io`
2. **Settings > Pages:** set source to **GitHub Actions**
3. **Settings > Environments > github-pages:** allow deployment from **`master`** if you use branch protection rules

The canonical site URL is set in `astro.config.mjs` as `site: 'https://caoyumin97.github.io'`.

### Retiring the old `main` branch

If `main` still exists as the default branch, GitHub will not let you delete it until you switch defaults:

1. **Settings > General > Default branch** → choose **`master`**
2. Locally: `git push origin --delete main`

## Project layout

| Path | Purpose |
|------|---------|
| `src/pages/` | Routes |
| `src/layouts/` | Page shells |
| `src/components/` | UI components |
| `src/content/` | Markdown collections (blog, papers, projects) |
| `src/content.config.ts` | Collection schemas |
| `src/data/` | JSON such as `now.json` |
| `public/` | Static assets |

Contributor-oriented notes live in [AGENTS.md](AGENTS.md).

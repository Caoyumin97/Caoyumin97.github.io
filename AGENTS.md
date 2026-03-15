# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro + TypeScript personal website.
- `src/pages/` holds route-level `.astro` files (homepage at `src/pages/index.astro`).
- `src/layouts/` defines shared page shells; `src/components/` contains reusable UI pieces.
- `src/content/` stores Markdown collections for blog, papers, and projects; schemas live in `src/content.config.ts`.
- `src/data/` contains JSON data such as `src/data/now.json`.
- `src/styles/` contains global and animation CSS; `public/` holds static assets (favicons, images).
- `docs/superpowers/specs/` contains the design spec used to align visual updates.

## Build, Test, and Development Commands
- `npm install` installs dependencies (Node >=22.12.0 required per `package.json`).
- `npm run dev` starts the local dev server.
- `npm run build` generates the static site output in `dist/`.
- `npm run preview` serves the built output for a production-like check.

## Coding Style & Naming Conventions
- Use 2-space indentation in `.ts`, `.astro`, and `.css`; keep formatting consistent within each file.
- Prefer single quotes in TypeScript/JavaScript and keep Astro frontmatter at the top of files.
- Name content files with kebab-case (e.g., `sample-project.md`).
- Frontmatter must match `src/content.config.ts`; example:

```yaml
---
title: "Hello World"
date: 2026-03-13
excerpt: "Short summary for listings."
tags: ["meta"]
draft: false
---
```

- JSON keys in `src/data/now.json` use snake_case.

## Testing Guidelines
No automated tests are configured yet. For changes, run `npm run build` and smoke-test locally with `npm run dev` or `npm run preview`.

## Commit & Pull Request Guidelines
- Existing history uses short, imperative summaries (e.g., “Add design spec for personal website”); keep commits single-topic and concise.
- PRs should include a brief summary, link related issues (if any), and attach before/after screenshots for UI or content changes.

## Content & Data Updates
- Add blog posts under `src/content/blog/`, papers under `src/content/papers/`, and projects under `src/content/projects/`.
- Update the “now” section in `src/data/now.json` and place new static assets in `public/`.

# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Yumin Cao's personal website — a cosmic dark bento grid site on GitHub Pages showcasing papers, projects, blog, hobbies, and work experience.

**Architecture:** Astro static site with content collections (blog, papers, projects), vanilla CSS theming with custom properties, and minimal TypeScript for interactions (hover tilt, scroll reveal, easter eggs). Deployed via GitHub Actions to caoyumin97.github.io.

**Tech Stack:** Astro 5+, TypeScript, vanilla CSS, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-03-13-personal-website-design.md`

---

## Chunk 1: Project Scaffold & Core Layout

### Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`

- [ ] **Step 1: Scaffold Astro project**

Run from `/Users/yumincao/projects/personal-website`:

```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

- [ ] **Step 3: Configure Astro for GitHub Pages**

Edit `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://caoyumin97.github.io',
  output: 'static',
});
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts at localhost:4321, shows default Astro page.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/
git commit -m "feat: initialize Astro project for GitHub Pages"
```

---

### Task 2: Global Styles — Cosmic Dark Theme

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global CSS with theme custom properties**

```css
/* src/styles/global.css */
:root {
  /* Background */
  --bg-primary: #0f0f1a;
  --bg-secondary: #1a1a2e;
  --bg-card: rgba(26, 26, 46, 0.6);

  /* Text */
  --text-primary: #e8e6e3;
  --text-heading: #ffffff;
  --text-muted: #7c7c9a;

  /* Accent colors by section */
  --accent-papers: #a78bfa;
  --accent-papers-dim: #6366f1;
  --accent-projects: #6ee7b7;
  --accent-projects-dim: #10b981;
  --accent-blog: #fbbf24;
  --accent-blog-dim: #f59e0b;
  --accent-life: #fb7185;
  --accent-life-dim: #f43f5e;
  --accent-about: #7dd3fc;
  --accent-about-dim: #0ea5e9;

  /* Surfaces */
  --border-radius-card: 12px;
  --border-radius-inner: 8px;
  --card-border: rgba(255, 255, 255, 0.06);
  --card-glow: rgba(255, 255, 255, 0.03);

  /* Typography */
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;

  /* Spacing */
  --grid-gap: 16px;
  --page-padding: 24px;
  --max-width: 1200px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  background-attachment: fixed;
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--text-heading);
  line-height: 1.3;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

code {
  font-family: var(--font-mono);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--page-padding);
}
```

- [ ] **Step 2: Verify file created**

```bash
cat src/styles/global.css | head -5
```

Expected: Shows the `:root {` block.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add cosmic dark theme global styles"
```

---

### Task 3: Base Layout + NavBar + Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/NavBar.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create NavBar component**

```astro
---
// src/components/NavBar.astro
const currentPath = Astro.url.pathname;

const links = [
  { href: '/', label: 'Home' },
  { href: '/papers', label: 'Papers' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/life', label: 'Life' },
  { href: '/about', label: 'About' },
];
---

<nav class="navbar">
  <div class="navbar-inner container">
    <a href="/" class="navbar-logo">YC</a>
    <button class="navbar-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span class="hamburger"></span>
    </button>
    <ul class="navbar-links">
      {links.map(link => (
        <li>
          <a
            href={link.href}
            class:list={['nav-link', { active: currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href)) }]}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(15, 15, 26, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--card-border);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }

  .navbar-logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-heading);
    letter-spacing: -0.02em;
  }

  .navbar-links {
    display: flex;
    list-style: none;
    gap: 8px;
  }

  .nav-link {
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.875rem;
    color: var(--text-muted);
    transition: color 0.2s, background 0.2s;
  }

  .nav-link:hover {
    color: var(--text-heading);
    background: rgba(255, 255, 255, 0.05);
  }

  .nav-link.active {
    color: var(--text-heading);
    background: rgba(255, 255, 255, 0.08);
  }

  .navbar-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
  }

  .hamburger {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--text-primary);
    position: relative;
    transition: background 0.2s;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background: var(--text-primary);
    left: 0;
    transition: transform 0.3s;
  }

  .hamburger::before { top: -6px; }
  .hamburger::after { top: 6px; }

  @media (max-width: 768px) {
    .navbar-toggle {
      display: block;
    }

    .navbar-links {
      display: none;
      position: absolute;
      top: 60px;
      right: 0;
      background: rgba(15, 15, 26, 0.95);
      backdrop-filter: blur(12px);
      flex-direction: column;
      padding: 16px;
      border-radius: 0 0 12px 12px;
      border: 1px solid var(--card-border);
      border-top: none;
    }

    .navbar-links.open {
      display: flex;
    }
  }
</style>

<script>
  document.addEventListener('astro:page-load', () => {
    const toggle = document.querySelector('.navbar-toggle');
    const links = document.querySelector('.navbar-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        links.classList.toggle('open');
      });
    }
  });
</script>
```

- [ ] **Step 2: Create Footer component**

```astro
---
// src/components/Footer.astro
const year = new Date().getFullYear();
---

<footer class="footer">
  <div class="footer-inner container">
    <p class="footer-copy">&copy; {year} Yumin Cao</p>
    <div class="footer-links">
      <a href="https://github.com/Caoyumin97" target="_blank" rel="noopener">GitHub</a>
      <span class="footer-sep">&middot;</span>
      <a href="https://scholar.google.com/" target="_blank" rel="noopener">Scholar</a>
      <span class="footer-sep">&middot;</span>
      <a href="mailto:yumin@example.com">Email</a>
    </div>
    <p class="footer-credit">Built with <a href="https://astro.build" target="_blank" rel="noopener">Astro</a></p>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--card-border);
    padding: 32px 0;
    margin-top: 64px;
    text-align: center;
  }

  .footer-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .footer-copy {
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .footer-links {
    display: flex;
    gap: 8px;
    font-size: 0.8125rem;
  }

  .footer-links a {
    color: var(--text-muted);
    transition: color 0.2s;
  }

  .footer-links a:hover {
    color: var(--text-heading);
  }

  .footer-sep {
    color: var(--text-muted);
    opacity: 0.4;
  }

  .footer-credit {
    font-size: 0.75rem;
    color: var(--text-muted);
    opacity: 0.6;
  }

  .footer-credit a {
    color: var(--text-muted);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
</style>
```

- [ ] **Step 3: Create BaseLayout**

```astro
---
// src/layouts/BaseLayout.astro
import { ClientRouter } from 'astro:transitions';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Personal website of Yumin Cao — researcher, builder, explorer.' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={Astro.url.href} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
    <ClientRouter />
  </head>
  <body>
    <NavBar />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Create a PageLayout that wraps BaseLayout with a container + page title**

```astro
---
// src/layouts/PageLayout.astro
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description?: string;
  pageTitle?: string;
}

const { title, description, pageTitle } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <div class="container page">
    {pageTitle && <h1 class="page-title">{pageTitle}</h1>}
    <slot />
  </div>
</BaseLayout>

<style>
  .page {
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 32px;
  }
</style>
```

- [ ] **Step 5: Update `src/pages/index.astro` to use BaseLayout**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Yumin Cao">
  <div class="container" style="padding: 48px 0; text-align: center;">
    <h1>Coming soon</h1>
    <p>Bento grid homepage goes here.</p>
  </div>
</BaseLayout>
```

- [ ] **Step 6: Verify dev server shows layout with navbar and footer**

```bash
npm run dev
```

Open http://localhost:4321 — should show dark theme, sticky nav, placeholder content, footer.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/ src/components/NavBar.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add BaseLayout, PageLayout, NavBar, and Footer"
```

---

### Task 4: Animation Styles

**Files:**
- Create: `src/styles/animations.css`

- [ ] **Step 1: Create animation CSS**

```css
/* src/styles/animations.css */

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered entrance for card grids */
.stagger > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.stagger.visible > *:nth-child(1) { transition-delay: 0ms; }
.stagger.visible > *:nth-child(2) { transition-delay: 80ms; }
.stagger.visible > *:nth-child(3) { transition-delay: 160ms; }
.stagger.visible > *:nth-child(4) { transition-delay: 240ms; }
.stagger.visible > *:nth-child(5) { transition-delay: 320ms; }
.stagger.visible > *:nth-child(6) { transition-delay: 400ms; }
.stagger.visible > *:nth-child(7) { transition-delay: 480ms; }
.stagger.visible > *:nth-child(8) { transition-delay: 560ms; }

.stagger.visible > * {
  opacity: 1;
  transform: translateY(0);
}

/* Link underline animation */
.link-fancy {
  position: relative;
}

.link-fancy::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: currentColor;
  transition: width 0.3s ease;
}

.link-fancy:hover::after {
  width: 100%;
}

/* Card glow on hover */
.card-glow {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.card-glow:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.03);
}
```

- [ ] **Step 2: Import animations.css in BaseLayout**

Add to `src/layouts/BaseLayout.astro` frontmatter:

```typescript
import '../styles/animations.css';
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/animations.css src/layouts/BaseLayout.astro
git commit -m "feat: add animation styles for scroll reveal and hover effects"
```

---

## Chunk 2: Content Collections & Data

### Task 5: Content Collection Schemas

**Files:**
- Create: `src/content.config.ts`

Note: In Astro 5+, the content config file is `src/content.config.ts` (not `src/content/config.ts`). Collections use `loader: glob(...)` from `astro/loaders`.

- [ ] **Step 1: Create content collection config**

```typescript
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    abstract: z.string().optional(),
    links: z.object({
      pdf: z.string().optional(),
      arxiv: z.string().optional(),
      code: z.string().optional(),
      slides: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, papers, projects };
```

- [ ] **Step 2: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: define content collection schemas for blog, papers, projects"
```

---

### Task 6: Sample Content & Data Files

**Files:**
- Create: `src/content/blog/hello-world.md`
- Create: `src/content/papers/sample-paper.md`
- Create: `src/content/projects/sample-project.md`
- Create: `src/data/now.json`
- Create: `src/data/life.json`
- Create: `src/data/photos.json`

- [ ] **Step 1: Create sample blog post**

```markdown
---
title: "Hello World"
date: 2026-03-13
excerpt: "My first blog post — setting up this site and what's coming next."
tags: ["meta", "web"]
draft: false
---

Welcome to my corner of the internet. This is where I'll share thoughts on research, building things, and whatever else catches my attention.

More coming soon.
```

- [ ] **Step 2: Create sample paper entry**

```markdown
---
title: "A Sample Research Paper"
authors: ["Yumin Cao", "Collaborator A", "Collaborator B"]
venue: "NeurIPS 2025"
year: 2025
abstract: "This is a placeholder paper entry demonstrating the content format. Replace with your actual publications."
links:
  arxiv: "https://arxiv.org/abs/0000.00000"
  code: "https://github.com/Caoyumin97/sample"
featured: true
---
```

- [ ] **Step 3: Create sample project entry**

```markdown
---
title: "cool-tool"
description: "A developer tool that does something useful and interesting."
tech: ["TypeScript", "Rust"]
github: "https://github.com/Caoyumin97/cool-tool"
featured: true
---

A longer description of the project goes here. Explain what it does, why you built it, and any interesting technical details.
```

- [ ] **Step 4: Create data files**

`src/data/now.json`:
```json
{
  "working_on": "building this website",
  "reading": "Designing Data-Intensive Applications",
  "listening": "Radiohead - OK Computer",
  "location": "somewhere nice"
}
```

`src/data/life.json`:
```json
{
  "music": [
    { "title": "OK Computer", "artist": "Radiohead", "type": "album" }
  ],
  "outdoors": [
    { "title": "Mountain Trail", "description": "A weekend hike through the hills.", "date": "2026-02-15" }
  ]
}
```

`src/data/photos.json`:
```json
{
  "featured": "sample.jpg",
  "gallery": [
    { "src": "sample.jpg", "alt": "A sample photo", "date": "2026-03-01" }
  ]
}
```

- [ ] **Step 5: Create photos directory**

```bash
mkdir -p public/photos
```

Note: No placeholder photo is needed — the Life page shows "Photos coming soon" when the gallery is empty. Update `src/data/photos.json` to have an empty gallery:

```json
{
  "featured": null,
  "gallery": []
}
```

Replace with real photos later by adding images to `public/photos/` and updating `photos.json`.

- [ ] **Step 6: Verify build succeeds with content collections**

```bash
npm run build
```

Expected: Build succeeds without errors.

- [ ] **Step 7: Commit**

```bash
git add src/content/ src/data/ public/photos/
git commit -m "feat: add sample content and data files"
```

---

## Chunk 3: Homepage — Bento Grid

### Task 7: BentoTile Component

**Files:**
- Create: `src/components/BentoTile.astro`

- [ ] **Step 1: Create BentoTile component**

```astro
---
// src/components/BentoTile.astro
interface Props {
  href?: string;
  area: string;
  accent?: string;
  class?: string;
}

const { href, area, accent, class: className } = Astro.props;
const Tag = href ? 'a' : 'div';
---

<Tag
  href={href}
  class:list={['bento-tile', 'card-glow', className]}
  style={`grid-area: ${area};${accent ? ` --tile-accent: ${accent};` : ''}`}
  data-tilt
>
  <slot />
</Tag>

<style>
  .bento-tile {
    background: var(--bg-card);
    border: 1px solid var(--card-border);
    border-radius: var(--border-radius-card);
    padding: 24px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }

  a.bento-tile {
    text-decoration: none;
    color: inherit;
  }

  .bento-tile:hover {
    border-color: color-mix(in srgb, var(--tile-accent, white) 20%, transparent);
    box-shadow: 0 0 30px color-mix(in srgb, var(--tile-accent, white) 5%, transparent);
  }

  .bento-tile .tile-label {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--tile-accent, var(--text-muted));
    margin-bottom: 12px;
  }

  .bento-tile .tile-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-heading);
    line-height: 1.4;
  }

  .bento-tile .tile-desc {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-top: 8px;
    line-height: 1.5;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BentoTile.astro
git commit -m "feat: add BentoTile component"
```

---

### Task 8: BentoGrid + Homepage

**Files:**
- Create: `src/components/BentoGrid.astro`
- Create: `src/components/NowPlaying.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create NowPlaying component for hero tile**

```astro
---
// src/components/NowPlaying.astro
import nowData from '../data/now.json';
---

<div class="now-playing">
  {nowData.working_on && (
    <p class="now-item">
      <span class="now-label">Working on</span>
      <span class="now-value">{nowData.working_on}</span>
    </p>
  )}
  {nowData.reading && (
    <p class="now-item">
      <span class="now-label">Reading</span>
      <span class="now-value">{nowData.reading}</span>
    </p>
  )}
  {nowData.listening && (
    <p class="now-item">
      <span class="now-label">Listening to</span>
      <span class="now-value">{nowData.listening}</span>
    </p>
  )}
</div>

<style>
  .now-playing {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: auto;
    padding-top: 16px;
  }

  .now-item {
    font-size: 0.8125rem;
    display: flex;
    gap: 8px;
    align-items: baseline;
  }

  .now-label {
    color: var(--text-muted);
    font-size: 0.6875rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .now-value {
    color: var(--text-primary);
  }
</style>
```

- [ ] **Step 2: Create BentoGrid component**

```astro
---
// src/components/BentoGrid.astro
import BentoTile from './BentoTile.astro';
import NowPlaying from './NowPlaying.astro';
import { getCollection } from 'astro:content';

// Fetch latest content
const allPapers = (await getCollection('papers')).sort((a, b) => b.data.year - a.data.year);
const allProjects = await getCollection('projects');
const allPosts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const latestPaper = allPapers[0];
const featuredProject = allProjects.find(p => p.data.featured) || allProjects[0];
const latestPost = allPosts[0];
---

<section class="bento-grid stagger">
  <!-- Hero -->
  <BentoTile area="hero" class="hero-tile">
    <div class="hero-content">
      <h1 class="hero-name">Yumin Cao</h1>
      <p class="hero-tagline" id="hero-tagline">researcher / builder / explorer</p>
      <div class="hero-social">
        <a href="https://github.com/Caoyumin97" target="_blank" rel="noopener" aria-label="GitHub">GH</a>
        <a href="https://scholar.google.com/" target="_blank" rel="noopener" aria-label="Google Scholar">Scholar</a>
      </div>
      <NowPlaying />
    </div>
  </BentoTile>

  <!-- Papers -->
  <BentoTile href="/papers" area="papers" accent="var(--accent-papers)">
    <span class="tile-label">Papers</span>
    {latestPaper ? (
      <>
        <span class="tile-title">{latestPaper.data.title}</span>
        <span class="tile-desc">{latestPaper.data.venue} {latestPaper.data.year}</span>
      </>
    ) : (
      <span class="tile-desc">Coming soon</span>
    )}
  </BentoTile>

  <!-- Projects -->
  <BentoTile href="/projects" area="projects" accent="var(--accent-projects)">
    <span class="tile-label">Projects</span>
    {featuredProject ? (
      <>
        <span class="tile-title">{featuredProject.data.title}</span>
        <span class="tile-desc">{featuredProject.data.description}</span>
      </>
    ) : (
      <span class="tile-desc">Coming soon</span>
    )}
  </BentoTile>

  <!-- Blog -->
  <BentoTile href="/blog" area="blog" accent="var(--accent-blog)">
    <span class="tile-label">Blog</span>
    {latestPost ? (
      <>
        <span class="tile-title">{latestPost.data.title}</span>
        <span class="tile-desc">{latestPost.data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </>
    ) : (
      <span class="tile-desc">Coming soon</span>
    )}
  </BentoTile>

  <!-- Photo -->
  <BentoTile area="photo" class="photo-tile">
    <span class="tile-label">Photo</span>
    <div class="photo-placeholder">
      <span class="tile-desc">Featured photo goes here</span>
    </div>
  </BentoTile>

  <!-- Music/Art -->
  <BentoTile href="/life" area="music" accent="var(--accent-life)">
    <span class="tile-label">Music / Art</span>
    <span class="tile-desc">What I'm into lately</span>
  </BentoTile>

  <!-- Outdoors -->
  <BentoTile href="/life" area="outdoors" accent="var(--accent-life)">
    <span class="tile-label">Outdoors</span>
    <span class="tile-desc">Recent adventures</span>
  </BentoTile>

  <!-- About -->
  <BentoTile href="/about" area="about" accent="var(--accent-about)">
    <span class="tile-label">About</span>
    <span class="tile-title">More about me</span>
  </BentoTile>
</section>

<style>
  .bento-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "hero    papers   projects"
      "blog    photo    photo"
      "music   outdoors about";
    gap: var(--grid-gap);
    padding: 32px 0;
  }

  .hero-tile {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(15, 15, 26, 0.6) 50%, rgba(110, 231, 183, 0.05) 100%);
    background-size: 200% 200%;
    animation: hero-gradient 8s ease infinite;
  }

  @keyframes hero-gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .hero-name {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .hero-tagline {
    color: var(--text-muted);
    font-size: 1rem;
    margin-bottom: 16px;
  }

  .hero-social {
    display: flex;
    gap: 12px;
  }

  .hero-social a {
    color: var(--text-muted);
    font-size: 0.8125rem;
    font-family: var(--font-mono);
    transition: color 0.2s;
  }

  .hero-social a:hover {
    color: var(--text-heading);
  }

  .photo-tile {
    min-height: 180px;
  }

  .photo-placeholder {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-inner);
    background: rgba(255, 255, 255, 0.02);
    margin-top: 8px;
  }

  .hero-tagline {
    transition: opacity 0.4s ease;
  }

  /* Tablet */
  @media (max-width: 1024px) {
    .bento-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "hero     hero"
        "papers   projects"
        "blog     photo"
        "music    outdoors"
        "about    about";
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .bento-grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        "hero"
        "papers"
        "projects"
        "blog"
        "photo"
        "music"
        "outdoors"
        "about";
    }

    .hero-name {
      font-size: 2rem;
    }
  }
</style>
```

Add a `<script>` block at the bottom of `BentoGrid.astro` for rotating taglines:

```html
<script>
  document.addEventListener('astro:page-load', () => {
    const taglines = [
      'researcher / builder / explorer',
      'curious about everything',
      'turning ideas into code',
      'somewhere between academia and startups',
    ];
    let index = 0;
    const el = document.getElementById('hero-tagline');
    if (!el) return;

    setInterval(() => {
      el.style.opacity = '0';
      setTimeout(() => {
        index = (index + 1) % taglines.length;
        el.textContent = taglines[index];
        el.style.opacity = '1';
      }, 400);
    }, 4000);
  });
</script>
```

- [ ] **Step 3: Update homepage to use BentoGrid**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import BentoGrid from '../components/BentoGrid.astro';
---

<BaseLayout title="Yumin Cao">
  <div class="container">
    <BentoGrid />
  </div>
</BaseLayout>
```

- [ ] **Step 4: Verify homepage renders in dev**

```bash
npm run dev
```

Open http://localhost:4321 — should show bento grid with cosmic dark theme, populated with sample content.

- [ ] **Step 5: Commit**

```bash
git add src/components/BentoGrid.astro src/components/NowPlaying.astro src/pages/index.astro
git commit -m "feat: build homepage bento grid with content integration"
```

---

## Chunk 4: Subpages — Papers, Projects, Blog

### Task 9: Papers Page

**Files:**
- Create: `src/components/PaperCard.astro`
- Create: `src/pages/papers.astro`

- [ ] **Step 1: Create PaperCard component**

```astro
---
// src/components/PaperCard.astro
interface Props {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract?: string;
  links?: {
    pdf?: string;
    arxiv?: string;
    code?: string;
    slides?: string;
  };
}

const { title, authors, venue, year, abstract, links } = Astro.props;
---

<article class="paper-card reveal">
  <div class="paper-venue">
    <span class="venue-badge">{venue}</span>
    <span class="venue-year">{year}</span>
  </div>
  <h3 class="paper-title">{title}</h3>
  <p class="paper-authors">
    {authors.map((author, i) => (
      <>
        <span class:list={{ 'author-self': author === 'Yumin Cao' }}>{author}</span>
        {i < authors.length - 1 && ', '}
      </>
    ))}
  </p>
  {abstract && (
    <details class="paper-abstract">
      <summary>Abstract</summary>
      <p>{abstract}</p>
    </details>
  )}
  {links && (
    <div class="paper-links">
      {links.pdf && <a href={links.pdf} target="_blank" rel="noopener" class="paper-link">PDF</a>}
      {links.arxiv && <a href={links.arxiv} target="_blank" rel="noopener" class="paper-link">arXiv</a>}
      {links.code && <a href={links.code} target="_blank" rel="noopener" class="paper-link">Code</a>}
      {links.slides && <a href={links.slides} target="_blank" rel="noopener" class="paper-link">Slides</a>}
    </div>
  )}
</article>

<style>
  .paper-card {
    background: var(--bg-card);
    border: 1px solid var(--card-border);
    border-radius: var(--border-radius-card);
    padding: 24px;
    transition: border-color 0.3s;
  }

  .paper-card:hover {
    border-color: rgba(167, 139, 250, 0.2);
  }

  .paper-venue {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .venue-badge {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-papers);
    background: rgba(167, 139, 250, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .venue-year {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .paper-title {
    font-size: 1.125rem;
    margin-bottom: 6px;
  }

  .paper-authors {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  .author-self {
    color: var(--accent-papers);
    font-weight: 600;
  }

  .paper-abstract {
    margin-bottom: 12px;
    font-size: 0.875rem;
  }

  .paper-abstract summary {
    cursor: pointer;
    color: var(--text-muted);
    font-size: 0.8125rem;
    margin-bottom: 6px;
  }

  .paper-abstract p {
    color: var(--text-muted);
    line-height: 1.6;
  }

  .paper-links {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .paper-link {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-papers);
    border: 1px solid rgba(167, 139, 250, 0.2);
    padding: 4px 10px;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .paper-link:hover {
    background: rgba(167, 139, 250, 0.1);
  }
</style>
```

- [ ] **Step 2: Create papers page**

```astro
---
// src/pages/papers.astro
import PageLayout from '../layouts/PageLayout.astro';
import PaperCard from '../components/PaperCard.astro';
import { getCollection } from 'astro:content';

const papers = (await getCollection('papers')).sort((a, b) => b.data.year - a.data.year);
---

<PageLayout title="Papers — Yumin Cao" pageTitle="Papers">
  <div class="papers-list stagger">
    {papers.map(paper => (
      <PaperCard
        title={paper.data.title}
        authors={paper.data.authors}
        venue={paper.data.venue}
        year={paper.data.year}
        abstract={paper.data.abstract}
        links={paper.data.links}
      />
    ))}
  </div>
</PageLayout>

<style>
  .papers-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
```

- [ ] **Step 3: Verify papers page at /papers**

```bash
npm run dev
```

Open http://localhost:4321/papers — should show sample paper with purple accents.

- [ ] **Step 4: Commit**

```bash
git add src/components/PaperCard.astro src/pages/papers.astro
git commit -m "feat: add papers listing page"
```

---

### Task 10: Projects Page

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/pages/projects.astro`

- [ ] **Step 1: Create ProjectCard component**

```astro
---
// src/components/ProjectCard.astro
interface Props {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

const { title, description, tech, github, demo } = Astro.props;
---

<article class="project-card card-glow" data-tilt>
  <h3 class="project-title">{title}</h3>
  <p class="project-desc">{description}</p>
  <div class="project-tech">
    {tech.map(t => (
      <span class="tech-tag">{t}</span>
    ))}
  </div>
  <div class="project-links">
    {github && <a href={github} target="_blank" rel="noopener" class="project-link">GitHub</a>}
    {demo && <a href={demo} target="_blank" rel="noopener" class="project-link">Demo</a>}
  </div>
</article>

<style>
  .project-card {
    background: var(--bg-card);
    border: 1px solid var(--card-border);
    border-radius: var(--border-radius-card);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .project-card:hover {
    border-color: rgba(110, 231, 183, 0.2);
    box-shadow: 0 0 30px rgba(110, 231, 183, 0.05);
  }

  .project-title {
    font-size: 1.25rem;
  }

  .project-desc {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .project-tech {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .tech-tag {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--accent-projects);
    background: rgba(110, 231, 183, 0.08);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .project-links {
    display: flex;
    gap: 8px;
    margin-top: auto;
  }

  .project-link {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-projects);
    border: 1px solid rgba(110, 231, 183, 0.2);
    padding: 4px 10px;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .project-link:hover {
    background: rgba(110, 231, 183, 0.1);
  }
</style>
```

- [ ] **Step 2: Create projects page**

```astro
---
// src/pages/projects.astro
import PageLayout from '../layouts/PageLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
---

<PageLayout title="Projects — Yumin Cao" pageTitle="Projects">
  <div class="projects-grid stagger">
    {projects.map(project => (
      <ProjectCard
        title={project.data.title}
        description={project.data.description}
        tech={project.data.tech}
        github={project.data.github}
        demo={project.data.demo}
      />
    ))}
  </div>
</PageLayout>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
  }
</style>
```

- [ ] **Step 3: Verify projects page at /projects**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.astro src/pages/projects.astro
git commit -m "feat: add projects grid page"
```

---

### Task 11: Blog — Listing + Post Pages

**Files:**
- Create: `src/layouts/PostLayout.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Create PostLayout**

```astro
---
// src/layouts/PostLayout.astro
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  date: Date;
  tags: string[];
}

const { title, date, tags } = Astro.props;
const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
---

<BaseLayout title={`${title} — Yumin Cao`}>
  <article class="container post">
    <header class="post-header">
      <time class="post-date" datetime={date.toISOString()}>{formattedDate}</time>
      <h1 class="post-title">{title}</h1>
      {tags.length > 0 && (
        <div class="post-tags">
          {tags.map(tag => (
            <span class="post-tag">{tag}</span>
          ))}
        </div>
      )}
    </header>
    <div class="post-content">
      <slot />
    </div>
  </article>
</BaseLayout>

<style>
  .post {
    padding-top: 48px;
    padding-bottom: 48px;
    max-width: 720px;
  }

  .post-header {
    margin-bottom: 40px;
  }

  .post-date {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent-blog);
  }

  .post-title {
    font-size: 2.25rem;
    margin-top: 8px;
    margin-bottom: 12px;
  }

  .post-tags {
    display: flex;
    gap: 6px;
  }

  .post-tag {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--accent-blog);
    background: rgba(251, 191, 36, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .post-content {
    font-size: 1.0625rem;
    line-height: 1.8;
  }

  .post-content :global(h2) {
    font-size: 1.5rem;
    margin-top: 40px;
    margin-bottom: 16px;
  }

  .post-content :global(h3) {
    font-size: 1.25rem;
    margin-top: 32px;
    margin-bottom: 12px;
  }

  .post-content :global(p) {
    margin-bottom: 16px;
  }

  .post-content :global(pre) {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--card-border);
    border-radius: var(--border-radius-inner);
    padding: 16px;
    overflow-x: auto;
    margin-bottom: 16px;
  }

  .post-content :global(code) {
    font-size: 0.875rem;
  }

  .post-content :global(a) {
    color: var(--accent-blog);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .post-content :global(blockquote) {
    border-left: 3px solid var(--accent-blog);
    padding-left: 16px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }
</style>
```

- [ ] **Step 2: Create blog listing page**

```astro
---
// src/pages/blog/index.astro
import PageLayout from '../../layouts/PageLayout.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<PageLayout title="Blog — Yumin Cao" pageTitle="Blog">
  <div class="posts-list stagger">
    {posts.map(post => (
      <a href={`/blog/${post.id}`} class="post-preview reveal">
        <time class="preview-date">{post.data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
        <h3 class="preview-title">{post.data.title}</h3>
        <p class="preview-excerpt">{post.data.excerpt}</p>
        {post.data.tags.length > 0 && (
          <div class="preview-tags">
            {post.data.tags.map(tag => (
              <span class="preview-tag">{tag}</span>
            ))}
          </div>
        )}
      </a>
    ))}
  </div>
</PageLayout>

<style>
  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .post-preview {
    display: block;
    background: var(--bg-card);
    border: 1px solid var(--card-border);
    border-radius: var(--border-radius-card);
    padding: 24px;
    transition: border-color 0.3s;
  }

  .post-preview:hover {
    border-color: rgba(251, 191, 36, 0.2);
  }

  .preview-date {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-blog);
  }

  .preview-title {
    font-size: 1.25rem;
    margin-top: 4px;
    margin-bottom: 6px;
  }

  .preview-excerpt {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .preview-tags {
    display: flex;
    gap: 6px;
    margin-top: 10px;
  }

  .preview-tag {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.05);
    padding: 2px 6px;
    border-radius: 3px;
  }
</style>
```

- [ ] **Step 3: Create dynamic blog post route**

```astro
---
// src/pages/blog/[...slug].astro
import PostLayout from '../../layouts/PostLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<PostLayout title={post.data.title} date={post.data.date} tags={post.data.tags}>
  <Content />
</PostLayout>
```

- [ ] **Step 4: Verify blog pages work**

```bash
npm run dev
```

Check http://localhost:4321/blog — should list the sample post.
Click into it — should render the full post with PostLayout.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/PostLayout.astro src/pages/blog/
git commit -m "feat: add blog listing and individual post pages"
```

---

## Chunk 5: Life, About, 404 Pages

### Task 12: Life Page

**Files:**
- Create: `src/pages/life.astro`

- [ ] **Step 1: Create life page**

```astro
---
// src/pages/life.astro
import PageLayout from '../layouts/PageLayout.astro';
import lifeData from '../data/life.json';
import photosData from '../data/photos.json';
---

<PageLayout title="Life — Yumin Cao" pageTitle="Life">
  <!-- Photography -->
  <section class="life-section reveal">
    <h2 class="section-heading">Photography</h2>
    <div class="photo-grid">
      {photosData.gallery.map(photo => (
        <div class="photo-item">
          <img src={`/photos/${photo.src}`} alt={photo.alt} loading="lazy" />
        </div>
      ))}
    </div>
    {photosData.gallery.length === 0 && <p class="empty-note">Photos coming soon.</p>}
  </section>

  <!-- Music / Art -->
  <section class="life-section reveal">
    <h2 class="section-heading">Music / Art</h2>
    <div class="music-grid">
      {lifeData.music.map(item => (
        <div class="music-card">
          <span class="music-type">{item.type}</span>
          <h3 class="music-title">{item.title}</h3>
          <p class="music-artist">{item.artist}</p>
        </div>
      ))}
    </div>
  </section>

  <!-- Outdoors -->
  <section class="life-section reveal">
    <h2 class="section-heading">Outdoors</h2>
    <div class="outdoors-list">
      {lifeData.outdoors.map(item => (
        <div class="outdoors-card">
          <h3 class="outdoors-title">{item.title}</h3>
          <p class="outdoors-desc">{item.description}</p>
          <time class="outdoors-date">{item.date}</time>
        </div>
      ))}
    </div>
  </section>
</PageLayout>

<style>
  .life-section {
    margin-bottom: 56px;
  }

  .section-heading {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: var(--accent-life);
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 12px;
  }

  .photo-item {
    border-radius: var(--border-radius-inner);
    overflow: hidden;
    aspect-ratio: 4/3;
    background: var(--bg-card);
  }

  .photo-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .music-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }

  .music-card {
    background: var(--bg-card);
    border: 1px solid var(--card-border);
    border-radius: var(--border-radius-card);
    padding: 20px;
  }

  .music-type {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-life);
  }

  .music-title {
    font-size: 1rem;
    margin-top: 4px;
  }

  .music-artist {
    font-size: 0.8125rem;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .outdoors-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .outdoors-card {
    background: var(--bg-card);
    border: 1px solid var(--card-border);
    border-radius: var(--border-radius-card);
    padding: 20px;
  }

  .outdoors-title {
    font-size: 1.125rem;
    margin-bottom: 4px;
  }

  .outdoors-desc {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .outdoors-date {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--text-muted);
    margin-top: 8px;
    display: block;
  }

  .empty-note {
    color: var(--text-muted);
    font-style: italic;
  }
</style>
```

Note: Click-to-enlarge lightbox for photos is deferred to a follow-up task. The grid displays photos inline for now.

- [ ] **Step 2: Commit**

```bash
git add src/pages/life.astro
git commit -m "feat: add life page with photography, music, outdoors sections"
```

---

### Task 13: About Page with Timeline

**Files:**
- Create: `src/components/Timeline.astro`
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create Timeline component**

```astro
---
// src/components/Timeline.astro
interface TimelineEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Props {
  entries: TimelineEntry[];
}

const { entries } = Astro.props;
---

<div class="timeline">
  {entries.map(entry => (
    <div class="timeline-entry reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3 class="timeline-role">{entry.role}</h3>
        <p class="timeline-company">{entry.company}</p>
        <time class="timeline-period">{entry.period}</time>
        <p class="timeline-desc">{entry.description}</p>
      </div>
    </div>
  ))}
</div>

<style>
  .timeline {
    position: relative;
    padding-left: 32px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: var(--card-border);
  }

  .timeline-entry {
    position: relative;
    margin-bottom: 32px;
  }

  .timeline-entry:last-child {
    margin-bottom: 0;
  }

  .timeline-dot {
    position: absolute;
    left: -28px;
    top: 6px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--accent-about);
    border: 2px solid var(--bg-primary);
  }

  .timeline-role {
    font-size: 1.125rem;
    margin-bottom: 2px;
  }

  .timeline-company {
    font-size: 0.9375rem;
    color: var(--accent-about);
  }

  .timeline-period {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    display: block;
    margin-top: 4px;
    margin-bottom: 8px;
  }

  .timeline-desc {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 2: Create about page**

```astro
---
// src/pages/about.astro
import PageLayout from '../layouts/PageLayout.astro';
import Timeline from '../components/Timeline.astro';

const experience = [
  {
    role: 'Your Role',
    company: 'Company Name',
    period: '2024 — Present',
    description: 'Description of what you do here.',
  },
];
---

<PageLayout title="About — Yumin Cao" pageTitle="About">
  <section class="about-bio reveal">
    <p>
      Hi, I'm Yumin. I'm a researcher and builder with interests spanning across
      machine learning, software engineering, photography, music, and the outdoors.
    </p>
    <p>
      This site is my little corner of the internet where I share what I'm working on
      and thinking about. Feel free to look around and reach out.
    </p>
  </section>

  <section class="about-section">
    <h2 class="about-heading">Experience</h2>
    <Timeline entries={experience} />
  </section>

  <section class="about-section reveal">
    <h2 class="about-heading">Education</h2>
    <div class="education-list">
      <div class="edu-entry">
        <h3 class="edu-degree">Your Degree</h3>
        <p class="edu-school">University Name</p>
        <time class="edu-period">20XX — 20XX</time>
      </div>
    </div>
  </section>

  <section class="about-section reveal">
    <h2 class="about-heading">Skills & Interests</h2>
    <div class="skills-grid">
      <span class="skill-tag">Machine Learning</span>
      <span class="skill-tag">TypeScript</span>
      <span class="skill-tag">Python</span>
      <span class="skill-tag">Systems Design</span>
    </div>
  </section>

  <section class="about-section reveal">
    <h2 class="about-heading">Get in Touch</h2>
    <p class="about-contact">
      Email me at <a href="mailto:yumin@example.com" class="link-fancy">yumin@example.com</a> or find me on
      <a href="https://github.com/Caoyumin97" target="_blank" rel="noopener" class="link-fancy">GitHub</a>.
    </p>
  </section>
</PageLayout>

<style>
  .about-bio {
    font-size: 1.125rem;
    line-height: 1.8;
    max-width: 640px;
    margin-bottom: 48px;
  }

  .about-bio p {
    margin-bottom: 16px;
  }

  .about-section {
    margin-bottom: 48px;
  }

  .about-heading {
    font-size: 1.5rem;
    margin-bottom: 24px;
    color: var(--accent-about);
  }

  .about-contact {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text-muted);
  }

  .about-contact a {
    color: var(--accent-about);
  }

  .education-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .edu-degree {
    font-size: 1.125rem;
    margin-bottom: 2px;
  }

  .edu-school {
    font-size: 0.9375rem;
    color: var(--accent-about);
  }

  .edu-period {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    display: block;
    margin-top: 4px;
  }

  .skills-grid {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .skill-tag {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent-about);
    background: rgba(125, 211, 252, 0.08);
    border: 1px solid rgba(125, 211, 252, 0.15);
    padding: 6px 14px;
    border-radius: 20px;
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Timeline.astro src/pages/about.astro
git commit -m "feat: add about page with experience timeline"
```

---

### Task 14: 404 Page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create custom 404 page**

```astro
---
// src/pages/404.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="404 — Yumin Cao">
  <div class="container not-found">
    <h1 class="not-found-code">404</h1>
    <p class="not-found-msg">This page wandered off into the void.</p>
    <a href="/" class="not-found-link">Take me home</a>
  </div>
</BaseLayout>

<style>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
  }

  .not-found-code {
    font-size: 6rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent-papers), var(--accent-projects));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .not-found-msg {
    font-size: 1.125rem;
    color: var(--text-muted);
    margin-top: 8px;
    margin-bottom: 24px;
  }

  .not-found-link {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--accent-about);
    border: 1px solid rgba(125, 211, 252, 0.3);
    padding: 8px 20px;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .not-found-link:hover {
    background: rgba(125, 211, 252, 0.08);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: add custom 404 page"
```

---

## Chunk 6: Interactions & Easter Eggs

### Task 15: Hover Tilt Effect

**Files:**
- Create: `src/scripts/hover-tilt.ts`

- [ ] **Step 1: Create hover tilt script**

```typescript
// src/scripts/hover-tilt.ts
function initTilt() {
  const cards = document.querySelectorAll<HTMLElement>('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

document.addEventListener('astro:page-load', initTilt);
```

- [ ] **Step 2: Import tilt script in BaseLayout**

Add to `src/layouts/BaseLayout.astro`, in the `<head>`:

```html
<script src="../scripts/hover-tilt.ts"></script>
```

(Astro will bundle this automatically.)

- [ ] **Step 3: Verify tilt works on bento tiles**

```bash
npm run dev
```

Hover over bento tiles — they should tilt subtly toward cursor.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/hover-tilt.ts src/layouts/BaseLayout.astro
git commit -m "feat: add 3D hover tilt effect for cards"
```

---

### Task 16: Scroll Reveal

**Files:**
- Create: `src/scripts/scroll-reveal.ts`

- [ ] **Step 1: Create scroll reveal script**

```typescript
// src/scripts/scroll-reveal.ts
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .stagger').forEach(el => {
    observer.observe(el);
  });
}

document.addEventListener('astro:page-load', initScrollReveal);
```

- [ ] **Step 2: Import in BaseLayout**

Add to `src/layouts/BaseLayout.astro`, in the `<head>`:

```html
<script src="../scripts/scroll-reveal.ts"></script>
```

- [ ] **Step 3: Commit**

```bash
git add src/scripts/scroll-reveal.ts src/layouts/BaseLayout.astro
git commit -m "feat: add scroll reveal animations"
```

---

### Task 17: Easter Eggs

**Files:**
- Create: `src/scripts/easter-eggs.ts`

- [ ] **Step 1: Create easter eggs script**

```typescript
// src/scripts/easter-eggs.ts

// Konami code: confetti/stars rain
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

function initEasterEggs() {
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.code === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        triggerConfetti();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Avatar click counter
  let clickCount = 0;
  let clickTimer: ReturnType<typeof setTimeout>;
  const logo = document.querySelector('.navbar-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, 2000);

      if (clickCount >= 5) {
        e.preventDefault();
        const el = logo as HTMLElement;
        el.style.transition = 'transform 0.6s ease';
        el.style.transform = 'rotate(360deg)';
        setTimeout(() => { el.style.transform = ''; }, 700);
        clickCount = 0;
      }
    });
  }
}

function triggerConfetti() {
  const count = 60;
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const x = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const duration = Math.random() * 1.5 + 1.5;
    const colors = ['#a78bfa', '#6ee7b7', '#fbbf24', '#fb7185', '#7dd3fc'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    star.style.cssText = `
      position:absolute;top:-${size}px;left:${x}%;
      width:${size}px;height:${size}px;
      background:${color};border-radius:50%;
      animation:confetti-fall ${duration}s ${delay}s ease-in forwards;
      opacity:0.9;
    `;
    container.appendChild(star);
  }

  // Add keyframe animation if not exists
  if (!document.querySelector('#confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => container.remove(), 3500);
}

document.addEventListener('astro:page-load', initEasterEggs);
```

- [ ] **Step 2: Import in BaseLayout**

Add to `src/layouts/BaseLayout.astro`, in the `<head>`:

```html
<script src="../scripts/easter-eggs.ts"></script>
```

- [ ] **Step 3: Verify easter eggs work**

```bash
npm run dev
```

- Type Konami code (up up down down left right left right B A) — should see confetti.
- Click the "YC" logo 5 times fast — should spin.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/easter-eggs.ts src/layouts/BaseLayout.astro
git commit -m "feat: add konami code confetti and logo spin easter eggs"
```

---

## Chunk 7: Deployment & Polish

### Task 18: GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create deployment workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
      - name: Install, build, and upload
        uses: withastro/action@v5

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions deployment workflow"
```

---

### Task 19: Favicon & Final Config

**Files:**
- Create: `public/favicon.svg`
- Modify: `astro.config.mjs` (add Shiki theme)

- [ ] **Step 1: Create a simple favicon**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#0f0f1a"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
    font-family="system-ui" font-size="18" font-weight="700" fill="#a78bfa">Y</text>
</svg>
```

- [ ] **Step 2: Update Astro config with Shiki dark theme**

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://caoyumin97.github.io',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
```

- [ ] **Step 3: Full build test**

```bash
npm run build
```

Expected: Build succeeds, `dist/` folder contains all pages.

- [ ] **Step 4: Preview locally**

```bash
npm run preview
```

Open http://localhost:4321 — walk through all pages, verify everything renders correctly.

- [ ] **Step 5: Commit**

```bash
git add public/favicon.svg astro.config.mjs
git commit -m "feat: add favicon and configure Shiki syntax highlighting"
```

---

### Task 20: Final Verification & Cleanup

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: Zero errors, zero warnings.

- [ ] **Step 2: Check all routes exist in dist/**

```bash
ls dist/
ls dist/papers/
ls dist/projects/
ls dist/blog/
ls dist/life/
ls dist/about/
ls dist/404.html
```

Expected: All pages have `index.html` files.

- [ ] **Step 3: Preview and manually verify**

```bash
npm run preview
```

Checklist:
- Homepage bento grid loads with correct layout
- All nav links work
- Papers page shows sample paper with purple accents
- Projects page shows sample project with teal accents
- Blog listing links to individual post
- Life page shows all three sections
- About page shows timeline
- 404 page shows custom design
- Hover tilt works on cards
- Page transitions are smooth
- Mobile responsive (resize browser)
- Konami code triggers confetti

- [ ] **Step 4: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "chore: final polish and cleanup"
```

# Personal Website Design Spec — Yumin Cao

**Date:** 2026-03-13
**Deploy target:** caoyumin97.github.io (GitHub Pages)
**Stack:** Astro + TypeScript, vanilla CSS, minimal JS

---

## 1. Overview

A personal website for Yumin Cao — researcher, builder, photographer, musician, and outdoor enthusiast. The site showcases academic papers, software projects, blog writing, work experience, and hobbies. The tone is warm and playful with a modern dark aesthetic, designed to feel approachable while reflecting technical depth.

## 2. Visual Identity

### Theme: Cosmic Dark
- **Background:** Deep dark (#0f0f1a to #1a1a2e gradient)
- **Text:** Light gray (#e8e6e3) for body, white (#ffffff) for headings
- **Accent colors by section:**
  - Papers: Purple (#a78bfa / #6366f1)
  - Projects: Teal (#6ee7b7 / #10b981)
  - Blog: Amber (#fbbf24 / #f59e0b)
  - Life/Hobbies: Rose (#fb7185 / #f43f5e)
  - About: Sky (#7dd3fc / #0ea5e9)
- **Card surfaces:** Translucent dark with subtle colored borders (rgba-based)
- **Border radius:** 12px for cards, 8px for inner elements
- **Typography:** System font stack for body (-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif), monospace for code/labels

### Responsive Behavior
- Desktop (>1024px): Full bento grid (3-column, see section 3.1)
- Tablet (768-1024px): 2-column grid — Hero spans full width, then tiles pair up (Papers+Projects, Blog+Photo, Music+Outdoors, About full width)
- Mobile (<768px): Single-column stack — order: Hero, Papers, Projects, Blog, Photo, Music/Art, Outdoors, About

## 3. Site Structure

### 3.1 Homepage — Bento Grid

A grid of tiles, each acting as a portal to a section. The grid is asymmetric and visually interesting, not a uniform table.

**Grid layout (desktop):**
```
+-------------------+----------+----------+
|                   |  Papers  | Projects |
|   Hero / Intro    |  (purple)|  (teal)  |
|                   |          |          |
+-------------------+----------+----------+
|   Blog (amber)    |    Photo of the     |
|                   |       Week          |
+-------------------+---------------------+
|  Music/Art  | Outdoors  |   About/CV    |
|             |           |               |
+-------------+-----------+---------------+
```

**CSS grid definition:**
```css
.bento-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "hero    papers   projects"
    "blog    photo    photo"
    "music   outdoors about";
  gap: 16px;
}
```

**Hero tile (large, top-left):**
- Name: "Yumin Cao"
- Tagline: researcher / builder / explorer (or similar)
- Short rotating intro text (e.g., "currently working on X", "recently published Y")
- Social links (GitHub, Google Scholar, email) as subtle icons
- Subtle animated gradient background that slowly shifts

**Content tiles:**
Each tile shows a preview of the latest item from that section and links to the full subpage.

| Tile | Preview Content | Accent Color |
|------|----------------|--------------|
| Papers | Latest paper title + venue badge | Purple |
| Projects | Featured project name + short desc | Teal |
| Blog | Latest post title + date | Amber |
| Photo | Featured photo (auto-rotates weekly/manually) | — |
| Music/Art | Currently into / featured piece | Rose |
| Outdoors | Recent adventure with background image | Rose |
| About/CV | One-liner + "more about me" link | Sky |

### 3.2 Papers Page (`/papers`)

- List of publications, newest first
- Each entry: title, authors (self highlighted), venue, year, abstract (expandable), links (PDF, arXiv, code, slides)
- Filter/search by year or keyword (optional, can add later)
- Data source: Astro Markdown content collection (`src/content/papers/`)

### 3.3 Projects Page (`/projects`)

- Card grid of software projects
- Each card: name, description, tech tags, GitHub link, live demo link (if applicable)
- Cards have hover tilt effect
- Data source: Astro Markdown content collection (`src/content/projects/`)

### 3.4 Blog (`/blog`)

- Post list with title, date, short excerpt
- Individual post pages rendered from Markdown with code syntax highlighting
- Astro content collections for posts
- Support for images, code blocks, math (KaTeX) if needed

### 3.5 Life Page (`/life`)

A gallery-style page with sub-sections for hobbies:

- **Photography:** Masonry or grid photo gallery. Click to enlarge.
- **Music/Art:** Cards or list of what you're into — albums, instruments, playlists, artwork.
- **Outdoors:** Adventure log — photo + short description of trips, hikes, etc.

Layout: Scrolling sections within the page, each with a heading.
Data source: `src/data/life.json` for music/art/outdoors entries; photos served from `public/photos/` and indexed in `src/data/photos.json`.

### 3.6 About Page (`/about`)

- Longer bio/introduction
- Work experience timeline (vertical timeline, each entry: role, company, dates, short description)
- Education
- Skills/interests summary
- Contact information / reach out CTA

## 4. Interactions & Playful Details

### 4.1 Hover Animations
- **Bento tiles:** 3D perspective tilt on hover (CSS `transform: perspective() rotateX() rotateY()`) with a soft glow border that intensifies
- **Project cards:** Same tilt effect
- **Links:** Subtle underline slide-in animation

### 4.2 Smooth Transitions
- **Page transitions:** Astro View Transitions API for smooth cross-page navigation
- **Scroll reveals:** Elements fade/slide in as they enter viewport using Intersection Observer
- **Section entrances:** Staggered animation for card grids (each card delays slightly)

### 4.3 Dynamic Content
- **"Now" section** in the hero tile: reads from a `now.json` or frontmatter field — easy to update what you're currently working on, reading, or listening to
- **Photo of the week:** Reads from a designated folder or config, auto-displays the featured photo
- **Rotating taglines:** The hero subtitle cycles through a few phrases with a typing or fade effect

### 4.4 Easter Eggs
- **Konami code:** Triggers a confetti/stars rain animation across the page (v1). Future: theme swap, hidden page.
- **Avatar clicks:** Clicking the profile avatar 5+ times makes it spin and reveals a fun fact tooltip (v1). Future: more facts, animations.

### 4.5 Dynamic Content Update Workflow
Since this is a static site, "dynamic" content updates require a git push + rebuild. The workflow:
- Edit `src/data/now.json` or `src/data/photos.json` and push to `main`
- GitHub Actions rebuilds and redeploys automatically (~2 min)

## 5. Technical Architecture

### 5.1 Project Structure
```
/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, meta tags, theme CSS
│   │   ├── PageLayout.astro        # Standard page with nav + footer
│   │   └── PostLayout.astro        # Blog post layout with metadata
│   ├── components/
│   │   ├── BentoGrid.astro         # Homepage grid container
│   │   ├── BentoTile.astro         # Individual tile component
│   │   ├── NavBar.astro            # Top navigation
│   │   ├── Footer.astro            # Footer with links
│   │   ├── PaperCard.astro         # Paper list entry
│   │   ├── ProjectCard.astro       # Project card
│   │   ├── PhotoGallery.astro      # Photo grid/masonry
│   │   ├── Timeline.astro          # Work experience timeline
│   │   ├── NowPlaying.astro        # Dynamic "now" widget
│   │   └── EasterEgg.astro         # Konami code + hidden interactions
│   ├── pages/
│   │   ├── index.astro             # Homepage (bento grid)
│   │   ├── papers.astro            # Papers listing
│   │   ├── projects.astro          # Projects grid
│   │   ├── blog/
│   │   │   ├── index.astro         # Blog listing
│   │   │   └── [...slug].astro     # Individual blog post pages
│   │   ├── life.astro              # Hobbies page
│   │   ├── about.astro             # About + CV
│   │   └── 404.astro               # Custom 404 page
│   ├── content/
│   │   ├── config.ts               # Astro content collection schemas (Zod)
│   │   ├── blog/                   # Markdown blog posts
│   │   ├── papers/                 # Paper entries (Markdown)
│   │   └── projects/               # Project entries (Markdown)
│   ├── data/
│   │   ├── now.json                # "Currently" data for hero widget
│   │   ├── life.json               # Music/art/outdoors entries
│   │   └── photos.json             # Photo gallery index
│   ├── styles/
│   │   ├── global.css              # CSS custom properties, resets, theme
│   │   └── animations.css          # Hover, scroll, transition styles
│   └── scripts/
│       ├── hover-tilt.ts           # 3D tilt effect for cards
│       ├── scroll-reveal.ts        # Intersection Observer animations
│       └── easter-eggs.ts          # Konami code, avatar clicks
├── public/
│   ├── photos/                     # Photography images
│   ├── favicon.svg
│   └── og-image.png                # Social sharing image
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: build + deploy to Pages
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### 5.2 Navigation Bar
- Links: Home, Papers, Projects, Blog, Life, About
- Sticky at top with a translucent dark backdrop-filter blur
- Active link indicated with accent underline
- Mobile: hamburger menu that slides in from right

### 5.3 Footer
- Copyright line
- Social links (GitHub, Google Scholar, email)
- "Built with Astro" credit
- Minimal — one row, centered

### 5.4 Astro Configuration
- Output: `static` (for GitHub Pages)
- Site URL: `https://caoyumin97.github.io`
- View Transitions: enabled
- Content collections: blog, papers, projects
- Markdown: syntax highlighting via Shiki (dark theme)

### 5.5 Deployment
- GitHub Actions workflow triggered on push to `main`
- Runs `astro build`, deploys `dist/` to GitHub Pages
- Custom domain support ready (CNAME file) if needed later

## 6. Content Data Formats

### Paper entry (Markdown frontmatter):
```yaml
---
title: "Paper Title"
authors: ["Yumin Cao", "Collaborator A"]
venue: "NeurIPS 2025"
year: 2025
abstract: "Short abstract..."
links:
  pdf: "/papers/paper.pdf"
  arxiv: "https://arxiv.org/abs/..."
  code: "https://github.com/..."
featured: true
---
```

### Project entry:
```yaml
---
title: "cool-tool"
description: "A tool that does something cool"
tech: ["TypeScript", "Rust"]
github: "https://github.com/Caoyumin97/cool-tool"
demo: "https://cool-tool.dev"
featured: true
---
```

### Blog post (Markdown frontmatter):
```yaml
---
title: "Post Title"
date: 2026-03-01
excerpt: "A short summary for the listing page..."
tags: ["topic-a", "topic-b"]
draft: false
---
```

### Now data (`src/data/now.json`):
```json
{
  "working_on": "a new paper about X",
  "reading": "Designing Data-Intensive Applications",
  "listening": "Radiohead - OK Computer",
  "location": "somewhere nice"
}
```

## 7. Performance Goals

- Lighthouse score: 95+ across all categories
- First Contentful Paint: <1s
- Total page weight: <500KB (excluding photos)
- Zero runtime JS frameworks — only small vanilla scripts for interactions
- Images: lazy loaded, optimized via Astro's built-in image optimization

## 8. Out of Scope (for now)

- CMS integration (content managed via git)
- Comments on blog posts
- Analytics (can add later with a lightweight solution)
- i18n / multi-language
- Custom domain (GitHub default first, add later)

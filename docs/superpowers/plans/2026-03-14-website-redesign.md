# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the personal website from bento grid to editorial scroll with light/dark mode, floating blob background, frosted glass cards, and real paper content.

**Architecture:** Replace the rigid bento grid homepage with a vertical scroll narrative using reusable section and glass card components. Add a theme system via CSS custom properties on `[data-theme]` with FOUC-preventing inline script. Background blobs are a fixed-position component rendered in BaseLayout.

**Tech Stack:** Astro 5, TypeScript, vanilla CSS (custom properties, clamp(), backdrop-filter, CSS animations)

**Spec:** `docs/superpowers/specs/2026-03-14-website-redesign.md`

---

## Chunk 1: Foundation (Theme System + Background)

### Task 1: Update global.css with light/dark theme variables and fluid typography

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1:** Replace the `:root` block with dual-theme CSS custom properties — `:root, [data-theme="dark"]` for dark values and `[data-theme="light"]` for light values. Include all colors from spec section 4.2, plus new vars: `--card-blur-bg`, `--navbar-bg`. Bump `--max-width` to `1100px`. Bump `--border-radius-card` to `16px`.
- [ ] **Step 2:** Replace fixed font sizes in `h1-h6` and `body` with `clamp()` values from spec section 5.1.
- [ ] **Step 3:** Add theme transition rule for `body` (background-color, color, border-color over 300ms).
- [ ] **Step 4:** Update `body` background to use `var(--bg-primary)` / `var(--bg-secondary)` instead of hardcoded hex values.
- [ ] **Step 5:** Run `npm run build` to verify no errors.
- [ ] **Step 6:** Commit: `"refactor: add light/dark theme variables and fluid typography"`

### Task 2: Create BlobBackground component

**Files:**
- Create: `src/components/BlobBackground.astro`

- [ ] **Step 1:** Create component with a fixed-position container holding 3 blob divs. Each blob uses accent colors at low opacity with `filter: blur(80px)`. Add `blob-drift` keyframes animation (25s cycle, translate + scale). Use CSS custom properties so blob colors adapt to theme.
- [ ] **Step 2:** Run `npm run build` to verify.
- [ ] **Step 3:** Commit: `"feat: add floating blob background component"`

### Task 3: Create ThemeToggle component

**Files:**
- Create: `src/components/ThemeToggle.astro`

- [ ] **Step 1:** Create component with a button containing sun/moon SVG icons. Only show the icon for the opposite theme (sun when dark, moon when light). Script: on click, toggle `data-theme` on `<html>`, save to `localStorage`, rotate icon 180°. Listen for `astro:page-load` to re-bind.
- [ ] **Step 2:** Run `npm run build` to verify.
- [ ] **Step 3:** Commit: `"feat: add theme toggle component"`

### Task 4: Wire BlobBackground and ThemeToggle into BaseLayout

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/NavBar.astro`

- [ ] **Step 1:** In BaseLayout, add the FOUC-preventing inline script in `<head>` (reads localStorage / prefers-color-scheme, sets `data-theme` on `<html>`). Import and render `BlobBackground` as first child of `<body>`. Remove the `hover-tilt.ts` script import.
- [ ] **Step 2:** In NavBar, import `ThemeToggle` and render it in the navbar (right side, before the mobile hamburger toggle). Update navbar's hardcoded `rgba(15, 15, 26, ...)` background to use `var(--navbar-bg)`.
- [ ] **Step 3:** Run `npm run dev`, test toggling between light/dark mode — verify colors change, blobs visible, no FOUC on refresh.
- [ ] **Step 4:** Commit: `"feat: integrate theme system and blob background into layout"`

---

## Chunk 2: Reusable Components

### Task 5: Create GlassCard component

**Files:**
- Create: `src/components/GlassCard.astro`

- [ ] **Step 1:** Create component accepting props: `href?`, `accent?`, `class?`. Renders as `<a>` or `<div>` based on href. Styles: semi-transparent bg with `backdrop-filter: blur(12px)`, themed border, 16px border-radius. Hover: `translateY(-2px) scale(1.01)`, shadow elevation, accent border glow via `--tile-accent`. No 3D tilt.
- [ ] **Step 2:** Run `npm run build` to verify.
- [ ] **Step 3:** Commit: `"feat: add frosted glass card component"`

### Task 6: Create HomeSection component

**Files:**
- Create: `src/components/HomeSection.astro`

- [ ] **Step 1:** Create component accepting props: `label`, `accent`, `href` (for "View all →" link). Renders the section header pattern: accent-colored uppercase label, horizontal divider line, right-aligned link. Uses `<slot>` for section content. Wraps everything in a `reveal` container for scroll animation.
- [ ] **Step 2:** Run `npm run build` to verify.
- [ ] **Step 3:** Commit: `"feat: add homepage section component with accent divider"`

---

## Chunk 3: Homepage Rewrite

### Task 7: Rewrite homepage to editorial scroll

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1:** Replace the BentoGrid import with imports for HomeSection, GlassCard, NowPlaying, and content collection queries (papers, projects, blog).
- [ ] **Step 2:** Build the hero section: centered name with word-by-word reveal animation (CSS staggered `animation-delay` on `<span>` per word, not JS-heavy), rotating tagline, social links (GitHub, Scholar, Email) as pill-shaped links, NowPlaying widget below.
- [ ] **Step 3:** Build the Papers section using HomeSection: render 2-3 featured/latest papers as GlassCards with title, venue, and year.
- [ ] **Step 4:** Build the Projects section using HomeSection: 2-column grid of featured project GlassCards.
- [ ] **Step 5:** Build the Blog + Life row using HomeSection: side-by-side layout, blog shows latest post card, life shows photo thumbnails or "coming soon" placeholder.
- [ ] **Step 6:** Keep the rotating tagline `<script>` from the old BentoGrid (move into this file or keep inline).
- [ ] **Step 7:** Add responsive styles: 2-col at desktop, single-col at mobile. Hero scales down on small screens.
- [ ] **Step 8:** Run `npm run dev`, visually verify the full scroll experience.
- [ ] **Step 9:** Commit: `"feat: rewrite homepage as editorial scroll layout"`

### Task 8: Clean up removed files

**Files:**
- Delete: `src/components/BentoGrid.astro`
- Delete: `src/components/BentoTile.astro`
- Delete: `src/scripts/hover-tilt.ts`

- [ ] **Step 1:** Delete the three files. Verify no other files import them (grep for `BentoGrid`, `BentoTile`, `hover-tilt`).
- [ ] **Step 2:** Run `npm run build` to confirm clean build.
- [ ] **Step 3:** Commit: `"chore: remove bento grid components and tilt script"`

---

## Chunk 4: Update Animations and Existing Components

### Task 9: Update animations.css

**Files:**
- Modify: `src/styles/animations.css`

- [ ] **Step 1:** Update `.reveal` initial state to include `scale(0.98)` alongside `translateY(20px)`. Update `.visible` state to include `scale(1)`.
- [ ] **Step 2:** Remove `card-glow` class if it's no longer used (GlassCard handles its own hover). Keep `link-fancy` and `stagger` as they still apply.
- [ ] **Step 3:** Run `npm run build` to verify.
- [ ] **Step 4:** Commit: `"refactor: update scroll reveal animations, remove unused styles"`

### Task 10: Update PaperCard, ProjectCard, and Timeline to use themed styles

**Files:**
- Modify: `src/components/PaperCard.astro`
- Modify: `src/components/ProjectCard.astro`
- Modify: `src/components/Timeline.astro`

- [ ] **Step 1:** Update each component's `<style>` to use CSS custom properties (`var(--text-primary)`, `var(--bg-card)`, `var(--card-border)`, etc.) instead of any hardcoded color values. Add `backdrop-filter: blur()` and glass card styling where appropriate.
- [ ] **Step 2:** Remove `data-tilt` attributes if present (tilt is gone).
- [ ] **Step 3:** Run `npm run build` and verify each subpage renders correctly in both themes.
- [ ] **Step 4:** Commit: `"refactor: theme-aware PaperCard, ProjectCard, and Timeline"`

### Task 11: Update subpages for theme consistency

**Files:**
- Modify: `src/pages/papers.astro`
- Modify: `src/pages/projects.astro`
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/blog/[...slug].astro`
- Modify: `src/pages/life.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/404.astro`
- Modify: `src/layouts/PageLayout.astro`
- Modify: `src/layouts/PostLayout.astro`

- [ ] **Step 1:** Audit each file for hardcoded colors (hex values, rgba with fixed colors). Replace with CSS custom properties.
- [ ] **Step 2:** Update PageLayout and PostLayout page title styles to use fluid `clamp()` sizing.
- [ ] **Step 3:** Update NavBar mobile menu background to use `var(--navbar-bg)` or similar themed value.
- [ ] **Step 4:** Update Footer border and text colors to use theme variables.
- [ ] **Step 5:** Run `npm run build` and visually check all pages in both themes.
- [ ] **Step 6:** Commit: `"refactor: ensure all pages use theme-aware CSS custom properties"`

---

## Chunk 5: Paper Content

### Task 12: Replace sample paper with 5 real papers

**Files:**
- Delete: `src/content/papers/sample-paper.md`
- Create: `src/content/papers/od-flow-2021.md`
- Create: `src/content/papers/speed-prediction-2022.md`
- Create: `src/content/papers/od-probe-2023.md`
- Create: `src/content/papers/lane-speed-2024.md`
- Create: `src/content/papers/queue-estimation-2020.md`

- [ ] **Step 1:** Delete `sample-paper.md`.
- [ ] **Step 2:** Create 5 markdown files with frontmatter matching the content collection schema (title, authors, venue, year, links with DOI where available). Use data from spec section 8. Mark the 2021 TRC paper and 2023 JITS paper as `featured: true`.
- [ ] **Step 3:** Update the Google Scholar link in `src/pages/index.astro` (hero social links) and `src/components/Footer.astro` to point to the real profile: `https://scholar.google.com/citations?user=2hOjd60AAAAJ`
- [ ] **Step 4:** Run `npm run build` — verify all 5 papers render on `/papers` and featured ones appear on homepage.
- [ ] **Step 5:** Commit: `"content: add 5 real papers from Google Scholar"`

---

## Chunk 6: Final Polish and Verification

### Task 13: Update scroll-reveal.ts for new selectors

**Files:**
- Modify: `src/scripts/scroll-reveal.ts`

- [ ] **Step 1:** Verify the IntersectionObserver targets (`.reveal`, `.stagger`) match the class names used in the new homepage sections and components. Add any new selectors if needed (e.g., `.home-section`).
- [ ] **Step 2:** Run `npm run dev`, scroll through homepage and verify animations trigger correctly.
- [ ] **Step 3:** Commit: `"fix: update scroll reveal selectors for new layout"`

### Task 14: Full build and visual QA

**Files:** None (verification only)

- [ ] **Step 1:** Run `npm run build` — ensure clean build, no warnings.
- [ ] **Step 2:** Run `npm run preview` — walk through every page in dark mode.
- [ ] **Step 3:** Toggle to light mode — walk through every page again.
- [ ] **Step 4:** Test mobile viewport (devtools responsive mode) — verify all pages are readable.
- [ ] **Step 5:** Verify blob background is visible and drifts on all pages.
- [ ] **Step 6:** Verify theme persists across page navigations and page refresh.
- [ ] **Step 7:** Verify easter eggs still work (konami code, logo clicks).
- [ ] **Step 8:** Fix any issues found, commit as needed.

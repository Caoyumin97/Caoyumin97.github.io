# Personal Website Redesign Spec

**Date:** 2026-03-14
**Builds on:** 2026-03-13-personal-website-design.md
**Inspiration:** gemini.google.com, openclaw.ai, anthropic.com

---

## 1. Overview

Redesign the personal website from a rigid bento grid layout to an editorial scroll experience. Add light/dark mode, floating blob backgrounds for texture and depth, frosted glass cards, fluid typography, and softer interactions. Populate the papers section with 5 real publications from Google Scholar.

## 2. Design Direction: Editorial Scroll

### 2.1 Homepage Layout

Replace the bento grid with a vertical scroll narrative. Each content section appears as the user scrolls, with staggered reveal animations.

**Scroll order:**
1. **Hero** — Centered name, rotating tagline, social links (GitHub, Scholar, Email)
2. **Papers section** — Accent divider, 2-3 featured papers as frosted glass cards
3. **Projects section** — 2-column grid of featured project cards
4. **Blog + Life row** — Side-by-side, blog shows latest post, life shows photo thumbnails
5. **Footer**

**Section anatomy:**
```
┌─────────────────────────────────────────────────────┐
│  ← accent label ──────── divider line ── "View all →"│
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  Frosted glass card with content preview     │    │
│  └─────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────┐    │
│  │  Another card                                │    │
│  └─────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

Each section header uses the pattern:
- Accent-colored uppercase label (e.g., "PAPERS" in purple)
- Horizontal line extending to the right
- "View all →" link aligned right

### 2.2 Container Width

Increase `--max-width` from 1200px to **1100px** for content, but allow hero text and section cards to breathe with generous padding. The narrower max-width with wider cards creates better readability while still feeling spacious.

### 2.3 Responsive Behavior

- **Desktop (>1024px):** Full editorial layout, 2-col grids for projects and blog+life
- **Tablet (768–1024px):** Same vertical flow, projects go single-column, blog+life stack
- **Mobile (<768px):** Full single-column, all sections stack, hero scales down

## 3. Background & Texture: Floating Blobs

### 3.1 Dark Mode Background

Base gradient remains `#0f0f1a → #1a1a2e`. On top, 3–4 large blurred radial gradient blobs:

```css
.blob-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: blob-drift 25s ease-in-out infinite alternate;
}

.blob-1 {
  width: 500px; height: 400px;
  top: -15%; left: -10%;
  background: rgba(167, 139, 250, 0.07); /* purple */
}
.blob-2 {
  width: 450px; height: 350px;
  bottom: -15%; right: -8%;
  background: rgba(110, 231, 183, 0.05); /* teal */
  animation-delay: -8s;
}
.blob-3 {
  width: 400px; height: 300px;
  top: 40%; right: 20%;
  background: rgba(251, 191, 36, 0.04); /* amber */
  animation-delay: -15s;
}

@keyframes blob-drift {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.95); }
  100% { transform: translate(10px, -10px) scale(1.02); }
}
```

Blobs use `position: fixed` so they stay in place as the user scrolls, creating a parallax-like depth effect.

### 3.2 Light Mode Background

Base gradient becomes `#faf8f5 → #f0ede8` (warm cream). Blobs become softer pastels:
- Purple blob: `rgba(167, 139, 250, 0.04)`
- Teal blob: `rgba(110, 231, 183, 0.03)`
- Amber blob: `rgba(251, 191, 36, 0.03)`

### 3.3 Frosted Glass Cards

All content cards use semi-transparent backgrounds with backdrop blur:

Border radius bumped from 12px → 16px for a softer, rounder feel across the redesign.

```css
/* Dark mode */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
}

/* Light mode */
[data-theme="light"] .glass-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.06);
}
```

## 4. Light/Dark Mode

### 4.1 Theme Toggle

- Sun/moon icon in the navbar (right side, before mobile hamburger)
- Respects `prefers-color-scheme` on first visit
- Manual override saved to `localStorage`
- Inline `<script>` in `<head>` to prevent FOUC (flash of unstyled content):

```html
<script is:inline>
  const theme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

### 4.2 Color System (CSS Custom Properties)

```css
:root,
[data-theme="dark"] {
  --bg-primary: #0f0f1a;
  --bg-secondary: #1a1a2e;
  --bg-card: rgba(255, 255, 255, 0.03);
  --text-primary: #e8e6e3;
  --text-heading: #ffffff;
  --text-muted: #7c7c9a;
  --card-border: rgba(255, 255, 255, 0.06);
  --card-blur-bg: rgba(255, 255, 255, 0.03);
  --navbar-bg: rgba(15, 15, 26, 0.8);

  /* Accents stay the same */
  --accent-papers: #a78bfa;
  --accent-projects: #6ee7b7;
  --accent-blog: #fbbf24;
  --accent-life: #fb7185;
  --accent-about: #7dd3fc;
}

[data-theme="light"] {
  --bg-primary: #faf8f5;
  --bg-secondary: #f0ede8;
  --bg-card: rgba(255, 255, 255, 0.7);
  --text-primary: #374151;
  --text-heading: #111827;
  --text-muted: #6b7280;
  --card-border: rgba(0, 0, 0, 0.06);
  --card-blur-bg: rgba(255, 255, 255, 0.7);
  --navbar-bg: rgba(250, 248, 245, 0.8);

  /* Darken accents for contrast on light bg */
  --accent-papers: #7c3aed;
  --accent-projects: #059669;
  --accent-blog: #d97706;
  --accent-life: #e11d48;
  --accent-about: #0284c7;
}
```

### 4.3 Transition

All themed properties transition smoothly:
```css
body, .glass-card, .navbar, .footer {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

## 5. Typography

### 5.1 Fluid Sizing with clamp()

Replace fixed font sizes with fluid scaling (inspired by Anthropic):

| Element | Size |
|---------|------|
| Hero name | `clamp(2rem, 5vw, 3.5rem)` |
| Section heading | `clamp(1.25rem, 3vw, 1.75rem)` |
| Card title | `clamp(1rem, 2vw, 1.25rem)` |
| Body text | `clamp(0.875rem, 1.5vw, 1rem)` |
| Label/mono | `clamp(0.6875rem, 1vw, 0.8125rem)` |

### 5.2 Font Stack

Unchanged — system font stack for body, monospace for code/labels.

## 6. Interactions

### 6.1 Scroll Reveal (keep, enhance)

Keep the IntersectionObserver-based scroll reveal but enhance:
- Sections fade up with staggered children (existing)
- Add subtle scale: `transform: translateY(20px) scale(0.98)` → `translateY(0) scale(1)`
- Hero name: word-by-word reveal on initial load (CSS animation, not JS-heavy)

### 6.2 Card Hover (replace)

Remove the 3D perspective tilt (`hover-tilt.ts`). Replace with gentler hover:

```css
.glass-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-color: color-mix(in srgb, var(--tile-accent, white) 25%, transparent);
}
/* --tile-accent is set per-card via inline style, e.g. style="--tile-accent: var(--accent-papers)" */
```

### 6.3 Blob Drift (new)
```

### 6.4 Theme Toggle Animation (new)

Sun/moon icon rotates 180° on toggle. Background and all themed elements transition over 300ms.

### 6.5 Easter Eggs (keep)

- Konami code confetti: kept as-is
- Logo spin on 5 clicks: kept as-is

### 6.6 Rotating Taglines (keep)

Hero tagline still cycles with opacity fade transition.

## 7. Component Changes

### 7.1 Remove
- `src/components/BentoGrid.astro` — replaced by editorial scroll sections in index.astro
- `src/components/BentoTile.astro` — no longer needed
- `src/scripts/hover-tilt.ts` — replaced by CSS-only hover

### 7.2 Add
- `src/components/BlobBackground.astro` — floating blob container (used in BaseLayout)
- `src/components/ThemeToggle.astro` — sun/moon toggle button
- `src/components/HomeSection.astro` — reusable section wrapper with accent divider, label, and "View all" link
- `src/components/GlassCard.astro` — reusable frosted glass card

### 7.3 Modify
- `src/layouts/BaseLayout.astro` — add BlobBackground, ThemeToggle script, theme data attribute
- `src/components/NavBar.astro` — add ThemeToggle to navbar
- `src/pages/index.astro` — rewrite from bento grid to editorial scroll
- `src/styles/global.css` — add light/dark CSS custom properties, fluid typography, blob styles
- `src/styles/animations.css` — update reveal animations (add scale), remove tilt references
- `src/scripts/scroll-reveal.ts` — minor update for new selectors
- All page components — ensure they use CSS custom properties (var()) for theming

## 8. Papers Content

Populate with 5 confirmed papers from Google Scholar (user will add more later):

### Paper 1
- **Title:** Day-to-day dynamic origin–destination flow estimation using connected vehicle trajectories and automatic vehicle identification data
- **Authors:** Yumin Cao, Keshuang Tang, Jian Sun, Yangbeibei Ji
- **Venue:** Transportation Research Part C: Emerging Technologies
- **Year:** 2021
- **DOI:** 10.1016/j.trc.2021.103241

### Paper 2
- **Title:** Short-Term Travel Speed Prediction for Urban Expressways: Hybrid Convolutional Neural Network Models
- **Authors:** Keshuang Tang, Siqu Chen, Yumin Cao, Xingchen Li, Di Zang, Jian Sun, Yangbeibei Ji
- **Venue:** IEEE Transactions on Intelligent Transportation Systems
- **Year:** 2022

### Paper 3
- **Title:** Dynamic origin–destination flow estimation for urban road network solely using probe vehicle trajectory data
- **Authors:** Yumin Cao, Jiarong Yao, Keshuang Tang, Qi Kang
- **Venue:** Journal of Intelligent Transportation Systems
- **Year:** 2023
- **DOI:** 10.1080/15472450.2023.2209910

### Paper 4
- **Title:** Lane-level short-term travel speed prediction for urban expressways: An attentive spatio-temporal deep learning approach
- **Authors:** Keshuang Tang, Siqu Chen, Yumin Cao, Di Zang, Jian Sun
- **Venue:** IET Intelligent Transport Systems
- **Year:** 2024
- **DOI:** 10.1049/itr2.12464

### Paper 5
- **Title:** Fusing license plate recognition data and vehicle trajectory data for lane-based queue length estimation at signalized intersections
- **Authors:** Cheng Tan, Lei Liu, Hao Wu, Yumin Cao, Keshuang Tang
- **Venue:** Journal of Intelligent Transportation Systems
- **Year:** 2020
- **DOI:** 10.1080/15472450.2020.1732217

## 9. Page Consistency

All subpages (papers, projects, blog, life, about) share:
- Same BlobBackground (fixed behind all pages)
- Same frosted glass card style for content cards
- Same section header pattern (accent label + divider line)
- Same fluid typography scale
- Same navbar with theme toggle
- Same footer

This ensures visual coherence between the editorial scroll homepage and the subpages.

## 10. Updated File Structure

```
src/
├── components/
│   ├── BlobBackground.astro     # NEW — floating blob container
│   ├── ThemeToggle.astro        # NEW — sun/moon toggle
│   ├── HomeSection.astro        # NEW — section with divider
│   ├── GlassCard.astro          # NEW — frosted glass card
│   ├── NavBar.astro             # MODIFIED — add theme toggle
│   ├── Footer.astro             # unchanged
│   ├── PaperCard.astro          # MODIFIED — use glass card style
│   ├── ProjectCard.astro        # MODIFIED — use glass card style
│   ├── Timeline.astro           # MODIFIED — use glass card style
│   ├── NowPlaying.astro         # unchanged
│   └── PhotoGallery.astro       # unchanged (used on Life page)
├── pages/
│   ├── index.astro              # REWRITTEN — editorial scroll
│   └── ...                      # other pages — minor theme updates
├── styles/
│   ├── global.css               # MODIFIED — theme vars, fluid type, blobs
│   └── animations.css           # MODIFIED — softer reveals, no tilt
├── scripts/
│   ├── scroll-reveal.ts         # MODIFIED — updated selectors
│   ├── easter-eggs.ts           # unchanged
│   └── (hover-tilt.ts)          # DELETED
├── content/
│   └── papers/
│       ├── od-flow-2021.md      # NEW — real paper
│       ├── speed-prediction-2022.md  # NEW
│       ├── od-probe-2023.md     # NEW
│       ├── lane-speed-2024.md   # NEW
│       ├── queue-estimation-2020.md  # NEW
│       └── (sample-paper.md)    # DELETED
```

## 11. Performance

Same goals as original spec:
- Lighthouse 95+
- FCP <1s
- <500KB total (excl. photos)
- Zero runtime JS frameworks
- `backdrop-filter` has good browser support but gracefully degrades (cards just show solid bg)

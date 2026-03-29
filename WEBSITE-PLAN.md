# Bridge Docs Website Plan

Plan for building a static website to share bridge bidding system documentation with partners.

---

## Goals

1. **Share with friends**: Present our partnership system and the proposed SAYC standard in a polished, readable format
2. **Side-by-side comparison**: Make it easy to see what changes when switching to SAYC
3. **Learn shadcn/ui + Tailwind**: Build transferable skills for the ida project
4. **Zero JavaScript**: Fully static site, no client-side JS shipped

---

## Decisions Made

### Framework: Astro + React (build-time only)

- **Astro** renders React components at build time, outputs pure HTML + CSS
- **React** is used only as a templating engine (never shipped to browser)
- **Why Astro**: Already known (astro-whoami), markdown-native, zero JS by default
- **Why not plain Astro**: We want to use actual shadcn/ui React components for skill transfer to ida

### Design System: shadcn/ui + Tailwind CSS

- shadcn/ui components rendered at build time produce clean HTML + Tailwind classes
- Skills learned here transfer directly to ida (same React + shadcn/ui stack)
- Components used (all static, no JS required):

| Component | Use Case |
|-----------|----------|
| Table, TableHeader, TableBody, TableRow, TableCell | Bidding tables (openings, responses, rebids) |
| Card, CardHeader, CardContent, CardFooter | System overview cards, section containers |
| Badge | Difference markers (HCP, DESC, BOTH, Same) |
| Separator | Visual section dividers |
| Alert | Important notes, warnings about key differences |

### No JavaScript: Static-Only Components

Interactive components replaced with zero-JS alternatives:

| Avoided | Replacement |
|---------|-------------|
| Tabs | Separate pages (`/sayc`, `/our-system`, `/comparison`) |
| Accordion | Native HTML `<details>` / `<summary>` styled with Tailwind |
| DataTable (sortable) | Pre-sorted static tables |
| Mobile menu | CSS-only navigation or anchor links |

### Content Strategy: Markdown-Driven

- Existing `.md` files (SYSTEM.md, SAYC-SYSTEM.md, SYSTEM-COMPARISON.md) are the content source
- Content extracted into structured TypeScript data at build time
- Astro content collections or direct imports for markdown processing

### Navigation: Page-Based

| Page | Content Source | Purpose |
|------|---------------|---------|
| `/` | Landing page | Overview, key differences summary, links to systems |
| `/our-system` | SYSTEM.md | Full partnership system in shadcn/ui tables |
| `/sayc` | SAYC-SYSTEM.md | Full SAYC system in same format |
| `/comparison` | SYSTEM-COMPARISON.md | Side-by-side with diff badges |
| `/differences` | SAYC-DIFFERENCES.md | Summary of key differences |
| `/verification` | Scan images + SYSTEM.md | Scan-vs-transcription verification |
| `/resources` | Curated resource data | Educational bridge learning resources |
| `/downloads` | PDF links | Downloadable PDF convention cards |
| `/print/our-system` | SYSTEM.md | Print-optimized layout for PDF generation |
| `/print/sayc` | SAYC-SYSTEM.md | Print-optimized layout for PDF generation |
| `/print/transition-guide` | SAYC-DIFFERENCES.md | Print-optimized transition guide for PDF |

### Deployment: GitHub Pages

- GitHub Actions workflow builds Astro on push to `main`
- Static output deployed to `gh-pages` branch
- Base URL: `/bridge-docs/`

---

## Project Structure

```
website/
  astro.config.mjs
  tailwind.config.mjs
  tsconfig.json
  package.json
  src/
    layouts/
      BaseLayout.astro          # HTML shell, nav, footer
    components/
      ui/                       # shadcn/ui components (copied in)
        table.tsx
        card.tsx
        badge.tsx
        separator.tsx
        alert.tsx
      BiddingTable.tsx           # Reusable bidding table component
      SystemCard.tsx             # System overview card
      DiffBadge.tsx              # Difference type badge
      Navigation.astro           # Site navigation (static)
    pages/
      index.astro               # Landing page
      our-system.astro           # Partnership system
      sayc.astro                 # Standard SAYC
      comparison.astro           # Side-by-side comparison
      differences.astro          # Key differences summary
      verification.astro         # Scan-vs-transcription verification
      resources.astro            # Educational bridge resources
      downloads.astro            # Downloadable PDF convention cards
      print/
        our-system.astro         # Print layout for PDF generation
        sayc.astro               # Print layout for PDF generation
        transition-guide.astro   # Print layout for PDF generation
    data/
      our-system.ts              # Structured data from SYSTEM.md
      sayc-system.ts             # Structured data from SAYC-SYSTEM.md
      comparison.ts              # Structured data from SYSTEM-COMPARISON.md
    styles/
      global.css                 # Tailwind base + custom styles
  .github/
    workflows/
      deploy.yml                # GitHub Pages deployment
```

---

## Implementation Phases

### Phase 1: Scaffold
- Initialize Astro project with TypeScript
- Install and configure: `@astrojs/react`, Tailwind CSS, shadcn/ui
- Set up project structure (dirs, layouts, config)
- Configure Astro for GitHub Pages (`base: '/bridge-docs/'`)
- Set up GitHub Actions deploy workflow

### Phase 2: Components
- Copy in shadcn/ui primitives (Table, Card, Badge, Separator, Alert)
- Build domain components:
  - `BiddingTable.tsx`: Renders a bidding table from structured data
  - `SystemCard.tsx`: Overview card for a bidding system
  - `DiffBadge.tsx`: Badge showing difference type (HCP/DESC/BOTH)
- Build Astro layout (`BaseLayout.astro` with nav + footer)

### Phase 3: Content + Pages
- Parse SYSTEM.md, SAYC-SYSTEM.md, SYSTEM-COMPARISON.md into TypeScript data structures
- Build each page using components + data
- Style with Tailwind (responsive, clean typography)
- Cross-link pages via navigation

### Phase 4: Polish + Deploy
- Responsive design (mobile-friendly tables)
- Test GitHub Pages deployment
- Verify all content matches source markdown
- Add meta tags, favicon, Open Graph for sharing

### Phase 5: Post-Launch Additions
- Print-optimized pages (`/print/our-system`, `/print/sayc`, `/print/transition-guide`) for PDF generation
- Downloadable PDF convention cards via `/downloads` page
- PDF generation using weasyprint in the deploy workflow (pure build artifacts, not committed to git)
- Comprehensive resources page (`/resources`) with curated bridge learning materials
- Sticky sidebar table of contents with scroll spy on long pages
- Commit and PR title linting via `.github/workflows/lint-commits.yml`

# SkillTracker Student Portal Documentation

Welcome to the complete technical and architectural documentation for the **SkillTracker Student Portal** for Assam Down Town University (ADTU).

---

## Documentation Index

1. **[SCREENSHOTS.md](./SCREENSHOTS.md)**
   - High-resolution screenshots of the live interface and design system mockups.
2. **[AUDIT.md](./AUDIT.md)**
   - Live platform audit findings from `theskilltracker.in` and defect resolutions.
3. **[SPEC.md](./SPEC.md)**
   - Full technical specification: PWA offline architecture, API schemas, and routes.
4. **[DESIGN.md](./DESIGN.md)**
   - Design system guide: Warm terracotta & cream color palette, typography, and micro-interactions.
5. **[CONTEXT.md](./CONTEXT.md)**
   - Academic domain context, verified student persona (Nayandeep Goswami), and university requirements.

---

## Quick Architecture Summary

- **Frontend Core**: React 19 + React Router DOM 7 + Vite 8
- **Styling**: Tailwind CSS v4 with custom warm terracotta theme (`#faf9f5` / `#d97757` / `#1f1e1d`)
- **Animation**: Framer Motion 13
- **Offline & Storage**: IndexedDB via `idb-keyval` + multi-tier Service Worker caching
- **PWA**: 100% installable on Android (Chrome) and iOS (Safari) with Web App Manifest and background sync.

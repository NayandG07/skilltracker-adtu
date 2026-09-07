# SkillTracker — ADTU Student Portal (PWA)

An academic diagnostic, continuous lab assessment, and placement preparation Progressive Web Application (PWA) designed for the Department of Computer Science & Engineering at **Assam Down Town University (ADTU)**.

![SkillTracker Dashboard](./docs/screenshots/dashboard.png)

---

## Key Features

- **PWA First-Class Experience**: Fully installable on mobile devices (Android Chrome and iOS Safari) with offline caching and background sync.
- **Distraction-Free MCQ Assessment Workspace**: Timed examinations with question palette, live countdown timer, and automated scoring.
- **Programming & Benchmark Workspace**: In-browser coding workspace with test case runners and compiler feedback.
- **Curated LeetCode 300 DSA Tracker**: Roadmap across Semesters 1 to 6 with solved tracking and canonical problem links.
- **Cohort Leaderboard**: Cohort standings with top 3 medals, sticky student cards, and email privacy masking.
- **Verified Student Records**: Official academic record tracking (8.95 CGPA, 92.4% attendance, semester SGPA history).
- **Grievance & Feedback Portal**: Issue submission and moderation tracking.

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS v4 with custom warm terracotta & cream palette
- **Animations**: Framer Motion 13
- **Offline Engine**: Workbox Service Worker + IndexedDB (`idb-keyval`)

---

## Documentation

Full architectural documentation is available in the [`docs/`](./docs) folder:
- [Visual Screenshots & Design Gallery](./docs/SCREENSHOTS.md)
- [Live Platform Audit & Bug Resolutions](./docs/AUDIT.md)
- [Technical Specifications & Data Contracts](./docs/SPEC.md)
- [Design System & Color Palette](./docs/DESIGN.md)
- [System Architecture & Context](./docs/CONTEXT.md)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```
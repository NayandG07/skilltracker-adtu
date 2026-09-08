# SkillTracker — AI Agent Context & Continuation Guide

> **Updated:** 2026-09-05  
> **Workspace (Docs Hub):** `d:\Downloads\SKILLTRACKER`  
> **Codebase Path:** `D:\SkillTracker`  
> **Target Audience:** AI Agents & Developers continuing implementation or maintenance  
> **Purpose:** Read this before modifying the codebase. It records the active architecture, critical invariants, component responsibilities, persona data, and verification recipes.

---

## 1. Product & Architecture Overview

SkillTracker is a modern, responsive student assessment, lab tracking, LeetCode 300 DSA practice, and academic performance command center built for university students.

- **Stack:** React 18.3, TypeScript 5.6, Vite 8.2, Zustand 5.0, Lucide React, SheetJS (`xlsx`), and Vanilla CSS Modules.
- **Authoritative Specifications:**
  - `INDEX.md`: Master documentation hub & reading roadmap.
  - `redesign_specification.md`: Master Redesign Specification (v2.0.0).
  - `theme_specification.md`: 24-combination Multi-Color Theme System (v2.1.0).
  - `pwa_revamp_audit_and_blueprint.md`: Initial audit benchmark, defect list, and PWA caching.
  - `IMPLEMENTATION_STATUS.md`: Live codebase status, resolved defects (DEF-01 to DEF-08), and verification.

---

## 2. Active Personas & Institutional Context

- **Institution:** Assam Down Town University (ADTU).
- **Default Student Persona (`DEFAULT_STUDENT`):**
  - **Full Name:** Suraj Lakda
  - **Email:** `surajlakda55@gmail.com`
  - **Enrollment Number:** `ADTU/0/2024-28/BCSM/047`
  - **Academic Program:** B.Tech Computer Science & Engineering
  - **Current Standing:** Semester 5, Section A, Enterprise Track
  - **Official Academic Metrics:** Cumulative CGPA `8.95`, Attendance `92%`, Backlogs `0`, Cohort Standing `#2 of 59`.

---

## 3. Critical Invariants & Guardrails (NEVER BREAK THESE)

When working on the codebase, ensure the following constraints are strictly maintained:

### 1. Zero Login Barrier (Auto-Session Active)
- **Do NOT re-add a login blocker or login form.**
- The application automatically initializes the authenticated student session (`DEFAULT_STUDENT`) via `src/lib/auth.ts` and `src/store/auth.store.ts`.
- Direct access to `/`, `/login`, or wildcard `*` immediately redirects to `/student`.
- Background token synchronization is handled transparently by `ensureSession()`.

### 2. Zero Hardcoded Colors (Semantic Design Tokens)
- **Do NOT write static hex color values** (e.g. `#6366f1`, `#1e293b`) inside JSX components or CSS modules.
- Always consume the semantic design tokens defined in `src/styles/tokens.css` (e.g. `var(--primary)`, `var(--surface)`, `var(--text-primary)`, `var(--border)`, `var(--surface-overlay)`).
- The theme engine supports **24 combinations** (4 appearances: Light, Dark, AMOLED, System × 6 accents: Indigo, Violet, Emerald, Rose, Amber, Cyan).
- The default theme is **Dark + Indigo**.

### 3. Institutional Academic Data Integrity
- **Official academic metrics are strictly read-only on the client.** Students must never be able to directly modify their SGPA, CGPA, Attendance, or Backlogs in `/student/profile` or `/student/transcript`.
- Discrepancies must be handled through the formal **Correction Request Modal** workflow.

### 4. iOS-Grade Mobile Interaction Standard
- **Floating Pill Bottom Navigation:**
  - Must remain floating above the bottom edge with a soft glassmorphic treatment (`backdrop-filter: blur(16px)`), safe-area padding, and semantic border/shadow.
  - Do NOT convert it into a standard full-width Android navbar.
- **Active Tab Spring Indicator:**
  - An animated indicator pill moves behind the selected tab using a spring cubic-bezier transition (`translateX(...)`).
  - The indicator must smoothly glide from the previous tab to the new tab without flashing or disappearing.
- **Directional Slide Screen Transitions:**
  - Tab order: **Home (0) → Practice (1) → Labs (2) → Ranks (3) → Profile (4)**.
  - **Forward Navigation (newIndex > prevIndex):** Content enters from the **RIGHT** and exits toward the **LEFT**.
  - **Backward Navigation (newIndex < prevIndex):** Content enters from the **LEFT** and exits toward the **RIGHT**.
  - Both bottom navigation taps and horizontal swipe gestures share this directional behavior.
- **Rounded Card Geometry:**
  - Main cards and containers use modern, soft rounded corners (~`14px – 16px` border-radius via `var(--radius-lg)`), avoiding sharp/square boxes.

### 5. Privacy & Cohort Data Standards
- Full cohort leaderboard delivers all 59 students with pagination (10 per page) and a sticky "You are here (#2 of 59)" banner.
- All student email addresses must be masked (`s***@adtu.in` or `sur***@gmail.com`) to protect personal privacy.

---

## 4. Directory Structure & Code Responsibilities (`D:\SkillTracker`)

```text
D:\SkillTracker\src\
├── App.tsx                     # React Router definition; routes open under /student
├── main.tsx                    # React mount point
├── vite-env.d.ts               # Vite TypeScript typings
│
├── components/
│   ├── layout/
│   │   ├── StudentShell.tsx          # Responsive shell (Desktop sidebar, Tablet rail, Mobile iOS glass bar)
│   │   └── StudentShell.module.css   # Shell styles, glass effects, animations
│   ├── theme/
│   │   ├── ThemeToggle.tsx           # Theme popover & mobile bottom sheet (24 combinations)
│   │   └── ThemeToggle.module.css
│   └── ui/                           # Reusable UI primitives
│       ├── Badge.tsx, Button.tsx, Card.tsx, Input.tsx, Modal.tsx
│       ├── ProgressBar.tsx, Skeleton.tsx, Toast.tsx, BottomSheet.tsx
│
├── hooks/
│   ├── useAuth.ts              # Authentication session hook
│   ├── useTheme.ts             # Theme switcher hook (appearance & accent)
│   ├── useMediaQuery.ts        # Responsive breakpoint detection (isMobile, isTablet, isDesktop)
│   ├── useTimer.ts             # Quiz countdown timer with warning triggers
│   └── useToast.ts             # Notification dispatch system
│
├── lib/
│   ├── api.ts                  # Fetch API client with authorization header injection
│   ├── auth.ts                 # Stored session management, DEFAULT_STUDENT, ensureSession()
│   ├── services.ts             # Service layer for students, assessments, DSA problems, leaderboard
│   ├── theme.ts                # 24-combination theme definitions and CSS variable mapping
│   └── utils.ts                # Utilities, canonical slug generators, privacy email masking
│
├── pages/student/
│   ├── DashboardPage.tsx       # Student command center (metrics, radar, streak heatmap, resume problem)
│   ├── DSATrackPage.tsx        # LeetCode 300 practice tracker with topic filters and modal submission
│   ├── FeedbackPage.tsx        # Ticket submission portal for bug reports and feature requests
│   ├── LabsPage.tsx            # Lab assessments, deadlines, status chips, start exam action
│   ├── LeaderboardPage.tsx     # Cohort rankings (59 students), pagination, sticky user banner
│   ├── ProfilePage.tsx         # Academic profile, read-only institutional data, correction modal
│   ├── QuizPage.tsx            # 30-minute exam engine with question palette, auto-save, check confirmation
│   ├── SettingsPage.tsx        # Appearance and accent selectors with "Reset to Default"
│   └── TranscriptPage.tsx      # Academic transcript, SGPA table, SheetJS Excel export, print styles
│
├── store/
│   ├── auth.store.ts           # Zustand auth store initialized with DEFAULT_STUDENT
│   └── theme.store.ts          # Zustand theme store with skilltracker_theme persistence & OS sync
│
├── styles/
│   ├── globals.css             # Global reset, typography, and utility classes
│   └── tokens.css              # 24-combination semantic CSS variables
│
└── types/
    └── index.ts                # Domain models: Student, Assessment, Question, Theme, DSAProblem
```

---

## 5. Development & Verification Recipes

### Running the Application
```bash
# Navigate to codebase
cd D:\SkillTracker

# Run dev server on port 3000
npm run dev

# TypeScript typecheck & production build
npm run build

# Preview production build locally
npm run preview
```

### Production Build Verification Baseline
- **Build Tool:** Vite 8.2 + TypeScript 5.6
- **Status:** Clean build in ~850ms, 0 errors, 0 warnings.
- **Chunks:** High-weight libraries (`xlsx`) chunked separately to keep core bundle lightweight (~397kB JS / ~78kB CSS).

### Viewport Verification Checklist
When testing UI changes, always verify across these exact viewport widths:
1. **320px (Mobile S):** No horizontal overflow, text wraps cleanly.
2. **375px (iPhone SE):** Compact cards and 5-tab floating pill bar.
3. **390px (iPhone 13/14):** Standard mobile layout.
4. **412px (Android flagship):** Standard wide mobile.
5. **430px (iPhone Pro Max):** Large mobile screen.
6. **768px (Tablet):** Compact sidebar rail (68px) with full card canvas.
7. **1024px+ (Desktop):** Full sidebar navigation and multi-column command grid.

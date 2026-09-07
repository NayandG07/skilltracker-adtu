# SkillTracker Student Portal PWA — Technical Specification (SPEC)

## 1. Overview & Objectives
SkillTracker Student Portal is a Progressive Web Application (PWA) designed for engineering students at ADTU (Assam Down Town University). The portal provides students with diagnostic lab evaluations, real-time cohort academic rankings, LeetCode 300 DSA practice, official academic transcript generation, and time-critical deadline notifications.

### Primary Objectives:
1. **PWA First-Class Experience**: 100% installable, offline-resilient, with background caching and fast startup.
2. **Apple / Instagram-Style Mobile Navigation**: Frosted glass bottom tab bar with 5 ergonomic touchpoints, fluid active indicators, and haptic feedback.
3. **Working Real Notifications**: Browser Web Notification API with permission handling, sound, haptics, periodic reminders, and an in-app Notification Center.
4. **Professional Anthropic-Inspired Aesthetics**: Warm charcoal/obsidian palette (`#141413`, `#1b1b19`, `#262624`), warm clay/terracotta accents (`#d97757`), ivory text (`#faf9f5`), strictly avoiding generic purple/cyan "AI slop" gradients.
5. **Data Integrity & Bug Resolution**: Complete eradication of the mobile blocker (`Wi`/`Ui`), unified academic data source (8.95 CGPA, 92% attendance), full 59-cohort leaderboard with email privacy masking, and canonical LeetCode URLs.

---

## 2. Route Architecture

| Route Path | View Component | Description |
|---|---|---|
| `/student` | `DashboardView.jsx` | Command dashboard: quick stats, deadline countdown radar, 30-day DSA streak commit grid, resume task button, pending labs. |
| `/student/dsa-track` | `DsaTrackView.jsx` | Curated 300 DSA problems with canonical slugs, difficulty badges, category filters, search, and instant sync. |
| `/student/list` | `LabsListView.jsx` | Active lab assessments, code submission modal, countdown timers, past evaluated scores. |
| `/student/result/:id` | `DiagnosticResultView.jsx` | Detailed scorecard with corrected emerald checkmark badges (`CheckCircle2`) instead of confusing red cross icons. |
| `/student/leaderboard` | `LeaderboardView.jsx` | Cohort-wide ranking of all 59 students, sticky user rank card (#2 of 59), search, pagination, email privacy masking. |
| `/student/profile` | `StudentProfileView.jsx` | Verified academic profile (8.95 CGPA, SGPA history, attendance rate), data correction modal, PWA offline diagnostics. |
| `/student/transcript` | `StudentTranscriptView.jsx` | Official university transcript view with `@media print` styling for university-grade PDF export without dark background or navbars. |
| `*` | `NotFoundView.jsx` | Ergonomic 404 page redirecting cleanly to `/student` (resolving old dead-end links). |

---

## 3. Data Schemas & API Contracts

### 3.1 Student Record (`/api/readiness/:id`)
```typescript
interface StudentRecord {
  id: string; // "ADTU/0/2024-28/BCSM/047"
  name: string; // "Nayandeep Goswami"
  email: string; // "nayandg8@gmail.com"
  maskedEmail: string; // "n***8@gmail.com"
  program: string; // "B.Tech Computer Science & Engineering"
  semester: number; // 5
  section: string; // "A"
  batch: string; // "2024 - 2028"
  cgpa: number; // 8.95
  attendanceRate: number; // 92.4
  cohortRank: number; // 2
  totalCohortSize: number; // 59
  totalProblemsSolved: number; // 142
  totalLabsCompleted: number; // 18
  sgpaHistory: Array<{
    semester: number;
    sgpa: number;
    credits: number;
    status: "Completed" | "In Progress";
  }>;
}
```

### 3.2 Lab Assessment Record
```typescript
interface LabAssignment {
  id: string; // "lab-os-05"
  title: string; // "Operating Systems: Virtual Memory & Page Replacement"
  courseCode: string; // "CS502"
  deadline: string; // ISO 8601 Timestamp
  durationMinutes: number; // 90
  totalMarks: number; // 100
  status: "active" | "submitted" | "graded" | "overdue";
  score?: number; // e.g. 96
  topics: string[];
  submissionPayload?: {
    code: string;
    submittedAt: string;
    offlineQueued?: boolean;
  };
}
```

### 3.3 DSA Problem Record
```typescript
interface DsaProblem {
  id: number;
  title: string;
  slug: string; // Canonical LeetCode slug, e.g. "longest-substring-without-repeating-characters"
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Arrays" | "Strings" | "Two Pointers" | "Sliding Window" | "Linked List" | "Trees" | "Dynamic Programming" | "Graphs";
  solved: boolean;
  solvedAt?: string;
  notes?: string;
}
```

### 3.4 Notification Payload
```typescript
interface PortalNotification {
  id: string;
  title: string;
  body: string;
  type: "lab_deadline" | "new_lab" | "streak_alert" | "system";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: "high" | "normal" | "low";
}
```

---

## 4. PWA & Service Worker Specifications

### 4.1 Manifest (`manifest.webmanifest`)
- `display`: `"standalone"`
- `orientation`: `"portrait-primary"`
- `background_color`: `"#141413"` (Warm Obsidian)
- `theme_color`: `"#141413"`
- Icons: 192x192 PNG, 512x512 PNG, and 512x512 maskable PNG.
- Shortcuts: DSA Practice (`/student/dsa-track`) and Lab Assessments (`/student/list`).

### 4.2 Caching Strategies
1. **CacheFirst**:
   - Application shell JS, CSS, Lucide SVGs, fonts.
   - Cache key tagged with asset hash.
2. **StaleWhileRevalidate**:
   - DSA 300 problem catalog, curriculum syllabus.
   - Immediate UI rendering from cache, silent background update.
3. **NetworkFirst**:
   - Real-time cohort leaderboard, active assessment status.
   - Falls back to cached snapshot when offline.
4. **NetworkOnly with IndexedDB Offline Queue**:
   - Lab code submissions and answers.
   - If offline, writes to IndexedDB table `offline_submissions` and listens for `window.online` event to flush.

---

## 5. Mobile Ergonomics & Apple / Instagram Navigation

### 5.1 Bottom Navigation Bar Specs
- Height: `64px` + `env(safe-area-inset-bottom)`.
- Background: `rgba(20, 20, 19, 0.88)` with `backdrop-filter: blur(20px) saturate(180%)`.
- Border: `1px solid rgba(255, 255, 255, 0.08)`.
- Tabs:
  1. **Home**: `Home` icon (fill on active).
  2. **Practice**: `Code2` / `Compass` icon.
  3. **Labs**: `FlaskConical` icon with red badge for active lab count.
  4. **Rankings**: `Trophy` / `BarChart3` icon.
  5. **Profile**: User avatar badge with terracotta ring when active.
- Micro-interactions:
  - Tactile haptic feedback via `navigator.vibrate?.(12)` on tab selection.
  - Smooth active pill indicator beneath icon.
  - Safe-area bottom spacing prevents clash with iOS home indicator bar.

---

## 6. Notifications Engine Specification
- Browser `Notification.requestPermission()` flow initiated via friendly primer modal.
- Native system notification dispatch with sound, badge, and click-to-route action.
- Built-in "Send Test Notification" trigger allowing instantaneous user verification on desktop and mobile browsers.
- Persistent in-app Notification Center drawer with unread count badges and filter tabs.

---

## 7. Accessibility & Performance Benchmarks
- WCAG AA contrast ratio compliance across all text and backgrounds.
- All form controls equipped with explicit `id`, `name`, `htmlFor`, and `aria-label`.
- Target Lighthouse Performance score: >95.
- Target First Contentful Paint (FCP): <0.8s.

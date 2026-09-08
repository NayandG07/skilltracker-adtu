# SKILLTRACKER THEME SYSTEM — ADVANCED MULTI-COLOR SPECIFICATION
**Document Type:** Addendum to Master Redesign Specification  
**Version:** 2.1.0 — Theme System Extension  
**Status:** Implementation-Ready Specification — DO NOT CODE YET  

---

## OVERVIEW

The SkillTracker theme system is a **two-axis customization matrix** that independently controls:

1. **Appearance** — The base surface, background, and text color mode.
2. **Accent Palette** — The brand, interactive, and focus colors applied on top of the base.

This produces up to **24 distinct visual personalities** from a single shared component system.

```
                ACCENT PALETTE →
              Indigo  Violet  Emerald  Rose  Amber  Cyan
APPEARANCE  ┌────────────────────────────────────────────┐
      Light │  L-In   L-Vi    L-Em    L-Ro   L-Am   L-Cy │
       Dark │  D-In   D-Vi    D-Em    D-Ro   D-Am   D-Cy │
      AMOLED│  A-In   A-Vi    A-Em    A-Ro   A-Am   A-Cy │
     System │  S-In   S-Vi    S-Em    S-Ro   S-Am   S-Cy │
            └────────────────────────────────────────────┘
```

**System Default** maps to whatever the OS preference reports (`prefers-color-scheme: dark` or `light`), then applies the user's stored accent palette on top.

---

## SECTION 1 — ARCHITECTURE PRINCIPLES

### 1.1 Single Component System
There is exactly **one** implementation of every component. Components never contain:
- Hardcoded hex values.
- Theme-conditional logic inside JSX or component CSS.
- Appearance-specific class names (no `.btn-dark`, `.card-light`).

All visual variation is delegated exclusively to CSS custom properties resolved through the document root or a top-level theme wrapper element.

### 1.2 Separation of Concerns

```
Layer 0: HTML attributes
  └── data-appearance="dark"
  └── data-accent="violet"

Layer 1: CSS Custom Properties (Design Tokens)
  └── Appearance tokens resolve background, surface, text, border
  └── Accent tokens resolve primary, focus, gradient, selection

Layer 2: Component Classes
  └── .btn-primary { background: var(--primary); }
  └── .card { background: var(--surface); border-color: var(--border); }

Layer 3: Rendered UI
  └── Consistent layout, spacing, typography across all combinations
```

### 1.3 Token Taxonomy

Two distinct token groups. Components only consume the **semantic** layer:

| Token Group | Scope | Defined By | Consumed By |
| :--- | :--- | :--- | :--- |
| **Base Surface Tokens** | Background, surfaces, borders, text | Appearance (`dark` / `light` / `amoled`) | Every component |
| **Accent Tokens** | Primary, interactive, focus, gradient | Accent Palette (`indigo` / `violet` / etc.) | Interactive elements |
| **Semantic Status Tokens** | Success, Warning, Danger, Info | Fixed — accent-independent | Status badges, toasts, validation |

**Critical Rule:** Status token values (`--success`, `--warning`, `--danger`, `--info`) are defined inside the **Appearance** layer, not the Accent layer. They adapt to dark/light contrast needs but never change semantic meaning when the user switches accent colors.

---

## SECTION 2 — BASE APPEARANCE TOKENS

These tokens define the "canvas" — backgrounds, surfaces, borders, and text. They are completely independent of the user's accent choice.

### 2.1 Light Appearance

```css
[data-appearance="light"] {
  /* Backgrounds */
  --background:           #f8fafc;
  --background-alt:       #f1f5f9;
  --surface:              #ffffff;
  --surface-elevated:     #f8fafc;
  --surface-hover:        #f1f5f9;
  --surface-active:       #e2e8f0;
  --surface-overlay:      rgba(255, 255, 255, 0.92);

  /* Borders */
  --border:               #e2e8f0;
  --border-subtle:        #f1f5f9;
  --border-strong:        #cbd5e1;

  /* Text */
  --text-primary:         #0f172a;
  --text-secondary:       #475569;
  --text-muted:           #94a3b8;
  --text-disabled:        #cbd5e1;
  --text-inverse:         #ffffff;

  /* Status — Semantically Fixed */
  --success:              #059669;
  --success-subtle:       #ecfdf5;
  --success-border:       #a7f3d0;
  --warning:              #d97706;
  --warning-subtle:       #fffbeb;
  --warning-border:       #fde68a;
  --danger:               #dc2626;
  --danger-subtle:        #fef2f2;
  --danger-border:        #fecaca;
  --info:                 #0284c7;
  --info-subtle:          #f0f9ff;
  --info-border:          #bae6fd;

  /* Scrollbar */
  --scrollbar-track:      #f1f5f9;
  --scrollbar-thumb:      #cbd5e1;
  --scrollbar-thumb-hover:#94a3b8;

  /* Shadows */
  --shadow-sm:            0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md:            0 4px 6px rgba(15, 23, 42, 0.07), 0 2px 4px rgba(15, 23, 42, 0.06);
  --shadow-lg:            0 10px 15px rgba(15, 23, 42, 0.08), 0 4px 6px rgba(15, 23, 42, 0.04);
  --shadow-xl:            0 20px 25px rgba(15, 23, 42, 0.09), 0 8px 10px rgba(15, 23, 42, 0.04);

  /* Skeletons */
  --skeleton-base:        #e2e8f0;
  --skeleton-shimmer:     #f8fafc;
}
```

### 2.2 Dark Appearance

```css
[data-appearance="dark"] {
  /* Backgrounds */
  --background:           #0b0f17;
  --background-alt:       #0f1520;
  --surface:              #111827;
  --surface-elevated:     #1a2234;
  --surface-hover:        #1e293b;
  --surface-active:       #263147;
  --surface-overlay:      rgba(17, 24, 39, 0.95);

  /* Borders */
  --border:               #1f293d;
  --border-subtle:        #162032;
  --border-strong:        #2d3f5c;

  /* Text */
  --text-primary:         #f1f5f9;
  --text-secondary:       #94a3b8;
  --text-muted:           #64748b;
  --text-disabled:        #334155;
  --text-inverse:         #0f172a;

  /* Status — Semantically Fixed */
  --success:              #10b981;
  --success-subtle:       rgba(16, 185, 129, 0.12);
  --success-border:       rgba(16, 185, 129, 0.25);
  --warning:              #f59e0b;
  --warning-subtle:       rgba(245, 158, 11, 0.12);
  --warning-border:       rgba(245, 158, 11, 0.25);
  --danger:               #ef4444;
  --danger-subtle:        rgba(239, 68, 68, 0.12);
  --danger-border:        rgba(239, 68, 68, 0.25);
  --info:                 #38bdf8;
  --info-subtle:          rgba(56, 189, 248, 0.12);
  --info-border:          rgba(56, 189, 248, 0.25);

  /* Scrollbar */
  --scrollbar-track:      #111827;
  --scrollbar-thumb:      #1f293d;
  --scrollbar-thumb-hover:#2d3f5c;

  /* Shadows */
  --shadow-sm:            0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md:            0 4px 6px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.25);
  --shadow-lg:            0 10px 15px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.2);
  --shadow-xl:            0 20px 25px rgba(0, 0, 0, 0.45), 0 8px 10px rgba(0, 0, 0, 0.2);

  /* Skeletons */
  --skeleton-base:        #1a2234;
  --skeleton-shimmer:     #1e293b;
}
```

### 2.3 AMOLED Appearance

```css
[data-appearance="amoled"] {
  /* Backgrounds */
  --background:           #000000;
  --background-alt:       #050505;
  --surface:              #0a0a0a;
  --surface-elevated:     #111111;
  --surface-hover:        #181818;
  --surface-active:       #1f1f1f;
  --surface-overlay:      rgba(10, 10, 10, 0.97);

  /* Borders */
  --border:               #1c1c1e;
  --border-subtle:        #111111;
  --border-strong:        #2c2c2e;

  /* Text */
  --text-primary:         #ffffff;
  --text-secondary:       #a1a1aa;
  --text-muted:           #71717a;
  --text-disabled:        #3f3f46;
  --text-inverse:         #000000;

  /* Status — Semantically Fixed */
  --success:              #34d399;
  --success-subtle:       rgba(52, 211, 153, 0.15);
  --success-border:       rgba(52, 211, 153, 0.3);
  --warning:              #fbbf24;
  --warning-subtle:       rgba(251, 191, 36, 0.15);
  --warning-border:       rgba(251, 191, 36, 0.3);
  --danger:               #f87171;
  --danger-subtle:        rgba(248, 113, 113, 0.15);
  --danger-border:        rgba(248, 113, 113, 0.3);
  --info:                 #67e8f9;
  --info-subtle:          rgba(103, 232, 249, 0.15);
  --info-border:          rgba(103, 232, 249, 0.3);

  /* Scrollbar */
  --scrollbar-track:      #000000;
  --scrollbar-thumb:      #1c1c1e;
  --scrollbar-thumb-hover:#2c2c2e;

  /* Shadows */
  --shadow-sm:            0 1px 2px rgba(0, 0, 0, 0.5);
  --shadow-md:            0 4px 6px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4);
  --shadow-lg:            0 10px 15px rgba(0, 0, 0, 0.65), 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-xl:            0 20px 25px rgba(0, 0, 0, 0.7), 0 8px 10px rgba(0, 0, 0, 0.4);

  /* Skeletons */
  --skeleton-base:        #111111;
  --skeleton-shimmer:     #181818;
}
```

### 2.4 System Appearance
System appearance does not define its own token block. At runtime, JavaScript reads `window.matchMedia('(prefers-color-scheme: dark)')` and programmatically sets `data-appearance="dark"` or `data-appearance="light"`. A listener updates this when the OS preference changes.

---

## SECTION 3 — ACCENT PALETTE TOKENS

Six independently selectable color palettes. Each defines the full interactive color vocabulary applied on top of whichever appearance mode is active. Palette tokens use the `[data-accent]` attribute selector and must be valid and accessible in all three appearance modes.

The critical design constraint: **each palette must look intentionally designed, not simply hue-rotated.** The shades below are individually calibrated for each appearance context.

### 3.1 Indigo Palette (Default)
*Character: Professional, institutional, reliable. The flagship university productivity tone.*

```css
[data-accent="indigo"] {
  --primary:              #6366f1;
  --primary-hover:        #4f46e5;
  --primary-active:       #4338ca;
  --primary-subtle:       rgba(99, 102, 241, 0.12);
  --primary-border:       rgba(99, 102, 241, 0.25);
  --primary-text:         #ffffff;

  --accent:               #818cf8;
  --accent-hover:         #6366f1;
  --accent-subtle:        rgba(129, 140, 248, 0.10);

  --focus-ring:           0 0 0 3px rgba(99, 102, 241, 0.35);
  --focus-ring-offset:    0 0 0 2px var(--background), 0 0 0 4px rgba(99, 102, 241, 0.35);

  --gradient-start:       #6366f1;
  --gradient-end:         #8b5cf6;

  --selection-background: rgba(99, 102, 241, 0.20);
  --selection-text:       inherit;

  --nav-active-bg:        rgba(99, 102, 241, 0.12);
  --nav-active-text:      #6366f1;
  --nav-active-border:    #6366f1;

  --chart-primary:        #6366f1;
  --chart-secondary:      #818cf8;
  --chart-tertiary:       #c7d2fe;
  --chart-quaternary:     #e0e7ff;

  --tab-active-color:     #6366f1;
  --tab-active-border:    #6366f1;

  --link-color:           #6366f1;
  --link-hover:           #4f46e5;
}
```

**Light appearance override** (more saturated for sufficient contrast on white):
```css
[data-appearance="light"][data-accent="indigo"] {
  --primary:              #4f46e5;
  --primary-hover:        #4338ca;
  --primary-active:       #3730a3;
  --primary-subtle:       rgba(79, 70, 229, 0.08);
  --primary-border:       rgba(79, 70, 229, 0.20);
  --accent:               #6366f1;
  --accent-hover:         #4f46e5;
  --accent-subtle:        rgba(99, 102, 241, 0.08);
  --focus-ring:           0 0 0 3px rgba(79, 70, 229, 0.25);
  --nav-active-bg:        rgba(79, 70, 229, 0.08);
  --nav-active-text:      #4f46e5;
  --nav-active-border:    #4f46e5;
  --chart-primary:        #4f46e5;
  --chart-secondary:      #6366f1;
  --link-color:           #4f46e5;
  --link-hover:           #3730a3;
}
```

---

### 3.2 Violet Palette
*Character: Premium, sophisticated, creative. Inspired by premium SaaS product aesthetics.*

```css
[data-accent="violet"] {
  --primary:              #8b5cf6;
  --primary-hover:        #7c3aed;
  --primary-active:       #6d28d9;
  --primary-subtle:       rgba(139, 92, 246, 0.12);
  --primary-border:       rgba(139, 92, 246, 0.25);
  --primary-text:         #ffffff;

  --accent:               #a78bfa;
  --accent-hover:         #8b5cf6;
  --accent-subtle:        rgba(167, 139, 250, 0.10);

  --focus-ring:           0 0 0 3px rgba(139, 92, 246, 0.35);
  --focus-ring-offset:    0 0 0 2px var(--background), 0 0 0 4px rgba(139, 92, 246, 0.35);

  --gradient-start:       #8b5cf6;
  --gradient-end:         #ec4899;

  --selection-background: rgba(139, 92, 246, 0.20);
  --selection-text:       inherit;

  --nav-active-bg:        rgba(139, 92, 246, 0.12);
  --nav-active-text:      #8b5cf6;
  --nav-active-border:    #8b5cf6;

  --chart-primary:        #8b5cf6;
  --chart-secondary:      #a78bfa;
  --chart-tertiary:       #c4b5fd;
  --chart-quaternary:     #ede9fe;

  --tab-active-color:     #8b5cf6;
  --tab-active-border:    #8b5cf6;

  --link-color:           #8b5cf6;
  --link-hover:           #7c3aed;
}

[data-appearance="light"][data-accent="violet"] {
  --primary:              #7c3aed;
  --primary-hover:        #6d28d9;
  --primary-active:       #5b21b6;
  --primary-subtle:       rgba(124, 58, 237, 0.08);
  --primary-border:       rgba(124, 58, 237, 0.20);
  --accent:               #8b5cf6;
  --accent-hover:         #7c3aed;
  --accent-subtle:        rgba(139, 92, 246, 0.08);
  --focus-ring:           0 0 0 3px rgba(124, 58, 237, 0.25);
  --nav-active-bg:        rgba(124, 58, 237, 0.08);
  --nav-active-text:      #7c3aed;
  --nav-active-border:    #7c3aed;
  --chart-primary:        #7c3aed;
  --chart-secondary:      #8b5cf6;
  --link-color:           #7c3aed;
  --link-hover:           #5b21b6;
}
```

---

### 3.3 Emerald Palette
*Character: Focused, developer-centric, productivity-oriented. Coding environment aesthetic.*

```css
[data-accent="emerald"] {
  --primary:              #10b981;
  --primary-hover:        #059669;
  --primary-active:       #047857;
  --primary-subtle:       rgba(16, 185, 129, 0.12);
  --primary-border:       rgba(16, 185, 129, 0.25);
  --primary-text:         #ffffff;

  --accent:               #34d399;
  --accent-hover:         #10b981;
  --accent-subtle:        rgba(52, 211, 153, 0.10);

  --focus-ring:           0 0 0 3px rgba(16, 185, 129, 0.35);
  --focus-ring-offset:    0 0 0 2px var(--background), 0 0 0 4px rgba(16, 185, 129, 0.35);

  --gradient-start:       #10b981;
  --gradient-end:         #0ea5e9;

  --selection-background: rgba(16, 185, 129, 0.18);
  --selection-text:       inherit;

  --nav-active-bg:        rgba(16, 185, 129, 0.12);
  --nav-active-text:      #10b981;
  --nav-active-border:    #10b981;

  --chart-primary:        #10b981;
  --chart-secondary:      #34d399;
  --chart-tertiary:       #6ee7b7;
  --chart-quaternary:     #d1fae5;

  --tab-active-color:     #10b981;
  --tab-active-border:    #10b981;

  --link-color:           #10b981;
  --link-hover:           #059669;
}

/* IMPORTANT: In Emerald mode, semantic --success tokens shift to teal-blue
   to maintain visual distinction between "action" (emerald) and "success state" (teal). */
[data-appearance="dark"][data-accent="emerald"],
[data-appearance="amoled"][data-accent="emerald"] {
  --success:              #06b6d4;
  --success-subtle:       rgba(6, 182, 212, 0.12);
  --success-border:       rgba(6, 182, 212, 0.25);
}

[data-appearance="light"][data-accent="emerald"] {
  --primary:              #059669;
  --primary-hover:        #047857;
  --primary-active:       #065f46;
  --primary-subtle:       rgba(5, 150, 105, 0.08);
  --primary-border:       rgba(5, 150, 105, 0.20);
  --accent:               #10b981;
  --accent-hover:         #059669;
  --accent-subtle:        rgba(16, 185, 129, 0.08);
  --focus-ring:           0 0 0 3px rgba(5, 150, 105, 0.25);
  --nav-active-bg:        rgba(5, 150, 105, 0.08);
  --nav-active-text:      #059669;
  --nav-active-border:    #059669;
  --chart-primary:        #059669;
  --chart-secondary:      #10b981;
  --link-color:           #059669;
  --link-hover:           #047857;
  --success:              #0891b2;
  --success-subtle:       #ecfeff;
  --success-border:       #a5f3fc;
}
```

---

### 3.4 Rose Palette
*Character: Expressive, modern, distinctive. Confident and energetic without being aggressive.*

```css
[data-accent="rose"] {
  --primary:              #f43f5e;
  --primary-hover:        #e11d48;
  --primary-active:       #be123c;
  --primary-subtle:       rgba(244, 63, 94, 0.12);
  --primary-border:       rgba(244, 63, 94, 0.25);
  --primary-text:         #ffffff;

  --accent:               #fb7185;
  --accent-hover:         #f43f5e;
  --accent-subtle:        rgba(251, 113, 133, 0.10);

  --focus-ring:           0 0 0 3px rgba(244, 63, 94, 0.35);
  --focus-ring-offset:    0 0 0 2px var(--background), 0 0 0 4px rgba(244, 63, 94, 0.35);

  --gradient-start:       #f43f5e;
  --gradient-end:         #8b5cf6;

  --selection-background: rgba(244, 63, 94, 0.18);
  --selection-text:       inherit;

  --nav-active-bg:        rgba(244, 63, 94, 0.12);
  --nav-active-text:      #f43f5e;
  --nav-active-border:    #f43f5e;

  --chart-primary:        #f43f5e;
  --chart-secondary:      #fb7185;
  --chart-tertiary:       #fda4af;
  --chart-quaternary:     #ffe4e6;

  --tab-active-color:     #f43f5e;
  --tab-active-border:    #f43f5e;

  --link-color:           #f43f5e;
  --link-hover:           #e11d48;
}

/* In Rose mode, semantic --danger shifts to orange to maintain clear distinction. */
[data-appearance="dark"][data-accent="rose"],
[data-appearance="amoled"][data-accent="rose"] {
  --danger:               #fb923c;
  --danger-subtle:        rgba(251, 146, 60, 0.12);
  --danger-border:        rgba(251, 146, 60, 0.25);
}

[data-appearance="light"][data-accent="rose"] {
  --primary:              #e11d48;
  --primary-hover:        #be123c;
  --primary-active:       #9f1239;
  --primary-subtle:       rgba(225, 29, 72, 0.08);
  --primary-border:       rgba(225, 29, 72, 0.20);
  --accent:               #f43f5e;
  --accent-hover:         #e11d48;
  --accent-subtle:        rgba(244, 63, 94, 0.08);
  --focus-ring:           0 0 0 3px rgba(225, 29, 72, 0.25);
  --nav-active-bg:        rgba(225, 29, 72, 0.08);
  --nav-active-text:      #e11d48;
  --nav-active-border:    #e11d48;
  --chart-primary:        #e11d48;
  --chart-secondary:      #f43f5e;
  --link-color:           #e11d48;
  --link-hover:           #9f1239;
  --danger:               #ea580c;
  --danger-subtle:        #fff7ed;
  --danger-border:        #fed7aa;
}
```

---

### 3.5 Amber Palette
*Character: Warm, energetic, accessible. Approachable and inviting without being casual.*

```css
[data-accent="amber"] {
  --primary:              #f59e0b;
  --primary-hover:        #d97706;
  --primary-active:       #b45309;
  --primary-subtle:       rgba(245, 158, 11, 0.12);
  --primary-border:       rgba(245, 158, 11, 0.25);
  --primary-text:         #1c1917;

  --accent:               #fbbf24;
  --accent-hover:         #f59e0b;
  --accent-subtle:        rgba(251, 191, 36, 0.10);

  --focus-ring:           0 0 0 3px rgba(245, 158, 11, 0.40);
  --focus-ring-offset:    0 0 0 2px var(--background), 0 0 0 4px rgba(245, 158, 11, 0.40);

  --gradient-start:       #f59e0b;
  --gradient-end:         #f43f5e;

  --selection-background: rgba(245, 158, 11, 0.20);
  --selection-text:       inherit;

  --nav-active-bg:        rgba(245, 158, 11, 0.12);
  --nav-active-text:      #f59e0b;
  --nav-active-border:    #f59e0b;

  --chart-primary:        #f59e0b;
  --chart-secondary:      #fbbf24;
  --chart-tertiary:       #fcd34d;
  --chart-quaternary:     #fef3c7;

  --tab-active-color:     #f59e0b;
  --tab-active-border:    #f59e0b;

  --link-color:           #fbbf24;
  --link-hover:           #f59e0b;
}

/* In Amber mode, semantic --warning shifts to orange-red to maintain distinction. */
[data-appearance="dark"][data-accent="amber"],
[data-appearance="amoled"][data-accent="amber"] {
  --warning:              #fb923c;
  --warning-subtle:       rgba(251, 146, 60, 0.12);
  --warning-border:       rgba(251, 146, 60, 0.25);
}

[data-appearance="light"][data-accent="amber"] {
  --primary:              #d97706;
  --primary-hover:        #b45309;
  --primary-active:       #92400e;
  --primary-subtle:       rgba(217, 119, 6, 0.08);
  --primary-border:       rgba(217, 119, 6, 0.20);
  --primary-text:         #ffffff;
  --accent:               #f59e0b;
  --accent-hover:         #d97706;
  --accent-subtle:        rgba(245, 158, 11, 0.08);
  --focus-ring:           0 0 0 3px rgba(217, 119, 6, 0.30);
  --nav-active-bg:        rgba(217, 119, 6, 0.08);
  --nav-active-text:      #d97706;
  --nav-active-border:    #d97706;
  --chart-primary:        #d97706;
  --chart-secondary:      #f59e0b;
  --link-color:           #d97706;
  --link-hover:           #92400e;
  --warning:              #dc2626;
  --warning-subtle:       #fef2f2;
  --warning-border:       #fecaca;
}
```

---

### 3.6 Cyan Palette
*Character: Technical, futuristic, precise. Inspired by engineering dashboards and developer tooling.*

```css
[data-accent="cyan"] {
  --primary:              #06b6d4;
  --primary-hover:        #0891b2;
  --primary-active:       #0e7490;
  --primary-subtle:       rgba(6, 182, 212, 0.12);
  --primary-border:       rgba(6, 182, 212, 0.25);
  --primary-text:         #ffffff;

  --accent:               #22d3ee;
  --accent-hover:         #06b6d4;
  --accent-subtle:        rgba(34, 211, 238, 0.10);

  --focus-ring:           0 0 0 3px rgba(6, 182, 212, 0.35);
  --focus-ring-offset:    0 0 0 2px var(--background), 0 0 0 4px rgba(6, 182, 212, 0.35);

  --gradient-start:       #06b6d4;
  --gradient-end:         #6366f1;

  --selection-background: rgba(6, 182, 212, 0.18);
  --selection-text:       inherit;

  --nav-active-bg:        rgba(6, 182, 212, 0.12);
  --nav-active-text:      #06b6d4;
  --nav-active-border:    #06b6d4;

  --chart-primary:        #06b6d4;
  --chart-secondary:      #22d3ee;
  --chart-tertiary:       #67e8f9;
  --chart-quaternary:     #cffafe;

  --tab-active-color:     #06b6d4;
  --tab-active-border:    #06b6d4;

  --link-color:           #06b6d4;
  --link-hover:           #0891b2;
}

/* In Cyan mode, semantic --info shifts to indigo/violet to maintain distinction. */
[data-appearance="dark"][data-accent="cyan"],
[data-appearance="amoled"][data-accent="cyan"] {
  --info:                 #818cf8;
  --info-subtle:          rgba(129, 140, 248, 0.12);
  --info-border:          rgba(129, 140, 248, 0.25);
}

[data-appearance="light"][data-accent="cyan"] {
  --primary:              #0891b2;
  --primary-hover:        #0e7490;
  --primary-active:       #155e75;
  --primary-subtle:       rgba(8, 145, 178, 0.08);
  --primary-border:       rgba(8, 145, 178, 0.20);
  --accent:               #06b6d4;
  --accent-hover:         #0891b2;
  --accent-subtle:        rgba(6, 182, 212, 0.08);
  --focus-ring:           0 0 0 3px rgba(8, 145, 178, 0.25);
  --nav-active-bg:        rgba(8, 145, 178, 0.08);
  --nav-active-text:      #0891b2;
  --nav-active-border:    #0891b2;
  --chart-primary:        #0891b2;
  --chart-secondary:      #06b6d4;
  --link-color:           #0891b2;
  --link-hover:           #155e75;
  --info:                 #6366f1;
  --info-subtle:          #eef2ff;
  --info-border:          #c7d2fe;
}
```

---

## SECTION 4 — SEMANTIC STATUS TOKEN OVERRIDE MATRIX

This table documents when and how semantic status tokens must shift to maintain visual distinction from the user's chosen accent color.

| Accent | Conflict Risk | Status Token Override | Override Scope |
| :--- | :--- | :--- | :--- |
| **Indigo** | None — no overlap with status semantics | None required | — |
| **Violet** | None — sufficiently distinct from green/yellow/red | None required | — |
| **Emerald** | `--primary` clashes with `--success` (both green) | `--success` shifts to `#06b6d4` (teal-blue) | Dark + AMOLED only |
| **Rose** | `--primary` clashes with `--danger` (both red-family) | `--danger` shifts to `#fb923c` (orange) | All appearances |
| **Amber** | `--primary` clashes with `--warning` (both amber-yellow) | `--warning` shifts to `#fb923c` (orange) | All appearances |
| **Cyan** | `--primary` overlaps visually with `--info` (both blue-teal) | `--info` shifts to `#818cf8` (indigo-violet) | All appearances |

---

## SECTION 5 — THEME SELECTOR UX SPECIFICATION

### 5.1 Desktop: Popover Panel
Triggered by clicking the theme button in the sticky header. A compact, keyboard-navigable popover panel appears anchored to the button.

```
+------------------------------------------+
| APPEARANCE                               |
| ○ Light     ● Dark    ○ AMOLED  ○ System |
|                                          |
| ACCENT COLOR                             |
| ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐           |
| │  │ │  │ │  │ │  │ │  │ │  │           |
| └──┘ └──┘ └──┘ └──┘ └──┘ └──┘           |
|  Indigo Violet Emerald Rose Amber  Cyan  |
|   ●      ○      ○     ○     ○      ○    |
|                                          |
| Current: Dark + Indigo   [Reset Default] |
+------------------------------------------+
```

**Behavior:**
* Popover appears immediately on click, no animation delay.
* Theme changes apply instantly while the popover is open.
* Clicking outside or pressing `Escape` closes the popover.
* Keyboard navigation: Arrow keys cycle through appearance options; Tab moves between appearance/accent groups.
* Color swatches are `32px × 32px` squares with `4px` radius, showing the `--primary` color of each palette.
* Selected accent has a checkmark overlay and `2px` ring matching its own color.
* Selected appearance has a filled radio indicator.
* "Reset Default" button restores `dark + indigo`.

**Popover placement:** Below and right-aligned to the theme trigger button. Flips above if insufficient viewport below.

### 5.2 Mobile: Bottom Sheet
Triggered by the theme icon in the compact top header (or via the Profile tab -> Settings shortcut).

```
+------------------------------------------+
|            ──────────                    |
|                                          |
| APPEARANCE                               |
| ┌─────────┐ ┌─────────┐                  |
| │  Light  │ │  Dark ● │                  |
| └─────────┘ └─────────┘                  |
| ┌─────────┐ ┌─────────┐                  |
| │  AMOLED │ │  System │                  |
| └─────────┘ └─────────┘                  |
|                                          |
| ACCENT COLOR                             |
| ┌──┐ ┌──┐ ┌──┐                           |
| │  │ │  │ │  │  Indigo  Violet  Emerald  |
| └──┘ └──┘ └──┘                           |
| ┌──┐ ┌──┐ ┌──┐                           |
| │  │ │  │ │  │  Rose    Amber    Cyan    |
| └──┘ └──┘ └──┘                           |
|                                          |
| [Reset to Default]                       |
|                                          |
+------------------------------------------+
```

**Behavior:**
* Slides up from bottom with `translateY` animation (200ms, `ease-out`).
* Dismiss: Swipe down or tap backdrop overlay.
* Appearance options rendered as large tap cards (min-height `56px`).
* Color swatches rendered in 3-per-row grid with `44px × 44px` swatches.
* Sheet height: `auto` with `max-height: 75dvh` and `overflow-y: auto` for very small screens.

### 5.3 Trigger Button Design

The theme toggle button in the header:
* Shows a `20px` filled circle in the current `--primary` color when a non-system accent is active.
* Shows a half-fill circle icon when `system` appearance is selected.
* Tooltip: `"Change Theme"` on desktop hover.
* `aria-label="Change Theme"` with expanded state `aria-expanded="true/false"`.

---

## SECTION 6 — LIVE PREVIEW BEHAVIOR

### 6.1 Token Propagation
Theme changes are applied by updating `data-appearance` and `data-accent` attributes on the root `<html>` element. The CSS cascade handles all visual updates instantly without JavaScript re-renders.

```javascript
// Theme engine core
function applyTheme(appearance, accent) {
  document.documentElement.setAttribute('data-appearance', appearance);
  document.documentElement.setAttribute('data-accent', accent);
}

// System preference listener
const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
function handleSystemChange() {
  if (getStoredAppearance() === 'system') {
    applyTheme('system', getStoredAccent());
    // CSS handles: @media (prefers-color-scheme: dark) { :root[data-appearance="system"] { ... } }
  }
}
systemQuery.addEventListener('change', handleSystemChange);
```

### 6.2 Elements That Must Update Immediately
When a user changes theme while viewing any screen, all of the following update within a **single paint frame**:

| Element | Token(s) Consumed |
| :--- | :--- |
| Page background | `--background` |
| Sidebar / nav rail | `--surface`, `--border`, `--nav-active-bg`, `--nav-active-text` |
| Active sidebar item | `--primary`, `--nav-active-bg` |
| Header / top bar | `--surface`, `--border` |
| All card surfaces | `--surface`, `--surface-elevated`, `--border` |
| All buttons (primary) | `--primary`, `--primary-hover`, `--primary-text` |
| All buttons (ghost) | `--text-secondary`, `--surface-hover` |
| All inputs | `--surface-elevated`, `--border`, `--focus-ring` (on focus) |
| Tab indicators | `--tab-active-color`, `--tab-active-border` |
| Progress bars & rings | `--primary` |
| Link colors | `--link-color`, `--link-hover` |
| Focus states | `--focus-ring` |
| Chart fills | `--chart-primary`, `--chart-secondary` |
| Mobile bottom nav active | `--primary`, `--nav-active-bg` |
| Badge text | Semantic tokens (`--success`, `--warning`, `--danger`) |
| Selection highlight | `--selection-background` |
| Text hierarchy | `--text-primary`, `--text-secondary`, `--text-muted` |

### 6.3 Flash of Unstyled Content Prevention
The theme preference must be applied **before first paint**. Use an inline `<script>` in the `<head>` (not deferred):

```javascript
// Executed synchronously before DOM paint
(function() {
  var prefs = JSON.parse(localStorage.getItem('skilltracker_theme') || '{}');
  var appearance = prefs.appearance || 'dark';
  var accent = prefs.accent || 'indigo';
  if (appearance === 'system') {
    appearance = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-appearance', appearance);
  document.documentElement.setAttribute('data-accent', accent);
})();
```

---

## SECTION 7 — PERSISTENCE SPECIFICATION

### 7.1 Storage Key & Schema

```json
// localStorage key: "skilltracker_theme"
{
  "appearance": "dark",
  "accent": "indigo"
}
```

Valid values:
* `appearance`: `"light"` | `"dark"` | `"amoled"` | `"system"`
* `accent`: `"indigo"` | `"violet"` | `"emerald"` | `"rose"` | `"amber"` | `"cyan"`

Default value (when key is absent or malformed):
```json
{ "appearance": "dark", "accent": "indigo" }
```

### 7.2 Rules
1. Only theme preference data is stored in `localStorage`. No academic data, no PII, no session tokens.
2. If stored values are invalid (malformed JSON, unrecognized values), silently fall back to defaults.
3. The theme preference is stored client-side only. It is not synced to the server or user account profile.
4. Clearing site data (`localStorage.clear()`) gracefully falls back to `dark + indigo` without errors.

---

## SECTION 8 — SETTINGS PAGE INTEGRATION

The `/student/settings` page includes a dedicated **Appearance** section:

```
+--------------------------------------------------------+
| APPEARANCE                                              |
|                                                         |
| Mode           Accent Color                             |
| ● Dark         ● Indigo  ○ Violet  ○ Emerald           |
| ○ Light        ○ Rose    ○ Amber   ○ Cyan              |
| ○ AMOLED                                               |
| ○ System                                               |
|                                                         |
| Preview of current theme:                               |
| ┌──────────────────────────────────┐                    |
| │  [Button]   [Button Ghost]       │                    |
| │  Success  Warning  Error  Info   │                    |
| │  [──────── Progress Bar ─────]   │                    |
| └──────────────────────────────────┘                    |
|                                                         |
| Current: Dark + Indigo                                  |
| [Reset to Default]                                      |
+--------------------------------------------------------+
```

The mini-preview refreshes instantly as the user changes selections, providing an additional confirmation without requiring navigation to another page.

---

## SECTION 9 — ACCESSIBILITY REQUIREMENTS

### 9.1 Contrast Ratios (All Combinations Must Pass)

All 24 theme combinations must meet minimum contrast ratios:

| Element Pair | Minimum Ratio (WCAG 2.1 AA) |
| :--- | :--- |
| `--text-primary` on `--background` | 7:1 (AAA recommended) |
| `--text-primary` on `--surface` | 4.5:1 |
| `--text-secondary` on `--surface` | 4.5:1 |
| `--primary-text` on `--primary` (buttons) | 4.5:1 |
| `--text-muted` on `--surface` | 3:1 (for non-body text) |
| Link (`--link-color`) on `--background` | 4.5:1 |
| Status text on status-subtle background | 4.5:1 |

**Specific combination checks required during QA:**
* Amber on Light: `--primary` (`#d97706`) on `--background` (`#f8fafc`) — must pass 4.5:1.
* Amber Dark: Primary button label (`--primary-text`) on `--primary` (`#f59e0b`) — must pass 4.5:1 (use `#1c1917` text, not white).
* Rose Light: `--primary` (`#e11d48`) on `--surface` (`#ffffff`) — passes.
* Cyan AMOLED: `--primary` (`#06b6d4`) on `--background` (`#000000`) — must pass.

### 9.2 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }

  /* Theme popover/sheet: appears instantly instead of animating */
  .theme-popover,
  .theme-sheet {
    animation: none;
    transition: none;
  }
}
```

### 9.3 Color is Not the Sole Differentiator
* Status badges include text labels (`"Pending"`, `"Past Due"`, `"Solved"`) in addition to background color.
* Error states include `aria-describedby` linking to error message text.
* Focus states are indicated by both `--focus-ring` (color) and `outline-offset` (non-color visual change).
* Active navigation items are indicated by both color (`--nav-active-text`) and font-weight change.

---

## SECTION 10 — COMPONENT AUDIT CHECKLIST

Every component in the inventory below must be verified to consume only CSS tokens, contain zero hardcoded colors, and render correctly across all 24 theme combinations:

| Component | Tokens Required |
| :--- | :--- |
| `<Sidebar>` | `--surface`, `--border`, `--nav-active-bg`, `--nav-active-text`, `--nav-active-border`, `--text-primary`, `--text-secondary`, `--text-muted` |
| `<Header>` | `--surface`, `--border`, `--text-primary`, `--text-secondary` |
| `<BottomNav>` | `--surface`, `--border`, `--primary`, `--nav-active-bg`, `--text-primary`, `--text-muted` |
| `<Button primary>` | `--primary`, `--primary-hover`, `--primary-active`, `--primary-text` |
| `<Button ghost>` | `--surface-hover`, `--text-secondary`, `--border` |
| `<Button danger>` | `--danger`, `--danger-subtle`, `--danger-border` |
| `<Input>` | `--surface-elevated`, `--border`, `--border-strong`, `--text-primary`, `--text-muted`, `--focus-ring` |
| `<Card>` | `--surface`, `--surface-elevated`, `--border`, `--shadow-sm` |
| `<Badge success>` | `--success`, `--success-subtle`, `--success-border` |
| `<Badge warning>` | `--warning`, `--warning-subtle`, `--warning-border` |
| `<Badge danger>` | `--danger`, `--danger-subtle`, `--danger-border` |
| `<Badge info>` | `--info`, `--info-subtle`, `--info-border` |
| `<ProgressBar>` | `--primary`, `--surface-elevated` |
| `<ProgressRing>` | `--primary`, `--surface-elevated` |
| `<Tab active>` | `--tab-active-color`, `--tab-active-border` |
| `<Tab inactive>` | `--text-muted`, `--surface-hover` |
| `<Modal>` | `--surface`, `--surface-elevated`, `--border`, `--shadow-xl` |
| `<BottomSheet>` | `--surface`, `--border`, `--shadow-xl` |
| `<Toast success>` | `--success`, `--success-subtle`, `--success-border` |
| `<Toast error>` | `--danger`, `--danger-subtle`, `--danger-border` |
| `<Dropdown>` | `--surface-elevated`, `--border`, `--surface-hover`, `--text-primary` |
| `<Tooltip>` | `--surface-elevated`, `--border`, `--text-primary`, `--shadow-md` |
| `<Skeleton>` | `--skeleton-base`, `--skeleton-shimmer` |
| `<Chart>` | `--chart-primary`, `--chart-secondary`, `--chart-tertiary`, `--chart-quaternary` |
| `<LoginScreen>` | All base surface tokens + `--primary`, `--focus-ring` |
| `<QuizEngine>` | All base surface tokens + `--primary`, `--success`, `--warning` |
| `<Leaderboard>` | All base surface tokens + `--primary`, `--success`, `--warning`, `--chart-*` |
| `<ThemeSelector>` | All tokens (must render correctly in current theme while allowing preview of others) |

---

## SECTION 11 — FUTURE SCALABILITY

The theme architecture is designed to accept additional palettes without modifying any existing components. Adding a new accent palette (e.g., `"teal"` or `"pink"`) requires only:

1. Adding a new `[data-accent="teal"]` CSS block with all required tokens.
2. Adding a `[data-appearance="light"][data-accent="teal"]` override block.
3. Adding the swatch and label to the `ThemeSelector` component.
4. Adding `"teal"` to the valid values list for `localStorage` serialization.

**No component changes are required.** The component system is permanently insulated from palette additions.

---

## SECTION 12 — THEME QUALITY VALIDATION MATRIX

QA must validate all 24 combinations against this checklist:

| Test | Description | Pass Criteria |
| :--- | :--- | :--- |
| **T-01** | Background renders correctly | No white flash on page load |
| **T-02** | Primary button contrast | Button label passes 4.5:1 contrast |
| **T-03** | Link readability | Links visible at 4.5:1 on background |
| **T-04** | Focus ring visible | Focus ring is clearly visible on keyboard navigation |
| **T-05** | Status token integrity | Success/Warning/Danger are visually distinct from primary |
| **T-06** | Text hierarchy | Primary > Secondary > Muted text contrast gradient maintained |
| **T-07** | Card surface visible | Cards are distinguishable from page background |
| **T-08** | Sidebar active state | Active item clearly highlighted vs inactive items |
| **T-09** | Mobile nav active state | Active bottom nav tab distinguishable on all palettes |
| **T-10** | Chart legibility | Chart colors are distinct from each other and from background |
| **T-11** | Skeleton animation | Shimmer animation visible and smooth |
| **T-12** | Input focus state | Focus ring visible on all inputs |
| **T-13** | System mode responds | Changing OS preference updates `system` mode in real time |
| **T-14** | Persistence on reload | Theme survives full browser reload and new tab |
| **T-15** | Default restore | "Reset to Default" correctly restores `dark + indigo` |
| **T-16** | Reduced motion respected | Animations suppressed when `prefers-reduced-motion: reduce` |
| **T-17** | Zero horizontal overflow | Theme panel/sheet never causes overflow at 320px |
| **T-18** | Popover closes on Escape | Keyboard accessibility for theme popover |

---

## APPENDIX — COMBINED TOKEN REFERENCE

Quick reference showing which layer defines which token:

| Token | Defined By | Notes |
| :--- | :--- | :--- |
| `--background` | Appearance | |
| `--background-alt` | Appearance | |
| `--surface` | Appearance | |
| `--surface-elevated` | Appearance | |
| `--surface-hover` | Appearance | |
| `--surface-active` | Appearance | |
| `--surface-overlay` | Appearance | For modals / sheets |
| `--border` | Appearance | |
| `--border-subtle` | Appearance | |
| `--border-strong` | Appearance | |
| `--text-primary` | Appearance | |
| `--text-secondary` | Appearance | |
| `--text-muted` | Appearance | |
| `--text-disabled` | Appearance | |
| `--text-inverse` | Appearance | For colored button text |
| `--shadow-sm/md/lg/xl` | Appearance | |
| `--scrollbar-*` | Appearance | |
| `--skeleton-base/shimmer` | Appearance | |
| `--success` | Appearance (overrideable) | Overridden in Emerald accent |
| `--success-subtle/border` | Appearance (overrideable) | |
| `--warning` | Appearance (overrideable) | Overridden in Amber accent |
| `--warning-subtle/border` | Appearance (overrideable) | |
| `--danger` | Appearance (overrideable) | Overridden in Rose accent |
| `--danger-subtle/border` | Appearance (overrideable) | |
| `--info` | Appearance (overrideable) | Overridden in Cyan accent |
| `--info-subtle/border` | Appearance (overrideable) | |
| `--primary` | Accent | |
| `--primary-hover` | Accent | |
| `--primary-active` | Accent | |
| `--primary-subtle` | Accent | |
| `--primary-border` | Accent | |
| `--primary-text` | Accent | Text color on primary backgrounds |
| `--accent` | Accent | Secondary highlight tone |
| `--accent-hover` | Accent | |
| `--accent-subtle` | Accent | |
| `--focus-ring` | Accent | Full box-shadow shorthand |
| `--focus-ring-offset` | Accent | For elevated backgrounds |
| `--gradient-start/end` | Accent | |
| `--selection-background` | Accent | `::selection` pseudo-element |
| `--selection-text` | Accent | |
| `--nav-active-bg` | Accent | |
| `--nav-active-text` | Accent | |
| `--nav-active-border` | Accent | |
| `--chart-primary/secondary/tertiary/quaternary` | Accent | |
| `--tab-active-color/border` | Accent | |
| `--link-color` | Accent | |
| `--link-hover` | Accent | |

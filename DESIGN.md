# SkillTracker Student Portal — Design System Guide (DESIGN)

## 1. Design Philosophy: Anthropic Off-White Warmth & Apple Liquid Glass

SkillTracker implements Anthropic's signature **off-white warm editorial aesthetic** paired with **Apple's floating liquid glassmorphism**:
- **Warm Alabaster & Cream Canvas**: The foundation is Anthropic's trademark warm off-white (`#faf9f5`), preventing harsh glare and offering an academic, bookish feel.
- **Crisp Paper-White Surfaces**: High-emphasis interactive cards use pristine white (`#ffffff`) with hairline warm sand borders (`#e6e3da`).
- **Signature Anthropic Terracotta**: Deep earthen terracotta (`#d97757` and `#c15f3e`) acts as the focal accent for active indicators, primary CTA actions, and streak metrics.
- **High-Contrast Deep Ink Typography**: Deep warm espresso text (`#1a1918` and `#242220`) set in Plus Jakarta Sans at generous, readable sizes (14px–36px).
- **Floating Apple Liquid Glass**: The mobile navigation bar floats gracefully above the screen bottom, wrapped in a high-saturate frosted glass capsule with fluid `framer-motion` spring physics.

---

## 2. Color Palette Specification

### 2.1 Surfaces & Backgrounds
| Token | Hex Value | Semantic Usage |
|---|---|---|
| `canvas-bg` | `#faf9f5` | Main app background, warm alabaster cream |
| `canvas-card` | `#ffffff` | Primary elevated cards, modals, sheets |
| `canvas-subtle` | `#f4f2eb` | Secondary surfaces, input backgrounds, chip buttons |
| `canvas-hover` | `#edeae2` | Interactive button hover states |
| `canvas-border` | `#e6e3da` | Hairline card borders and dividers |
| `canvas-border-strong` | `#d9d5c9` | Outer geometry accents |

### 2.2 Brand & Status Accents
| Token | Hex Value | Semantic Usage |
|---|---|---|
| `clay-500` (Primary) | `#d97757` | Primary buttons, active liquid tab pill, flame streaks |
| `clay-600` (Hover) | `#c15f3e` | Primary button hover / active state |
| `clay-100` (Subtle) | `rgba(217, 119, 87, 0.09)` | Pill glow, active badge backgrounds |
| `sage-500` (Success) | `#3e7b54` | Verified marks, passing scores, online status |
| `amber-500` (Warning) | `#b87728` | Imminent lab deadlines (<24h), pending reviews |
| `crimson-500` (Alert) | `#ba3c3c` | Overdue assignments, error badges |

### 2.3 Typography & Foreground
| Token | Hex Value | Semantic Usage |
|---|---|---|
| `ink-950` | `#1a1918` | Primary headings, titles, high-emphasis metrics |
| `ink-900` | `#242220` | Secondary headings, card titles |
| `ink-700` | `#4f4c46` | Body text, question statements, explanations |
| `ink-500` | `#78756c` | Meta labels, timestamps, subtitles |
| `ink-400` | `#9e9a90` | Placeholder text, disabled hints |

---

## 3. Typographic Hierarchy (Generous Scale)

All font sizes have been scaled up for optimal legibility across mobile and desktop devices:
- **Display 1 (Main Metric / Hero)**: `36px – 40px` (`text-3xl sm:text-4xl`), font-black
- **Heading 1 (Page Titles)**: `24px – 28px` (`text-xl sm:text-2xl`), font-black
- **Heading 2 (Card / Section Titles)**: `18px – 20px` (`text-base sm:text-lg`), font-bold
- **Heading 3 (Component Headers)**: `15px – 16px` (`text-sm sm:text-base`), font-bold
- **Body Regular**: `14px – 15px` (`text-xs sm:text-sm`), font-normal, line-height `1.6`
- **Badges & Meta**: `12px – 13px` (`text-xs`), font-semibold

---

## 4. Mobile Navigation: Apple Floating Liquid Glass

```
┌─────────────────────────────────────────────────────────────┐
│  SkillTracker         [ B.Tech 5A ]        🔔(3)    [ Avatar ]│  <- Top Liquid Bar
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    SCROLLABLE VIEW CANVAS                   │
│                                                             │
│                                                             │
│       ╭─────────────────────────────────────────────╮       │
│       │   [ 🏠 ]     [ 💻 ]   [ 🧪 ]   [ 🏆 ]   [ 👤 ]   │       │  <- Floating Island
│       │    Home     Practice   Labs    Ranks   Profile│     │  <- Liquid Glass
│       ╰─────────────────────────────────────────────╯       │
└─────────────────────────────────────────────────────────────┘
```

### 4.1 Liquid Glass Characteristics:
1. **Floating Island Geometry**:
   - Detached from the bottom edge (`fixed bottom-4 left-3 right-3 max-w-md mx-auto`).
   - Pill-shaped capsule (`rounded-full px-2 py-1.5`).
2. **Apple Liquid Optical Refraction**:
   ```css
   background: rgba(255, 255, 255, 0.78);
   backdrop-filter: blur(28px) saturate(200%);
   border: 1px solid rgba(255, 255, 255, 0.85);
   box-shadow: 
     0 20px 48px -6px rgba(31, 30, 29, 0.12),
     0 4px 16px -2px rgba(31, 30, 29, 0.05),
     inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95);
   ```
3. **Framer Motion Spring Physics**:
   - Sliding active capsule pill with `layoutId="liquidTabPill"` (`stiffness: 450, damping: 35`).
   - Micro-bounce on touch (`whileTap={{ scale: 0.85 }}`).
   - Tactile vibration: `navigator.vibrate?.(12)`.
4. **Safe-Area Geometry**:
   - Main content container uses `pb-28 lg:pb-12` ensuring full visibility above the floating island.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**SkillSwipe** — a mobile-first React demo app built for the Liberec Ideathon 2026. It simulates a school-integrated talent pipeline platform for students aged 13–18, presented as a phone-sized UI prototype.

## Commands

```bash
npm run dev       # Start Vite dev server (hot reload)
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
```

No test runner is configured.

## Architecture

Single-page React app using Vite + Tailwind CSS. No router — navigation is handled by `activeTab` state in `App.jsx`, which swaps between five full-screen components.

**Screen flow (tab order):**
- `RoadmapScreen` — 3-stage timeline + XP/streak gamification ("Journey" tab)
- `SwipeScreen` — Tinder-style vocational scenario cards ("Discover" tab)
- `BridgeScreen` — University/vocational pathway matching with percentages ("Connect" tab)
- `FAQScreen` — Static FAQ ("FAQ" tab)
- `ImpactScreen` — Teacher/sponsor dashboard with class analytics ("Impact" tab)

Each screen receives `onNavigate`, `globalXp`, and `globalStreak` props from `App.jsx`. XP and streak are demo state held in `App.jsx` (not persisted).

## Styling

- All theming uses **CSS custom properties** defined in `src/index.css` (e.g. `--primary`, `--background`, `--card`). Always use these variables rather than hardcoded colors.
- Dark mode is class-based (`darkMode: 'class'` in Tailwind). The `.dark`, `.high-contrast`, `.font-dyslexic`, `.text-size-*`, and `.filter-*` classes are applied to `<html>` by `App.jsx` via `useEffect`.
- The app is constrained to `max-w-[448px]` to simulate a phone frame on desktop.
- Font: Montserrat (Google Fonts, loaded in `index.html`).

## Accessibility

The accessibility panel (Settings modal in `App.jsx`) controls: dark mode, high contrast, dyslexic font, font size (normal/large/xlarge), and colorblindness filters. All these map to CSS classes on `<html>` — adding new accessibility modes means adding a CSS class in `index.css` and a toggle in the modal.

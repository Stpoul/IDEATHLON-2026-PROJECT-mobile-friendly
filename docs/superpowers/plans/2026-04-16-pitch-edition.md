# SkillSwipe Pitch Edition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four "Pitch Edition" polish layers: dyslexic-font CSS specificity fix, SVG colorblind vision matrices with modal controls, an `ageGroup` demo toggle, a Rewards modal with achievements + regional perks, and a gated Scholarship banner on BridgeScreen.

**Architecture:** Pure logic is extracted into `src/lib/achievements.js` (tested with Vitest). UI state for `ageGroup` and `onAddXp` lives in `App.jsx` and flows down as props — no new context layer needed. The hidden SVG `<defs>` block (colorblind matrices) is rendered once in `App.jsx` at `z-index: -1` so CSS `filter: url(#id)` classes work globally. The Rewards modal uses `fixed inset-0` so it overlays the phone frame correctly on both mobile and desktop.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Lucide React, Vitest (existing)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/index.css` | Add `.font-dyslexic *` rule to fix child-element specificity |
| Create | `src/lib/achievements.js` | `ACHIEVEMENTS` data array + `getEarnedAchievements(xp)` pure fn |
| Create | `src/lib/achievements.test.js` | Vitest unit tests for achievements module |
| Modify | `src/i18n.js` | Add EN/CZ keys for colorblind, ageGroup, rewards, scholarship |
| Modify | `src/App.jsx` | Hidden SVG matrices; colorblind + ageGroup modal sections; `onAddXp` handler; pass new props |
| Modify | `src/screens/RoadmapScreen.jsx` | Rewards modal (achievements + perks) + +100 XP demo button |
| Modify | `src/screens/BridgeScreen.jsx` | Scholarship banner gated on `ageGroup === '16plus'` |

---

## Task 0: Fix dyslexic font specificity in `src/index.css`

**Files:**
- Modify: `src/index.css:49`

The current rule `.font-dyslexic { font-family: ... }` only applies to the root element. Tailwind utility classes on descendant elements win by specificity. Adding `.font-dyslexic *` forces inheritance everywhere.

- [ ] **Step 1: Open `src/index.css` and replace line 49**

Find:
```css
.font-dyslexic { font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif !important; }
```

Replace with:
```css
.font-dyslexic,
.font-dyslexic * { font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif !important; }
```

- [ ] **Step 2: Verify visually**

Run `npm run dev`. Toggle Dyslexic Font in the Settings modal. Confirm that button text, card text, and all descendant elements switch font — not just the top-level container.

- [ ] **Step 3: Commit**

```bash
cd "/Users/test/Desktop/IDEATHLON 2026 PROJECT copy"
git add src/index.css
git commit -m "fix: extend .font-dyslexic specificity to all descendant elements"
```

---

## Task 1: Create `src/lib/achievements.js`

**Files:**
- Create: `src/lib/achievements.js`
- Create: `src/lib/achievements.test.js`

- [ ] **Step 1: Write the failing tests**

Create `src/lib/achievements.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { getEarnedAchievements, ACHIEVEMENTS } from './achievements';

describe('ACHIEVEMENTS data', () => {
  it('has exactly 5 entries', () => {
    expect(ACHIEVEMENTS).toHaveLength(5);
  });

  it('each entry has id, emoji, xpRequired, titleKey, descKey', () => {
    ACHIEVEMENTS.forEach(a => {
      expect(a).toHaveProperty('id');
      expect(a).toHaveProperty('emoji');
      expect(a).toHaveProperty('xpRequired');
      expect(a).toHaveProperty('titleKey');
      expect(a).toHaveProperty('descKey');
    });
  });

  it('xpRequired values are sorted ascending', () => {
    const reqs = ACHIEVEMENTS.map(a => a.xpRequired);
    expect(reqs).toEqual([...reqs].sort((a, b) => a - b));
  });
});

describe('getEarnedAchievements()', () => {
  it('returns first_swipe at 0 XP', () => {
    const earned = getEarnedAchievements(0);
    expect(earned.map(a => a.id)).toContain('first_swipe');
  });

  it('returns exactly 1 achievement at 50 XP', () => {
    expect(getEarnedAchievements(50)).toHaveLength(1);
  });

  it('includes chick_stage at exactly 200 XP', () => {
    expect(getEarnedAchievements(200).map(a => a.id)).toContain('chick_stage');
  });

  it('does NOT include chick_stage at 199 XP', () => {
    expect(getEarnedAchievements(199).map(a => a.id)).not.toContain('chick_stage');
  });

  it('returns all 5 achievements at 600 XP', () => {
    expect(getEarnedAchievements(600)).toHaveLength(5);
  });

  it('returns all 5 achievements above 600 XP', () => {
    expect(getEarnedAchievements(999)).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd "/Users/test/Desktop/IDEATHLON 2026 PROJECT copy" && npm test 2>&1 | tail -8
```

Expected: `1 failed | 2 passed` (matchEngine and i18n still pass; achievements fails).

- [ ] **Step 3: Create `src/lib/achievements.js`**

```js
export const ACHIEVEMENTS = [
  { id: 'first_swipe', emoji: '👆', xpRequired: 0,   titleKey: 'ach_first_swipe', descKey: 'ach_first_swipe_desc' },
  { id: 'chick_stage', emoji: '🐥', xpRequired: 200, titleKey: 'ach_chick',       descKey: 'ach_chick_desc'       },
  { id: 'halfway',     emoji: '🌟', xpRequired: 300, titleKey: 'ach_halfway',     descKey: 'ach_halfway_desc'     },
  { id: 'fledgling',   emoji: '🐦', xpRequired: 400, titleKey: 'ach_fledgling',   descKey: 'ach_fledgling_desc'   },
  { id: 'champion',    emoji: '⭐', xpRequired: 600, titleKey: 'ach_champion',    descKey: 'ach_champion_desc'    },
];

export function getEarnedAchievements(xp) {
  return ACHIEVEMENTS.filter(a => xp >= a.xpRequired);
}
```

- [ ] **Step 4: Run tests — verify all pass**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed` test files, `18 passed` tests total.

- [ ] **Step 5: Commit**

```bash
git add src/lib/achievements.js src/lib/achievements.test.js
git commit -m "feat: add achievements module with getEarnedAchievements pure function"
```

---

## Task 2: Add i18n keys to `src/i18n.js`

**Files:**
- Modify: `src/i18n.js`

No new tests needed — `t()` already has full coverage and the dictionary is pure data.

- [ ] **Step 1: Add keys to the English (`en`) block**

Open `src/i18n.js`. Find the line `faq_delete_data: 'Request Data Deletion',` (near end of the `en` block) and insert the following block **after** it, before the closing `},` of the `en` object:

```js
    // Colorblind mode
    settings_colorblind: 'Colorblind Mode',
    cb_none: 'Off',
    cb_protanopia: 'Prot.',
    cb_deuteranopia: 'Deut.',
    cb_tritanopia: 'Trit.',
    cb_achromatopsia: 'Achrom.',
    // Age group demo
    settings_age_group: 'Demo: Age Group',
    age_under16: 'Under 16',
    age_16plus: '16+',
    // Rewards modal
    rewards_btn: 'Rewards',
    rewards_xp_demo: '+100 XP (Demo)',
    rewards_title: 'Your Rewards',
    rewards_achievements: 'Achievements',
    rewards_perks: 'Regional Perks',
    // Achievements
    ach_first_swipe: 'First Steps',
    ach_first_swipe_desc: 'Started your journey',
    ach_chick: 'Growing!',
    ach_chick_desc: 'Reached 200 XP',
    ach_halfway: 'Halfway There!',
    ach_halfway_desc: 'Reached 300 XP',
    ach_fledgling: 'Taking Flight',
    ach_fledgling_desc: 'Reached 400 XP',
    ach_champion: 'Champion!',
    ach_champion_desc: 'Fully evolved at 600 XP',
    // Regional perks
    perk_museum: 'Liberec Museum',
    perk_museum_desc: 'Free entry with SkillSwipe profile',
    perk_pool: 'Aquacentrum Liberec',
    perk_pool_desc: '50% off for top achievers',
    perk_mentor: 'Industry Mentor',
    perk_mentor_desc: 'Get matched with a regional professional',
    // BridgeScreen scholarship banner
    bridge_scholarship_title: 'Premium Scholarship Matches',
    bridge_scholarship_desc: 'As a 16+ user, you qualify for regional scholarship matching.',
    bridge_scholarship_cta: 'Explore Scholarships',
```

- [ ] **Step 2: Add keys to the Czech (`cz`) block**

Find `faq_delete_data: 'Žádat o smazání dat',` (near end of the `cz` block) and insert **after** it:

```js
    // Colorblind mode
    settings_colorblind: 'Barvoslepost',
    cb_none: 'Vyp.',
    cb_protanopia: 'Prot.',
    cb_deuteranopia: 'Deut.',
    cb_tritanopia: 'Trit.',
    cb_achromatopsia: 'Achrom.',
    // Age group demo
    settings_age_group: 'Demo: Věková skupina',
    age_under16: 'Pod 16',
    age_16plus: '16+',
    // Rewards modal
    rewards_btn: 'Odměny',
    rewards_xp_demo: '+100 XP (Demo)',
    rewards_title: 'Vaše odměny',
    rewards_achievements: 'Úspěchy',
    rewards_perks: 'Regionální výhody',
    // Achievements
    ach_first_swipe: 'První kroky',
    ach_first_swipe_desc: 'Zahájil/a jsi svou cestu',
    ach_chick: 'Rosteš!',
    ach_chick_desc: 'Dosáhl/a 200 XP',
    ach_halfway: 'V půli cesty!',
    ach_halfway_desc: 'Dosáhl/a 300 XP',
    ach_fledgling: 'Vzlétáš',
    ach_fledgling_desc: 'Dosáhl/a 400 XP',
    ach_champion: 'Šampión!',
    ach_champion_desc: 'Plně vyvinutý/á na 600 XP',
    // Regional perks
    perk_museum: 'Liberecké muzeum',
    perk_museum_desc: 'Vstup zdarma s profilem SkillSwipe',
    perk_pool: 'Aquacentrum Liberec',
    perk_pool_desc: '50% sleva pro nejlepší studenty',
    perk_mentor: 'Průmyslový mentor',
    perk_mentor_desc: 'Párování s regionálním odborníkem',
    // BridgeScreen scholarship banner
    bridge_scholarship_title: 'Prémiové stipendijní shody',
    bridge_scholarship_desc: 'Jako uživatel 16+ máš nárok na regionální stipendijní párování.',
    bridge_scholarship_cta: 'Prozkoumat stipendia',
```

- [ ] **Step 3: Run tests — all should still pass**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed`, `18 passed`.

- [ ] **Step 4: Commit**

```bash
git add src/i18n.js
git commit -m "feat: add i18n keys for colorblind, ageGroup, rewards, scholarship"
```

---

## Task 3: Update `src/App.jsx`

**Files:**
- Modify: `src/App.jsx`

Adds: hidden SVG colorblind filter matrices; `ageGroup` state; `onAddXp` callback; Colorblind Mode section in modal; Age Group demo section in modal; passes `ageGroup` + `onAddXp` to screens.

- [ ] **Step 1: Replace `src/App.jsx` with the full updated version**

```jsx
import { useState, useEffect } from 'react';
import { Map, Layers, Users, MessageCircle, BarChart2, Moon, Sun, X, RotateCcw } from 'lucide-react';
import { t } from './i18n';

import RoadmapScreen from './screens/RoadmapScreen';
import SwipeScreen from './screens/SwipeScreen';
import BridgeScreen from './screens/BridgeScreen';
import FAQScreen from './screens/FAQScreen';
import ImpactScreen from './screens/ImpactScreen';

const TABS = [
  { id: 'roadmap', key: 'tab_journey',  Icon: Map,           Screen: RoadmapScreen },
  { id: 'swipe',   key: 'tab_discover', Icon: Layers,        Screen: SwipeScreen   },
  { id: 'bridge',  key: 'tab_connect',  Icon: Users,         Screen: BridgeScreen  },
  { id: 'faq',     key: 'tab_faq',      Icon: MessageCircle, Screen: FAQScreen     },
  { id: 'impact',  key: 'tab_impact',   Icon: BarChart2,     Screen: ImpactScreen  },
];

const CB_OPTIONS = [
  { value: 'none',          labelKey: 'cb_none'          },
  { value: 'protanopia',    labelKey: 'cb_protanopia'    },
  { value: 'deuteranopia',  labelKey: 'cb_deuteranopia'  },
  { value: 'tritanopia',    labelKey: 'cb_tritanopia'    },
  { value: 'achromatopsia', labelKey: 'cb_achromatopsia' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [showAccess, setShowAccess] = useState(false);

  // Gamification
  const [xp, setXp] = useState(340);
  const [streak, setStreak] = useState(5);

  // EU Winner Edition state
  const [language, setLanguage] = useState('en');
  const [hasConsent, setHasConsent] = useState(null);
  const [swipeResults, setSwipeResults] = useState({});
  const [ageGroup, setAgeGroup] = useState('under16');

  // Accessibility
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexic, setDyslexic] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [cb, setCb] = useState('none');

  const handleSwipeResult = (category, liked) => {
    setSwipeResults(prev => {
      const cur = prev[category] ?? { liked: 0, total: 0 };
      return { ...prev, [category]: { liked: cur.liked + (liked ? 1 : 0), total: cur.total + 1 } };
    });
  };

  const handleAddXp = () => setXp(prev => Math.min(prev + 100, 999));

  const { Screen: ActiveScreen } = TABS.find(tab => tab.id === activeTab);

  useEffect(() => {
    const classes = [
      darkMode ? 'dark' : '',
      highContrast ? 'high-contrast' : '',
      dyslexic ? 'font-dyslexic' : '',
      cb !== 'none' ? `filter-${cb}` : '',
      `text-size-${textSize}`,
    ].filter(Boolean);
    document.documentElement.className = classes.join(' ');
  }, [darkMode, highContrast, dyslexic, textSize, cb]);

  return (
    <>
      {/* SVG colorblind filter matrices — hidden, referenced by CSS filter-* classes */}
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0" />
          </filter>
          <filter id="achromatopsia">
            <feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>

      <div className="bg-slate-200 flex items-center justify-center min-h-[100dvh]">
        <div className="relative w-full max-w-[448px] h-[100dvh] md:h-[90vh] md:max-h-[800px] mx-auto flex flex-col overflow-hidden bg-[var(--background)] shadow-2xl md:rounded-[40px] text-[var(--foreground)] transition-all">

          {/* Floating Controls */}
          <div className="absolute top-4 left-4 right-4 z-50 flex justify-between">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-white/90 dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700"
            >
              {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-slate-600" />}
            </button>
            <button
              onClick={() => setShowAccess(true)}
              className="p-3 bg-[var(--primary)] text-white rounded-full shadow-lg"
            >
              <UniversalAccessIcon />
            </button>
          </div>

          {/* Accessibility Modal */}
          {showAccess && (
            <div className="absolute inset-0 bg-black/50 z-[100] flex items-end justify-center backdrop-blur-sm">
              <div className="bg-[var(--card)] w-full p-6 rounded-t-[30px] shadow-2xl max-h-[85%] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{t(language, 'settings')}</h2>
                  <button onClick={() => setShowAccess(false)} className="p-2"><X /></button>
                </div>

                {/* Visual toggles */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`p-4 rounded-xl border-2 font-bold text-xs ${highContrast ? 'bg-[var(--primary)] text-white' : ''}`}
                  >
                    {t(language, 'high_contrast')}
                  </button>
                  <button
                    onClick={() => setDyslexic(!dyslexic)}
                    className={`p-4 rounded-xl border-2 font-bold text-xs ${dyslexic ? 'bg-[var(--primary)] text-white' : ''}`}
                  >
                    {t(language, 'dyslexic_font')}
                  </button>
                </div>

                {/* Font size */}
                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'font_size')}</h3>
                  <div className="flex gap-2">
                    {[
                      { key: 'normal', label: 'font_size_normal' },
                      { key: 'large',  label: 'font_size_large'  },
                      { key: 'xlarge', label: 'font_size_xlarge' },
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setTextSize(key)}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs ${textSize === key ? 'bg-[var(--primary)] text-white' : ''}`}
                      >
                        {t(language, label)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colorblind Mode */}
                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'settings_colorblind')}</h3>
                  <div className="flex gap-1.5 flex-wrap">
                    {CB_OPTIONS.map(({ value, labelKey }) => (
                      <button
                        key={value}
                        onClick={() => setCb(value)}
                        className={`px-3 py-2 rounded-xl border-2 font-bold text-xs ${cb === value ? 'bg-[var(--primary)] text-white' : ''}`}
                      >
                        {t(language, labelKey)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'settings_language')}</h3>
                  <div className="flex gap-2">
                    {['en', 'cz'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs uppercase ${language === lang ? 'bg-[var(--primary)] text-white' : ''}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age Group (Demo) */}
                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'settings_age_group')}</h3>
                  <div className="flex gap-2">
                    {[
                      { value: 'under16', labelKey: 'age_under16' },
                      { value: '16plus',  labelKey: 'age_16plus'  },
                    ].map(({ value, labelKey }) => (
                      <button
                        key={value}
                        onClick={() => setAgeGroup(value)}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs ${ageGroup === value ? 'bg-[var(--primary)] text-white' : ''}`}
                      >
                        {t(language, labelKey)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consent */}
                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'settings_consent')}</h3>
                  <div className="bg-[var(--background)] rounded-xl px-4 py-3 text-xs text-[var(--muted-foreground)] mb-2 border border-[var(--border)]">
                    {hasConsent === null
                      ? t(language, 'consent_not_set')
                      : hasConsent
                      ? t(language, 'consent_over16_label')
                      : t(language, 'consent_under16_label')}
                  </div>
                  {hasConsent !== null && (
                    <button
                      onClick={() => setHasConsent(null)}
                      className="w-full py-3 border-2 border-[var(--border)] text-[var(--muted-foreground)] font-bold text-xs rounded-xl active:scale-95 transition-all"
                    >
                      {t(language, 'consent_reset')}
                    </button>
                  )}
                </div>

                <button
                  onClick={() => { setDarkMode(false); setHighContrast(false); setDyslexic(false); setTextSize('normal'); setCb('none'); }}
                  className="w-full py-4 border-2 border-red-100 text-red-500 font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <RotateCcw size={18} /> {t(language, 'reset_defaults')}
                </button>
              </div>
            </div>
          )}

          <main className="flex-1 overflow-y-auto pt-16">
            <ActiveScreen
              onNavigate={setActiveTab}
              globalXp={xp}
              globalStreak={streak}
              language={language}
              hasConsent={hasConsent}
              onConsent={setHasConsent}
              swipeResults={swipeResults}
              onSwipeResult={handleSwipeResult}
              ageGroup={ageGroup}
              onAddXp={handleAddXp}
            />
          </main>

          <nav className="shrink-0 border-t border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
            <ul className="flex">
              {TABS.map(({ id, key, Icon }) => (
                <li key={id} className="flex-1">
                  <button
                    onClick={() => setActiveTab(id)}
                    className="w-full flex flex-col items-center gap-1 py-3 transition-all duration-150 active:scale-95"
                  >
                    <Icon size={22} className={activeTab === id ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'} />
                    <span className={`text-[10px] font-semibold ${activeTab === id ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}>
                      {t(language, key)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

const UniversalAccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <circle cx="12" cy="4" r="2" />
    <path d="M20 13c-2-2-5-3-8-3s-6 1-8 3M12 10v6M7 22l5-6 5 6" />
  </svg>
);
```

- [ ] **Step 2: Run all tests**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed`, `18 passed`.

- [ ] **Step 3: Verify colorblind filter in browser**

Run `npm run dev`. Open Settings modal → Colorblind Mode → tap "Prot." — the whole UI should shift color (reds desaturated). Tap "Off" to reset. Confirm all 4 modes produce a visible color shift.

- [ ] **Step 4: Verify ageGroup demo control**

In Settings modal → Demo: Age Group → tap "16+" — the button highlights. Close modal, navigate to Connect tab — the Scholarship banner is not yet there (will be added in Task 5). Navigate back to Settings → tap "Under 16" — switch back.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add SVG colorblind matrices, colorblind UI, ageGroup demo control to App"
```

---

## Task 4: Update `src/screens/RoadmapScreen.jsx`

**Files:**
- Modify: `src/screens/RoadmapScreen.jsx`

Adds: `onAddXp` prop; "+100 XP (Demo)" button; Rewards modal with earned/locked achievements and regional perks.

- [ ] **Step 1: Replace `src/screens/RoadmapScreen.jsx` with the full updated version**

```jsx
import { useState } from 'react';
import { Sparkles, Users, TrendingUp, CheckCircle2, Lock, ChevronRight, Star, Trophy, Plus, X } from 'lucide-react';
import { t } from '../i18n';
import { ACHIEVEMENTS, getEarnedAchievements } from '../lib/achievements';

const STAGES = [
  {
    key: 'discovery',
    nameKey: 'stage_discovery_name',
    yearsKey: 'stage_discovery_years',
    descKey: 'stage_discovery_desc',
    Icon: Sparkles,
    status: 'completed',
  },
  {
    key: 'community',
    nameKey: 'stage_community_name',
    yearsKey: 'stage_community_years',
    descKey: 'stage_community_desc',
    Icon: Users,
    status: 'active',
  },
  {
    key: 'transition',
    nameKey: 'stage_transition_name',
    yearsKey: 'stage_transition_years',
    descKey: 'stage_transition_desc',
    Icon: TrendingUp,
    status: 'locked',
    xpRequired: 500,
  },
];

const REGIONAL_PERKS = [
  { emoji: '🎫', titleKey: 'perk_museum', descKey: 'perk_museum_desc' },
  { emoji: '🏊', titleKey: 'perk_pool',   descKey: 'perk_pool_desc'   },
  { emoji: '🎓', titleKey: 'perk_mentor', descKey: 'perk_mentor_desc' },
];

function getPet(xp) {
  if (xp < 100) return { emoji: '🥚', msgKey: 'pet_egg' };
  if (xp < 200) return { emoji: '🐣', msgKey: 'pet_hatching' };
  if (xp < 400) return { emoji: '🐥', msgKey: 'pet_chick' };
  if (xp < 600) return { emoji: '🐦', msgKey: 'pet_fledgling' };
  return { emoji: '⭐', msgKey: 'pet_champion' };
}

export default function RoadmapScreen({ onNavigate, globalXp, onAddXp, language }) {
  const [showRewards, setShowRewards] = useState(false);
  const pet = getPet(globalXp);
  const petLevel = Math.floor(globalXp / 100);
  const XP_MAX = 600;
  const earnedIds = new Set(getEarnedAchievements(globalXp).map(a => a.id));

  return (
    <>
      <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter px-5 pb-8">
        {/* Header */}
        <div className="pt-12 pb-5 flex justify-between items-end">
          <div>
            <p className="text-[var(--muted-foreground)] text-xs font-medium">{t(language, 'roadmap_greeting')}</p>
            <h1 className="text-[var(--foreground)] text-2xl font-extrabold mt-0.5">{t(language, 'roadmap_title')}</h1>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="text-4xl animate-bounce">{pet.emoji}</div>
            <span className="text-[10px] font-bold text-[var(--primary)] uppercase">{t(language, 'roadmap_pet_level')} {petLevel}</span>
            <span className="text-[9px] text-[var(--muted-foreground)]">{t(language, pet.msgKey)}</span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-4 bg-[var(--primary)] rounded-2xl p-4 shadow-lg text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star size={14} fill="white" />
              <span className="font-bold text-sm">{t(language, 'roadmap_level')} 8</span>
            </div>
            <span className="text-white/70 text-xs font-semibold">
              {globalXp} / {XP_MAX} {t(language, 'roadmap_xp_label')}
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${Math.min((globalXp / XP_MAX) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setShowRewards(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-bold text-xs py-3 rounded-xl active:scale-95 transition-all shadow-sm"
          >
            <Trophy size={15} className="text-amber-500" />
            {t(language, 'rewards_btn')}
          </button>
          <button
            onClick={onAddXp}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl active:scale-95 transition-all shadow-sm"
          >
            <Plus size={15} />
            {t(language, 'rewards_xp_demo')}
          </button>
        </div>

        {/* Stage Timeline */}
        <div className="flex-1">
          {STAGES.map((stage, i) => {
            const isLocked = stage.status === 'locked' && globalXp < (stage.xpRequired ?? 0);
            return (
              <div key={stage.key} className="flex items-stretch gap-4 mb-4">
                <div className="flex flex-col items-center w-10 shrink-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${stage.status === 'completed' ? 'bg-emerald-500' : stage.status === 'active' ? 'bg-[var(--primary)]' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    {stage.status === 'completed'
                      ? <CheckCircle2 size={18} />
                      : isLocked
                      ? <Lock size={18} className="text-slate-400" />
                      : <stage.Icon size={18} />}
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="w-0.5 flex-1 my-1 bg-slate-200 dark:bg-slate-700" />
                  )}
                </div>
                <div className={`flex-1 p-4 rounded-2xl border ${stage.status === 'active' ? 'bg-indigo-50 border-indigo-100 dark:bg-slate-800 dark:border-indigo-900' : 'bg-[var(--card)] border-[var(--border)]'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-[var(--foreground)] text-sm">{t(language, stage.nameKey)}</p>
                    <span className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase">{t(language, stage.yearsKey)}</span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-snug">{t(language, stage.descKey)}</p>
                  {stage.status === 'active' && (
                    <button
                      onClick={() => onNavigate('swipe')}
                      className="mt-3 w-full bg-[var(--primary)] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all"
                    >
                      {t(language, 'stage_continue')} <ChevronRight size={14} />
                    </button>
                  )}
                  {isLocked && (
                    <p className="mt-2 text-[10px] text-[var(--muted-foreground)]">
                      🔒 {stage.xpRequired} {t(language, 'roadmap_xp_label')} required
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rewards Modal — fixed overlay */}
      {showRewards && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-end justify-center backdrop-blur-sm">
          <div className="bg-[var(--card)] w-full max-w-[448px] p-6 rounded-t-[30px] shadow-2xl max-h-[85dvh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Trophy size={20} className="text-amber-500" />
                {t(language, 'rewards_title')}
              </h2>
              <button onClick={() => setShowRewards(false)} className="p-2"><X size={20} /></button>
            </div>

            {/* Achievements */}
            <p className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] tracking-widest mb-3">
              {t(language, 'rewards_achievements')}
            </p>
            <div className="space-y-2 mb-6">
              {ACHIEVEMENTS.map(ach => {
                const earned = earnedIds.has(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${earned ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' : 'bg-[var(--background)] border-[var(--border)] opacity-40'}`}
                  >
                    <span className="text-2xl">{ach.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-xs text-[var(--foreground)]">{t(language, ach.titleKey)}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">{t(language, ach.descKey)}</p>
                    </div>
                    {earned && <CheckCircle2 size={16} className="text-amber-500 shrink-0" />}
                  </div>
                );
              })}
            </div>

            {/* Regional Perks */}
            <p className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] tracking-widest mb-3">
              {t(language, 'rewards_perks')}
            </p>
            <div className="space-y-2">
              {REGIONAL_PERKS.map(perk => (
                <div key={perk.titleKey} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                  <span className="text-2xl">{perk.emoji}</span>
                  <div>
                    <p className="font-bold text-xs text-[var(--foreground)]">{t(language, perk.titleKey)}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{t(language, perk.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Run all tests**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed`, `18 passed`.

- [ ] **Step 3: Verify in browser**

Navigate to the Journey tab. Confirm:
- Two new buttons appear between the XP bar and the stage timeline: "Rewards" (amber trophy) and "+100 XP (Demo)" (green)
- Tapping "+100 XP (Demo)" increments the XP bar and may flip the pet emoji (e.g. 340→440 = 🐦 "Taking Flight")
- At 500 XP, the locked Transition Era stage unlocks (no longer shows 🔒)
- Tapping "Rewards" opens a bottom sheet showing 5 achievement cards and 3 regional perk cards
- Earned achievements (xpRequired ≤ current XP) are highlighted amber; locked ones are 40% opacity
- All text switches correctly when toggling EN ↔ CZ

- [ ] **Step 4: Commit**

```bash
git add src/screens/RoadmapScreen.jsx
git commit -m "feat: RoadmapScreen — Rewards modal with achievements and regional perks, +100 XP demo button"
```

---

## Task 5: Update `src/screens/BridgeScreen.jsx`

**Files:**
- Modify: `src/screens/BridgeScreen.jsx`

Adds: `ageGroup` prop; Scholarship banner shown only when `ageGroup === '16plus'`, above the existing pathway list.

- [ ] **Step 1: Replace the component signature and add the banner**

Open `src/screens/BridgeScreen.jsx`. Make three targeted edits:

**Edit 1 — update the function signature** (line 13):

Find:
```jsx
export default function BridgeScreen({ language, swipeResults }) {
```

Replace with:
```jsx
export default function BridgeScreen({ language, swipeResults, ageGroup }) {
```

**Edit 2 — add the Scholarship banner** between the tab switcher and the pathway list.

Find:
```jsx
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
```

Replace with:
```jsx
      {ageGroup === '16plus' && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl p-4 mb-4 shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🏆</span>
            <p className="font-extrabold text-sm text-white">{t(language, 'bridge_scholarship_title')}</p>
          </div>
          <p className="text-xs text-white/90 mb-3">{t(language, 'bridge_scholarship_desc')}</p>
          <button className="bg-white text-amber-600 font-bold text-xs py-2 px-4 rounded-xl active:scale-95 transition-all">
            {t(language, 'bridge_scholarship_cta')}
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
```

- [ ] **Step 2: Run all tests**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed`, `18 passed`.

- [ ] **Step 3: Verify in browser**

Navigate to Settings modal → Demo: Age Group → tap "Under 16". Go to Connect tab — NO banner visible.

Open Settings → tap "16+" → go to Connect tab — amber "Premium Scholarship Matches" banner appears at the top with "Explore Scholarships" button.

Toggle back to "Under 16" — banner disappears. Pathways and tab switcher are unaffected in both modes.

- [ ] **Step 4: Commit**

```bash
git add src/screens/BridgeScreen.jsx
git commit -m "feat: BridgeScreen — gated scholarship banner for 16plus ageGroup"
```

---

## Self-Review

### Spec Coverage

| Requirement | Task |
|---|---|
| index.css: `.font-dyslexic *` specificity fix | Task 0 |
| App.jsx: SVG `<feColorMatrix>` blocks for 4 colorblind modes | Task 3 |
| App.jsx: Colorblind Mode UI buttons in Settings modal | Task 3 |
| App.jsx: `ageGroup` state ('under16'/'16plus') | Task 3 |
| App.jsx: ageGroup demo controls in Settings modal | Task 3 |
| RoadmapScreen: Rewards modal with digital achievements | Task 4 |
| RoadmapScreen: Real-World regional perks in Rewards modal | Task 4 |
| RoadmapScreen: "+100 XP (Demo)" button → pet/timeline evolution | Task 4 |
| BridgeScreen: "Premium Scholarship Matches" banner gated on `ageGroup === '16plus'` | Task 5 |
| BridgeScreen: Existing Pathways retained | Task 5 (no change to pathway list) |
| All new UI strings through i18n (EN/CZ) | Task 2 |

### Placeholder Scan

No "TBD", "similar to", "fill in", or incomplete code blocks found.

### Type Consistency

- `ageGroup`: `'under16' | '16plus'` — defined as `useState('under16')` in Task 3 (App.jsx); consumed as `ageGroup === '16plus'` in Task 5 (BridgeScreen). ✓
- `onAddXp`: `() => void` — defined as `handleAddXp` in Task 3; called as `onAddXp()` in Task 4. ✓
- `getEarnedAchievements(xp)` — returns `ACHIEVEMENTS[]` filtered by `xpRequired <= xp`. Used in Task 4 as `getEarnedAchievements(globalXp).map(a => a.id)`. ✓
- `ACHIEVEMENTS[n].titleKey` / `.descKey` — all 5 entries defined in Task 1; all corresponding i18n keys added in Task 2; consumed via `t(language, ach.titleKey)` in Task 4. ✓
- `REGIONAL_PERKS[n].titleKey` / `.descKey` — defined inline in Task 4; all 6 corresponding keys added in Task 2. ✓

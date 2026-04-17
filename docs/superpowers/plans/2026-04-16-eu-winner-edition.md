# SkillSwipe EU Winner Edition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade SkillSwipe from a static prototype into a bilingual (EN/CZ), GDPR-compliant "EU Winner Edition" with live pathway matching, a full compliance hub, and dynamic teacher insights.

**Architecture:** Two new pure-function modules (`i18n.js`, `lib/matchEngine.js`) handle translation and match-score calculation independently of React. Global state in `App.jsx` (language, hasConsent, swipeResults) flows down as props — no context or external state library needed. All five screens are upgraded in-place; the existing CSS variable / accessibility system is untouched.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Lucide React, Vitest (added in Task 0)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/i18n.js` | EN/CZ dictionary + `t(lang, key, vars)` helper |
| Create | `src/lib/matchEngine.js` | `PATHWAYS` data + `calcMatch(pathway, swipeResults)` |
| Create | `src/i18n.test.js` | Unit tests for `t()` |
| Create | `src/lib/matchEngine.test.js` | Unit tests for `calcMatch()` |
| Modify | `src/App.jsx` | Add `language`, `hasConsent`, `swipeResults` state; language toggle; pass props to screens |
| Modify | `src/screens/RoadmapScreen.jsx` | 3-stage timeline; evolving digital companion pet |
| Modify | `src/screens/SwipeScreen.jsx` | 12 vocational + 6 teaching-style scenarios; swipe tracking callback; progress bar |
| Modify | `src/screens/BridgeScreen.jsx` | Full redesign — Autonomy Framework: 6 expandable pathways with live match % and pros/cons |
| Modify | `src/screens/ImpactScreen.jsx` | Teachers tab (learning styles bar chart) + Sponsors tab (completion/rank/visibility) |
| Modify | `src/screens/FAQScreen.jsx` | EU Compliance Hub: consent gate, GDPR accordion, ToS accordion, 3-item Q&A |

---

## Task 0: Install Vitest

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`

- [ ] **Step 1: Install Vitest**

```bash
cd "/Users/test/Desktop/IDEATHLON 2026 PROJECT copy"
npm install -D vitest
```

Expected: `vitest` added to devDependencies in `package.json`.

- [ ] **Step 2: Add test scripts to package.json**

Open `package.json`. Replace the `"scripts"` block with:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Add Vitest config to vite.config.js**

Replace the full contents of `vite.config.js` with:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
  },
});
```

- [ ] **Step 4: Verify Vitest runs (no tests yet)**

```bash
npm test
```

Expected output: `No test files found` (exit 0, no errors).

- [ ] **Step 5: Commit**

```bash
cd "/Users/test/Desktop/IDEATHLON 2026 PROJECT copy"
git add package.json package-lock.json vite.config.js
git commit -m "chore: add Vitest for unit testing pure utility modules"
```

---

## Task 1: Create `src/i18n.js`

**Files:**
- Create: `src/i18n.js`
- Create: `src/i18n.test.js`

- [ ] **Step 1: Write the failing tests**

Create `src/i18n.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { t } from './i18n';

describe('t()', () => {
  it('returns English string for known key', () => {
    expect(t('en', 'tab_journey')).toBe('Journey');
  });

  it('returns Czech string for known key', () => {
    expect(t('cz', 'tab_journey')).toBe('Cesta');
  });

  it('falls back to English when CZ key is missing', () => {
    expect(t('cz', 'tab_journey')).not.toBe('tab_journey');
  });

  it('returns the key itself when key is missing in both languages', () => {
    expect(t('en', 'nonexistent_key_xyz')).toBe('nonexistent_key_xyz');
  });

  it('interpolates {{vars}} in the string', () => {
    expect(t('en', 'swipe_progress', { current: 3, total: 18 })).toBe('Card 3 of 18');
  });

  it('interpolates {{vars}} in Czech', () => {
    expect(t('cz', 'swipe_progress', { current: 3, total: 18 })).toBe('Karta 3 z 18');
  });
});
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test
```

Expected: 6 failures — `Cannot find module './i18n'`.

- [ ] **Step 3: Create `src/i18n.js`**

```js
export const TRANSLATIONS = {
  en: {
    // Tabs
    tab_journey: 'Journey',
    tab_discover: 'Discover',
    tab_connect: 'Connect',
    tab_faq: 'FAQ',
    tab_impact: 'Impact',
    // Accessibility modal
    settings: 'Settings',
    high_contrast: 'High Contrast',
    dyslexic_font: 'Dyslexic Font',
    font_size: 'Font size',
    reset_defaults: 'Reset to Defaults',
    // RoadmapScreen
    roadmap_greeting: 'Liberec Region Hub 👋',
    roadmap_title: "Jan's Journey",
    roadmap_xp_label: 'XP',
    roadmap_level: 'Level',
    roadmap_pet_level: 'Pet Lvl',
    stage_discovery_name: 'Discovery Era',
    stage_discovery_years: 'Year 1–2',
    stage_discovery_desc: 'Gamified exploration of your interests and talents.',
    stage_community_name: 'Community Era',
    stage_community_years: 'Year 3',
    stage_community_desc: 'Build skills and connect with regional Peer Forums.',
    stage_transition_name: 'Transition Era',
    stage_transition_years: 'Year 4',
    stage_transition_desc: 'Unlock Match Analytics and University Directories.',
    stage_continue: 'Continue',
    // Pet
    pet_egg: 'Sleeping...',
    pet_hatching: "Something's stirring!",
    pet_chick: 'Growing fast!',
    pet_fledgling: 'Taking flight!',
    pet_champion: 'Fully evolved!',
    // SwipeScreen
    swipe_title: 'Discover',
    swipe_subtitle: 'Swipe to shape your path',
    swipe_progress: 'Card {{current}} of {{total}}',
    swipe_teaching_label: 'Teaching Style',
    // BridgeScreen
    bridge_title: 'Your Pathways',
    bridge_subtitle: 'Tailored to your swipes',
    bridge_universities: 'Universities',
    bridge_vocational: 'Vocational',
    bridge_match: 'Match',
    bridge_pros: 'Why it fits',
    bridge_cons: 'Challenges',
    // ImpactScreen
    impact_title: 'Impact Dashboard',
    impact_subtitle: 'Data-driven school improvements',
    impact_tab_teachers: 'Teachers',
    impact_tab_sponsors: 'Sponsors',
    impact_learning_styles: 'Class Learning Styles',
    impact_completion: 'Student Completion',
    impact_visibility: 'School Visibility',
    impact_regional_rank: 'Regional Rank',
    impact_no_data: 'Complete some Discover cards to see insights',
    // FAQScreen
    faq_title: 'Help & Compliance',
    faq_subtitle: 'EU Privacy Hub',
    faq_consent_title: 'Age Verification',
    faq_consent_body: 'SkillSwipe is a GDPR-compliant platform. To access personalised features, please confirm your age.',
    faq_consent_over16: 'I am 16 or older',
    faq_consent_under16: 'I am under 16 (School Mode)',
    faq_gdpr_title: 'Your Data Rights',
    faq_gdpr_body: 'You have the right to access, correct, and delete your data at any time. Pedagogical data is strictly aggregated — no individual profiling is shared.',
    faq_tos_title: 'Terms of Service',
    faq_tos_body: 'By using SkillSwipe you agree to our Terms of Service. Data is used only to personalise your learning path and to provide aggregated insights to your school.',
    faq_identity_hidden: 'Your identity is hidden. Questions are answered by university alumni.',
    faq_recently_answered: 'Recently Answered',
    faq_anonymous: 'Anonymous Student',
    faq_alumni: 'Alumni Response',
    faq_ask_placeholder: 'Ask about scholarships, exams...',
    faq_school_mode: '🏫 School Mode – data managed by your institution',
  },
  cz: {
    // Tabs
    tab_journey: 'Cesta',
    tab_discover: 'Objevuj',
    tab_connect: 'Spoj se',
    tab_faq: 'FAQ',
    tab_impact: 'Dopad',
    // Accessibility modal
    settings: 'Nastavení',
    high_contrast: 'Vysoký kontrast',
    dyslexic_font: 'Dyslektické písmo',
    font_size: 'Velikost písma',
    reset_defaults: 'Obnovit výchozí',
    // RoadmapScreen
    roadmap_greeting: 'Liberecký regionální hub 👋',
    roadmap_title: 'Janina cesta',
    roadmap_xp_label: 'XP',
    roadmap_level: 'Úroveň',
    roadmap_pet_level: 'Mazlíček úr.',
    stage_discovery_name: 'Éra Objevování',
    stage_discovery_years: 'Roky 1–2',
    stage_discovery_desc: 'Gamifikované prozkoumávání zájmů a talentů.',
    stage_community_name: 'Komunitní éra',
    stage_community_years: 'Rok 3',
    stage_community_desc: 'Buduj dovednosti a připoj se k regionálním fórům.',
    stage_transition_name: 'Éra přechodu',
    stage_transition_years: 'Rok 4',
    stage_transition_desc: 'Odemkni analýzy shody a adresáře univerzit.',
    stage_continue: 'Pokračovat',
    // Pet
    pet_egg: 'Spí...',
    pet_hatching: 'Něco se hýbe!',
    pet_chick: 'Rychle roste!',
    pet_fledgling: 'Vzlétá!',
    pet_champion: 'Plně vyvinutý!',
    // SwipeScreen
    swipe_title: 'Objevuj',
    swipe_subtitle: 'Swipuj a formuj svou cestu',
    swipe_progress: 'Karta {{current}} z {{total}}',
    swipe_teaching_label: 'Styl učení',
    // BridgeScreen
    bridge_title: 'Tvé cesty',
    bridge_subtitle: 'Přizpůsobeno tvým volbám',
    bridge_universities: 'Univerzity',
    bridge_vocational: 'Odborné vzdělání',
    bridge_match: 'Shoda',
    bridge_pros: 'Proč to sedí',
    bridge_cons: 'Výzvy',
    // ImpactScreen
    impact_title: 'Dashboard dopadu',
    impact_subtitle: 'Datová zlepšení školy',
    impact_tab_teachers: 'Učitelé',
    impact_tab_sponsors: 'Sponzoři',
    impact_learning_styles: 'Styly učení třídy',
    impact_completion: 'Dokončení studenty',
    impact_visibility: 'Viditelnost školy',
    impact_regional_rank: 'Regionální pořadí',
    impact_no_data: 'Dokonči karty Objevuj pro zobrazení dat',
    // FAQScreen
    faq_title: 'Nápověda a shoda',
    faq_subtitle: 'EU centrum ochrany soukromí',
    faq_consent_title: 'Ověření věku',
    faq_consent_body: 'SkillSwipe je platforma v souladu s GDPR. Pro přístup k personalizovaným funkcím potvrď svůj věk.',
    faq_consent_over16: 'Je mi 16 nebo více',
    faq_consent_under16: 'Je mi méně než 16 (školní režim)',
    faq_gdpr_title: 'Tvá datová práva',
    faq_gdpr_body: 'Máš právo kdykoli přistupovat k svým datům, opravovat je a mazat. Pedagogická data jsou přísně agregována – žádné individuální profilování není sdíleno.',
    faq_tos_title: 'Podmínky použití',
    faq_tos_body: 'Používáním SkillSwipe souhlasíš s podmínkami. Data slouží pouze k personalizaci tvé vzdělávací cesty a k poskytování agregovaných poznatků tvé škole.',
    faq_identity_hidden: 'Tvá identita je skryta. Otázky zodpovídají absolventi univerzit.',
    faq_recently_answered: 'Nedávno zodpovězeno',
    faq_anonymous: 'Anonymní student',
    faq_alumni: 'Odpověď absolventa',
    faq_ask_placeholder: 'Ptej se na stipendia, zkoušky...',
    faq_school_mode: '🏫 Školní režim – data spravuje tvá instituce',
  },
};

export const t = (lang, key, vars = {}) => {
  let str = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  Object.entries(vars).forEach(([k, v]) => {
    str = str.replace(`{{${k}}}`, String(v));
  });
  return str;
};
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npm test
```

Expected: `6 passed`.

- [ ] **Step 5: Commit**

```bash
git add src/i18n.js src/i18n.test.js
git commit -m "feat: add EN/CZ i18n dictionary with interpolation helper"
```

---

## Task 2: Create `src/lib/matchEngine.js`

**Files:**
- Create: `src/lib/matchEngine.js`
- Create: `src/lib/matchEngine.test.js`

- [ ] **Step 1: Create the `src/lib/` directory**

```bash
mkdir -p "/Users/test/Desktop/IDEATHLON 2026 PROJECT copy/src/lib"
```

- [ ] **Step 2: Write the failing tests**

Create `src/lib/matchEngine.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { calcMatch, PATHWAYS } from './matchEngine';

describe('calcMatch()', () => {
  it('returns 50 when swipeResults is empty', () => {
    const pathway = PATHWAYS.find(p => p.id === 'tul-engineering');
    expect(calcMatch(pathway, {})).toBe(50);
  });

  it('returns 100 when every weighted category is 100% liked', () => {
    const pathway = PATHWAYS.find(p => p.id === 'tul-engineering');
    const results = {
      Technical: { liked: 5, total: 5 },
      Science: { liked: 5, total: 5 },
      Logic: { liked: 5, total: 5 },
    };
    expect(calcMatch(pathway, results)).toBe(100);
  });

  it('returns 0 when every weighted category is 0% liked', () => {
    const pathway = PATHWAYS.find(p => p.id === 'tul-engineering');
    const results = {
      Technical: { liked: 0, total: 5 },
      Science: { liked: 0, total: 5 },
      Logic: { liked: 0, total: 5 },
    };
    expect(calcMatch(pathway, results)).toBe(0);
  });

  it('ignores irrelevant categories', () => {
    const pathway = PATHWAYS.find(p => p.id === 'creative-arts');
    const results = {
      Technical: { liked: 5, total: 5 },
      Creative: { liked: 0, total: 2 },
      Social: { liked: 0, total: 2 },
    };
    expect(calcMatch(pathway, results)).toBe(0);
  });

  it('PATHWAYS contains exactly 6 entries', () => {
    expect(PATHWAYS).toHaveLength(6);
  });

  it('each pathway has id, type, emoji, name, weights, pros, cons', () => {
    PATHWAYS.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('type');
      expect(p).toHaveProperty('emoji');
      expect(p.name).toHaveProperty('en');
      expect(p.name).toHaveProperty('cz');
      expect(p).toHaveProperty('weights');
      expect(p.pros).toHaveProperty('en');
      expect(p.cons).toHaveProperty('en');
    });
  });
});
```

- [ ] **Step 3: Run tests — verify they fail**

```bash
npm test
```

Expected: failures — `Cannot find module './matchEngine'`.

- [ ] **Step 4: Create `src/lib/matchEngine.js`**

```js
export const PATHWAYS = [
  {
    id: 'tul-engineering',
    type: 'university',
    emoji: '⚙️',
    name: { en: 'TU Liberec – Engineering', cz: 'TUL – Strojní inženýrství' },
    location: 'Liberec, CZ',
    weights: { Technical: 0.4, Science: 0.3, Logic: 0.3 },
    pros: {
      en: ['Strong industry partnerships', 'Local campus – no relocation needed', 'High employment rate (92%)'],
      cz: ['Silné průmyslové partnerství', 'Místní kampus – bez stěhování', 'Vysoká zaměstnanost (92%)'],
    },
    cons: {
      en: ['Competitive entrance exam', 'Maths-heavy curriculum'],
      cz: ['Náročná přijímací zkouška', 'Matematicky náročné osnovy'],
    },
  },
  {
    id: 'palacky-science',
    type: 'university',
    emoji: '🔬',
    name: { en: 'Palacký Uni – Natural Sciences', cz: 'UP Olomouc – Přírodní vědy' },
    location: 'Olomouc, CZ',
    weights: { Science: 0.5, Logic: 0.3, Outdoors: 0.2 },
    pros: {
      en: ['Top research facilities', 'International exchange programs', 'Diverse campus life'],
      cz: ['Špičkové výzkumné vybavení', 'Mezinárodní výměnné programy', 'Pestrý kampusový život'],
    },
    cons: {
      en: ['Requires relocation (200 km)', 'Competitive admissions'],
      cz: ['Vyžaduje stěhování (200 km)', 'Náročné přijímací řízení'],
    },
  },
  {
    id: 'creative-arts',
    type: 'university',
    emoji: '🎨',
    name: { en: 'VŠPJ – Creative Design', cz: 'VŠPJ – Kreativní design' },
    location: 'Jihlava, CZ',
    weights: { Creative: 0.6, Social: 0.4 },
    pros: {
      en: ['Portfolio-based admissions', 'Small class sizes', 'Strong alumni network'],
      cz: ['Přijímání na základě portfolia', 'Malé třídy', 'Silná síť absolventů'],
    },
    cons: {
      en: ['Limited STEM crossover', 'Competitive creative job market'],
      cz: ['Omezený průnik se STEM', 'Konkurenční kreativní trh'],
    },
  },
  {
    id: 'mechanical-apprenticeship',
    type: 'vocational',
    emoji: '🔩',
    name: { en: 'Mechanical Apprenticeship', cz: 'Strojní učňovský obor' },
    location: 'Liberec Region',
    weights: { Technical: 0.5, Outdoors: 0.3, Logic: 0.2 },
    pros: {
      en: ['Earn while you learn', 'Direct industry placement', '2-year fast track'],
      cz: ['Výdělek při učení', 'Přímé umístění v průmyslu', 'Rychlá 2letá dráha'],
    },
    cons: {
      en: ['Lower academic ceiling', 'Physically demanding work'],
      cz: ['Nižší akademický strop', 'Fyzicky náročné'],
    },
  },
  {
    id: 'healthcare-assistant',
    type: 'vocational',
    emoji: '🏥',
    name: { en: 'Healthcare Assistant Program', cz: 'Program zdravotního asistenta' },
    location: 'Regional hospitals',
    weights: { Social: 0.5, Healthcare: 0.5 },
    pros: {
      en: ['High job security', 'Community impact', 'Shorter training (18 months)'],
      cz: ['Vysoká jistota zaměstnání', 'Dopad na komunitu', 'Kratší příprava (18 měsíců)'],
    },
    cons: {
      en: ['Emotionally demanding', 'Shift work required'],
      cz: ['Emocionálně náročné', 'Nutná práce na směny'],
    },
  },
  {
    id: 'digital-design',
    type: 'vocational',
    emoji: '💻',
    name: { en: 'Digital Design Program', cz: 'Program digitálního designu' },
    location: 'Online + Liberec Hub',
    weights: { Creative: 0.5, Technical: 0.3, Business: 0.2 },
    pros: {
      en: ['Fully remote-capable', 'Fast-growing job market', 'Freelance-friendly'],
      cz: ['Plně na dálku', 'Rychle rostoucí trh práce', 'Vhodné pro freelancing'],
    },
    cons: {
      en: ['Requires strong self-discipline', 'Saturated entry level'],
      cz: ['Vyžaduje sebedisciplínu', 'Saturovaná vstupní úroveň'],
    },
  },
];

export function calcMatch(pathway, swipeResults) {
  let score = 0;
  let totalWeight = 0;
  for (const [cat, weight] of Object.entries(pathway.weights)) {
    const result = swipeResults[cat];
    if (result && result.total > 0) {
      score += (result.liked / result.total) * weight;
      totalWeight += weight;
    }
  }
  if (totalWeight === 0) return 50;
  return Math.round((score / totalWeight) * 100);
}
```

- [ ] **Step 5: Run tests — verify they pass**

```bash
npm test
```

Expected: all tests pass (including Task 1 tests). Total: `12 passed`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/matchEngine.js src/lib/matchEngine.test.js
git commit -m "feat: add pathway match engine with 6 pathways and calcMatch function"
```

---

## Task 3: Update `src/App.jsx`

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `src/App.jsx` with the updated version**

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
    <div className="bg-slate-200 flex items-center justify-center min-h-[100dvh]">
      <div className="relative w-full max-w-[448px] h-[100dvh] md:h-[90vh] md:max-h-[800px] mx-auto flex flex-col overflow-hidden bg-[var(--background)] shadow-2xl md:rounded-[40px] text-[var(--foreground)] transition-all">

        {/* Floating Controls */}
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-white/90 dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700"
            >
              {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-slate-600" />}
            </button>
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'cz' : 'en')}
              className="px-4 py-3 bg-white/90 dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
            >
              {language === 'en' ? 'CZ' : 'EN'}
            </button>
          </div>
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
              <div className="mb-8">
                <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'font_size')}</h3>
                <div className="flex gap-2">
                  {['normal', 'large', 'xlarge'].map(s => (
                    <button
                      key={s}
                      onClick={() => setTextSize(s)}
                      className={`flex-1 py-3 rounded-xl border-2 font-bold capitalize ${textSize === s ? 'bg-[var(--primary)] text-white' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
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
  );
}

const UniversalAccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <circle cx="12" cy="4" r="2" />
    <path d="M20 13c-2-2-5-3-8-3s-6 1-8 3M12 10v6M7 22l5-6 5 6" />
  </svg>
);
```

- [ ] **Step 2: Start dev server and verify**

```bash
npm run dev
```

Open `http://localhost:5173`. Verify:
- App loads with existing layout
- Dark mode toggle still works (top-left moon icon)
- New `CZ` button appears next to dark mode toggle — clicking it changes tab labels to Czech (e.g. "Journey" → "Cesta")
- Clicking `CZ` again restores English
- Accessibility modal still opens; "Settings" text changes to "Nastavení" when in CZ mode

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add language toggle, hasConsent, and swipeResults global state to App"
```

---

## Task 4: Update `src/screens/RoadmapScreen.jsx`

**Files:**
- Modify: `src/screens/RoadmapScreen.jsx`

- [ ] **Step 1: Replace `src/screens/RoadmapScreen.jsx`**

```jsx
import { Sparkles, Users, TrendingUp, CheckCircle2, Lock, ChevronRight, Star } from 'lucide-react';
import { t } from '../i18n';

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

function getPet(xp) {
  if (xp < 100) return { emoji: '🥚', msgKey: 'pet_egg' };
  if (xp < 200) return { emoji: '🐣', msgKey: 'pet_hatching' };
  if (xp < 400) return { emoji: '🐥', msgKey: 'pet_chick' };
  if (xp < 600) return { emoji: '🐦', msgKey: 'pet_fledgling' };
  return { emoji: '⭐', msgKey: 'pet_champion' };
}

export default function RoadmapScreen({ onNavigate, globalXp, language }) {
  const pet = getPet(globalXp);
  const petLevel = Math.floor(globalXp / 100);
  const XP_MAX = 600;

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter px-5 pb-8">
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

      <div className="mb-6 bg-[var(--primary)] rounded-2xl p-4 shadow-lg text-white">
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
  );
}
```

- [ ] **Step 2: Verify in browser (dev server already running)**

On the **Journey** tab, verify:
- Three stage cards visible: Discovery Era (green checkmark), Community Era (active/purple, Continue button), Transition Era (locked, shows XP requirement)
- Pet shows emoji + level + status message below it (e.g. "🐥 Pet Lvl 3 Growing fast!")
- Switching language to CZ changes stage names, years, descriptions, and button text
- Dark mode still applies correctly to all cards

- [ ] **Step 3: Commit**

```bash
git add src/screens/RoadmapScreen.jsx
git commit -m "feat: RoadmapScreen — 3-stage timeline, evolving digital companion pet, i18n"
```

---

## Task 5: Update `src/screens/SwipeScreen.jsx`

**Files:**
- Modify: `src/screens/SwipeScreen.jsx`

- [ ] **Step 1: Replace `src/screens/SwipeScreen.jsx`**

```jsx
import { useState } from 'react';
import { Flame, Zap, X, Heart } from 'lucide-react';
import { t } from '../i18n';

const SCENARIOS = [
  // 12 Vocational cards
  { e: '🔧', text: { en: 'Dismantle a radio to see how it works', cz: 'Rozebrat rádio, abys viděl/a jak funguje' }, c: 'Technical' },
  { e: '🎨', text: { en: 'Design a professional logo for a local business', cz: 'Navrhnout profesionální logo pro místní firmu' }, c: 'Creative' },
  { e: '🔬', text: { en: 'Perform a chemistry experiment at home', cz: 'Provést chemický pokus doma' }, c: 'Science' },
  { e: '🏗️', text: { en: 'Create a 3D floor plan for a modern house', cz: 'Vytvořit 3D půdorys moderního domu' }, c: 'Technical' },
  { e: '🧬', text: { en: 'Study how DNA determines biological traits', cz: 'Studovat, jak DNA určuje biologické vlastnosti' }, c: 'Science' },
  { e: '🌲', text: { en: 'Work outdoors in a national park or forest', cz: 'Pracovat venku v národním parku nebo lese' }, c: 'Outdoors' },
  { e: '🏥', text: { en: 'Volunteer at a hospital to assist patients', cz: 'Dobrovolničit v nemocnici a pomáhat pacientům' }, c: 'Healthcare' },
  { e: '⚖️', text: { en: 'Debate ethics in a modern mock courtroom', cz: 'Diskutovat o etice v simulovaném soudním procesu' }, c: 'Social' },
  { e: '📊', text: { en: 'Analyze complex data to solve a regional problem', cz: 'Analyzovat komplexní data k řešení regionálního problému' }, c: 'Logic' },
  { e: '✍️', text: { en: 'Write a short story about a sci-fi adventure', cz: 'Napsat povídku o sci-fi dobrodružství' }, c: 'Creative' },
  { e: '💊', text: { en: 'Research how medicines are developed and tested', cz: 'Zkoumat, jak se vyvíjejí a testují léky' }, c: 'Healthcare' },
  { e: '📈', text: { en: 'Launch a small business idea and pitch it to a panel', cz: 'Spustit nápad na malý podnik a prezentovat ho porotě' }, c: 'Business' },
  // 6 Teaching Style cards
  { e: '📚', text: { en: '"I wish my teachers used more hands-on experiments in class."', cz: '"Přál/a bych si, aby učitelé používali více praktických pokusů."' }, c: 'ts_experiments' },
  { e: '💡', text: { en: '"I find it easier to learn through videos than lectures."', cz: '"Snáze se učím přes videa než přednášky."' }, c: 'ts_video' },
  { e: '🖥️', text: { en: '"I learn better when we work in groups rather than alone."', cz: '"Lépe se učím, když pracujeme ve skupinách."' }, c: 'ts_group' },
  { e: '📝', text: { en: '"I prefer digital assignments over paper-based ones."', cz: '"Preferuji digitální zadání před papírovými."' }, c: 'ts_digital' },
  { e: '📱', text: { en: '"I would like more interactive apps like this to help me learn."', cz: '"Chtěl/a bych více interaktivních aplikací jako tato."' }, c: 'ts_apps' },
  { e: '🧪', text: { en: '"I prefer learning by doing rather than reading from a book."', cz: '"Raději se učím praxí než čtením z knihy."' }, c: 'ts_practical' },
];

export default function SwipeScreen({ onNavigate, globalStreak, language, onSwipeResult }) {
  const [idx, setIdx] = useState(0);

  const handleSwipe = (liked) => {
    onSwipeResult(SCENARIOS[idx].c, liked);
    if (idx < SCENARIOS.length - 1) {
      setIdx(idx + 1);
    } else {
      onNavigate('bridge');
    }
  };

  const card = SCENARIOS[idx];
  const isTeachingStyle = card.c.startsWith('ts_');

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter p-6">
      <div className="pt-8 pb-4">
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">{t(language, 'swipe_title')}</h1>
        <p className="text-[var(--muted-foreground)] text-sm">{t(language, 'swipe_subtitle')}</p>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl p-3">
          <Zap size={18} className="text-indigo-600 dark:text-indigo-300" />
          <span className="text-indigo-700 dark:text-indigo-200 text-sm font-bold">{t(language, 'roadmap_level')} 8</span>
        </div>
        <div className="flex-1 flex items-center gap-2.5 bg-orange-100 dark:bg-orange-900/40 rounded-2xl p-3">
          <Flame size={18} className="text-orange-500" />
          <span className="text-orange-600 dark:text-orange-300 text-sm font-bold">{globalStreak} Day Streak</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-[10px] font-bold text-[var(--muted-foreground)] mb-1">
          <span>{t(language, 'swipe_progress', { current: idx + 1, total: SCENARIOS.length })}</span>
          <span>{Math.round(((idx + 1) / SCENARIOS.length) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--primary)] rounded-full transition-all duration-300"
            style={{ width: `${((idx + 1) / SCENARIOS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full bg-[var(--card)] rounded-3xl p-8 shadow-xl border border-[var(--border)] text-center transition-colors">
          <div className="text-6xl mb-4">{card.e}</div>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2 block">
            {isTeachingStyle ? t(language, 'swipe_teaching_label') : card.c}
          </span>
          <p className="text-[var(--foreground)] text-xl font-bold leading-snug">
            {card.text[language] ?? card.text.en}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-6 py-8">
        <button
          onClick={() => handleSwipe(false)}
          className="w-16 h-16 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--danger)] flex items-center justify-center active:scale-95 transition-all shadow-md"
        >
          <X size={28} />
        </button>
        <button
          onClick={() => handleSwipe(true)}
          className="w-20 h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
        >
          <Heart size={36} fill="white" strokeWidth={0} />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

On the **Discover** tab, verify:
- Progress bar and "Card 1 of 18" counter appear at the top
- Cards advance when tapping X (dislike) or Heart (like) — not just Heart
- After tapping through all 18 cards, app navigates automatically to the Connect tab
- Teaching Style cards show the `swipe_teaching_label` category badge instead of the raw key (`ts_experiments`)
- Switching language mid-session changes card text to Czech

- [ ] **Step 3: Commit**

```bash
git add src/screens/SwipeScreen.jsx
git commit -m "feat: SwipeScreen — 12 vocational + 6 teaching-style scenarios, swipe tracking, progress bar"
```

---

## Task 6: Update `src/screens/BridgeScreen.jsx`

**Files:**
- Modify: `src/screens/BridgeScreen.jsx`

- [ ] **Step 1: Replace `src/screens/BridgeScreen.jsx`**

```jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { t } from '../i18n';
import { PATHWAYS, calcMatch } from '../lib/matchEngine';

function matchColor(pct) {
  if (pct >= 80) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30';
  if (pct >= 60) return 'text-[var(--primary)] bg-indigo-50 dark:bg-indigo-900/30';
  if (pct >= 40) return 'text-amber-600 bg-amber-50 dark:bg-amber-900/30';
  return 'text-red-500 bg-red-50 dark:bg-red-900/30';
}

export default function BridgeScreen({ language, swipeResults }) {
  const [expanded, setExpanded] = useState(null);
  const [activeTab, setActiveTab] = useState('university');

  const filtered = PATHWAYS.filter(p => p.type === activeTab);

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] p-6 screen-enter">
      <div className="pt-8 mb-4">
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">{t(language, 'bridge_title')}</h1>
        <p className="text-[var(--muted-foreground)] text-sm">{t(language, 'bridge_subtitle')}</p>
      </div>

      <div className="flex bg-[var(--card)] rounded-2xl p-1 border border-[var(--border)] mb-5">
        {['university', 'vocational'].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setExpanded(null); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-[var(--muted-foreground)]'}`}
          >
            {t(language, tab === 'university' ? 'bridge_universities' : 'bridge_vocational')}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {filtered.map(pathway => {
          const match = calcMatch(pathway, swipeResults);
          const isOpen = expanded === pathway.id;
          return (
            <div key={pathway.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
              <button
                onClick={() => setExpanded(isOpen ? null : pathway.id)}
                className="w-full p-4 flex items-center gap-3 text-left active:scale-[0.99] transition-all"
              >
                <span className="text-3xl">{pathway.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[var(--foreground)] truncate">
                    {pathway.name[language] ?? pathway.name.en}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-[var(--muted-foreground)]" />
                    <span className="text-[10px] text-[var(--muted-foreground)]">{pathway.location}</span>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${matchColor(match)}`}>
                  {match}% {t(language, 'bridge_match')}
                </div>
                {isOpen
                  ? <ChevronUp size={16} className="text-[var(--muted-foreground)] shrink-0" />
                  : <ChevronDown size={16} className="text-[var(--muted-foreground)] shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-[var(--border)] pt-3">
                  <p className="text-[10px] font-bold uppercase text-emerald-600 tracking-widest mb-2">
                    {t(language, 'bridge_pros')}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {(pathway.pros[language] ?? pathway.pros.en).map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-[var(--foreground)]">{pro}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] font-bold uppercase text-amber-600 tracking-widest mb-2">
                    {t(language, 'bridge_cons')}
                  </p>
                  <ul className="space-y-1.5">
                    {(pathway.cons[language] ?? pathway.cons.en).map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle size={13} className="text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-[var(--foreground)]">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

On the **Connect** tab, verify:
- Three university pathway cards are listed by default, each showing a match percentage badge
- Tapping a card expands it revealing "Why it fits" (green checkmarks) and "Challenges" (amber alerts)
- Tapping again collapses it; only one card is expanded at a time
- Switching to the Vocational tab shows 3 vocational pathways
- After swiping several cards in the Discover tab, returning to Connect shows updated percentages (e.g. many Technical ♥ = higher TUL Engineering match)
- CZ language changes all labels and pros/cons text

- [ ] **Step 3: Commit**

```bash
git add src/screens/BridgeScreen.jsx
git commit -m "feat: BridgeScreen — Autonomy Framework with 6 expandable pathways and live match percentages"
```

---

## Task 7: Update `src/screens/ImpactScreen.jsx`

**Files:**
- Modify: `src/screens/ImpactScreen.jsx`

- [ ] **Step 1: Replace `src/screens/ImpactScreen.jsx`**

```jsx
import { useState } from 'react';
import { Award, Users, School } from 'lucide-react';
import { t } from '../i18n';

const TS_LABELS = {
  ts_experiments: { en: 'Hands-on', cz: 'Praktické' },
  ts_video:       { en: 'Video',    cz: 'Video' },
  ts_group:       { en: 'Groups',   cz: 'Skupiny' },
  ts_digital:     { en: 'Digital',  cz: 'Digitální' },
  ts_apps:        { en: 'Apps',     cz: 'Aplikace' },
  ts_practical:   { en: 'By Doing', cz: 'Praxí' },
};

function LearningBar({ label, pct }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-[10px] font-bold mb-1">
        <span className="text-[var(--foreground)]">{label}</span>
        <span className="text-[var(--primary)]">{pct}%</span>
      </div>
      <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function ImpactScreen({ language, swipeResults }) {
  const [activeTab, setActiveTab] = useState('teachers');

  const tsData = Object.entries(TS_LABELS)
    .map(([key, labels]) => {
      const r = swipeResults[key];
      const pct = r && r.total > 0 ? Math.round((r.liked / r.total) * 100) : 0;
      return { key, label: labels[language] ?? labels.en, pct };
    })
    .sort((a, b) => b.pct - a.pct);

  const hasTeachingData = tsData.some(d => d.pct > 0);

  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter">
      <h1 className="text-[var(--foreground)] text-3xl font-extrabold mb-1">{t(language, 'impact_title')}</h1>
      <p className="text-[var(--muted-foreground)] text-sm mb-5">{t(language, 'impact_subtitle')}</p>

      <div className="flex bg-[var(--card)] rounded-2xl p-1 border border-[var(--border)] mb-5">
        {['teachers', 'sponsors'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-[var(--muted-foreground)]'}`}
          >
            {t(language, tab === 'teachers' ? 'impact_tab_teachers' : 'impact_tab_sponsors')}
          </button>
        ))}
      </div>

      {activeTab === 'teachers' && (
        <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)]">
          <p className="text-xs font-bold uppercase text-[var(--muted-foreground)] tracking-widest mb-4">
            {t(language, 'impact_learning_styles')}
          </p>
          {hasTeachingData
            ? tsData.map(item => <LearningBar key={item.key} label={item.label} pct={item.pct} />)
            : <p className="text-xs text-[var(--muted-foreground)] text-center py-4">{t(language, 'impact_no_data')}</p>}
        </div>
      )}

      {activeTab === 'sponsors' && (
        <div className="space-y-3">
          <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase">{t(language, 'impact_completion')}</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">85%</h3>
            </div>
          </div>
          <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-amber-500">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase">{t(language, 'impact_regional_rank')}</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">#3 / 14</h3>
            </div>
          </div>
          <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-green-600">
              <School size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase">{t(language, 'impact_visibility')}</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">1,247 views</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

On the **Impact** tab, verify:
- Two tabs visible: Teachers and Sponsors
- Teachers tab initially shows "Complete some Discover cards..." placeholder
- After swiping a few Teaching Style cards on Discover, returning to Impact shows bars populated (e.g. swiping ♥ on "videos" raises the Video bar)
- Sponsors tab shows 3 metric cards: Completion, Regional Rank, Visibility
- All labels translate correctly in CZ mode

- [ ] **Step 3: Commit**

```bash
git add src/screens/ImpactScreen.jsx
git commit -m "feat: ImpactScreen — Teachers/Sponsors tabs with live learning-style bars and regional metrics"
```

---

## Task 8: Update `src/screens/FAQScreen.jsx`

**Files:**
- Modify: `src/screens/FAQScreen.jsx`

- [ ] **Step 1: Replace `src/screens/FAQScreen.jsx`**

```jsx
import { useState } from 'react';
import { Send, Info, MessageCircle, User, Shield, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { t } from '../i18n';

const FAQ_ITEMS = [
  {
    q: { en: 'Is the entrance exam at TUL very hard?', cz: 'Je přijímací zkouška na TUL těžká?' },
    a: { en: "It varies by faculty, but the main focus is on your motivation. For IT, if you've been swiping technical skills in SkillSwipe, you're already on the right path!", cz: 'Záleží na fakultě, ale hlavní důraz je na vaši motivaci. Pro IT, pokud jste swipovali technické dovednosti, jste na správné cestě!' },
  },
  {
    q: { en: 'How do scholarships work in the Czech Republic?', cz: 'Jak fungují stipendia v České republice?' },
    a: { en: 'Most state universities offer merit-based and social scholarships. TUL has specific regional scholarships for Liberec students — ask your school counsellor for details.', cz: 'Většina státních univerzit nabízí stipendia na základě zásluh a sociální stipendia. TUL má specifická regionální stipendia pro studenty z Liberce.' },
  },
  {
    q: { en: 'Can I switch from vocational training to university later?', cz: 'Mohu přejít z odborného vzdělání na univerzitu?' },
    a: { en: 'Yes! Many vocational programs in CZ provide a pathway to university via the maturita exam. SkillSwipe can help you track this transition.', cz: 'Ano! Mnoho odborných programů v ČR poskytuje cestu na univerzitu přes maturitní zkoušku.' },
  },
];

function AccordionSection({ icon: Icon, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden mb-3">
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-center gap-3 text-left">
        <Icon size={18} className="text-[var(--primary)] shrink-0" />
        <span className="font-bold text-sm text-[var(--foreground)] flex-1">{title}</span>
        {open
          ? <ChevronUp size={16} className="text-[var(--muted-foreground)]" />
          : <ChevronDown size={16} className="text-[var(--muted-foreground)]" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-[var(--border)] pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

export default function FAQScreen({ language, hasConsent, onConsent }) {
  const [question, setQuestion] = useState('');

  if (hasConsent === null) {
    return (
      <div className="flex-1 p-6 bg-[var(--background)] screen-enter flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Shield size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-[var(--foreground)] text-center mb-3">
          {t(language, 'faq_consent_title')}
        </h2>
        <p className="text-sm text-[var(--muted-foreground)] text-center mb-8 max-w-xs leading-relaxed">
          {t(language, 'faq_consent_body')}
        </p>
        <button
          onClick={() => onConsent(true)}
          className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-2xl mb-3 active:scale-95 transition-all shadow-lg"
        >
          {t(language, 'faq_consent_over16')}
        </button>
        <button
          onClick={() => onConsent(false)}
          className="w-full bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] font-bold py-4 rounded-2xl active:scale-95 transition-all"
        >
          {t(language, 'faq_consent_under16')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter flex flex-col">
      <div className="pt-8 mb-4">
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">{t(language, 'faq_title')}</h1>
        <p className="text-[var(--muted-foreground)] text-sm">{t(language, 'faq_subtitle')}</p>
        {hasConsent === false && (
          <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2">
            <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold">
              {t(language, 'faq_school_mode')}
            </p>
          </div>
        )}
      </div>

      <AccordionSection icon={Shield} title={t(language, 'faq_gdpr_title')}>
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-3">
          {t(language, 'faq_gdpr_body')}
        </p>
        <button className="text-xs font-bold text-[var(--danger)] underline">
          Request Data Deletion
        </button>
      </AccordionSection>

      <AccordionSection icon={FileText} title={t(language, 'faq_tos_title')}>
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
          {t(language, 'faq_tos_body')}
        </p>
      </AccordionSection>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 flex gap-3 mb-4">
        <Info size={20} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
        <p className="text-xs text-indigo-800 dark:text-indigo-200 leading-tight">
          {t(language, 'faq_identity_hidden')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        <p className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] tracking-widest">
          {t(language, 'faq_recently_answered')}
        </p>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[var(--muted-foreground)]">
                  <User size={12} />
                </div>
                <span className="text-[10px] font-bold text-[var(--muted-foreground)]">
                  {t(language, 'faq_anonymous')}
                </span>
              </div>
              <p className="text-sm font-bold text-[var(--foreground)]">
                {item.q[language] ?? item.q.en}
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center text-white">
                  <MessageCircle size={12} fill="white" />
                </div>
                <span className="text-[10px] font-bold text-[var(--primary)]">
                  {t(language, 'faq_alumni')}
                </span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                {item.a[language] ?? item.a.en}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--border)]">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t(language, 'faq_ask_placeholder')}
            className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors text-[var(--foreground)]"
          />
          <button className="bg-[var(--primary)] text-white p-3 rounded-xl shadow-md active:scale-95 transition-all">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

On the **FAQ** tab, verify:
- First visit shows a full-screen consent gate with a Shield icon, two buttons ("I am 16 or older" / "I am under 16")
- Tapping "I am under 16" shows the FAQ hub with an amber "School Mode" banner at the top
- Tapping "I am 16 or older" shows the same hub without the banner
- GDPR accordion expands/collapses showing rights text and "Request Data Deletion" link
- ToS accordion expands/collapses with terms text
- 3 Q&A cards are visible below the accordions; all text translates in CZ mode
- Ask-a-question input is functional (typing works; Send button present)
- Dark mode applies correctly to all cards, accordions, and the consent gate

- [ ] **Step 3: Run all unit tests to confirm nothing is broken**

```bash
npm test
```

Expected: `12 passed`.

- [ ] **Step 4: Final commit**

```bash
git add src/screens/FAQScreen.jsx
git commit -m "feat: FAQScreen — EU Compliance Hub with GDPR/ToS accordions, age-consent gate, bilingual Q&A"
```

---

## Self-Review

### Spec Coverage Check

| Requirement | Task(s) |
|---|---|
| App.jsx: `xp`, `streak`, `language`, `hasConsent` global state | Task 3 |
| Lightweight EN/CZ translation dictionary | Task 1 |
| RoadmapScreen: 3-Stage Timeline (Discovery, Community, Transition) | Task 4 |
| RoadmapScreen: Evolving Digital Companion (Pet) | Task 4 |
| SwipeScreen: 12+ vocational scenarios | Task 5 (12 vocational cards) |
| SwipeScreen: Pedagogical 'Teaching Style' questions | Task 5 (6 ts_* cards) |
| BridgeScreen: Expandable Pathways (Universities & Alternatives) | Task 6 |
| BridgeScreen: Calculated Match Percentages | Tasks 2 + 6 |
| BridgeScreen: Data-driven Pros/Cons | Tasks 2 + 6 |
| ImpactScreen: Teacher Insights | Task 7 (Teachers tab) |
| ImpactScreen: Regional Visibility metrics | Task 7 (Sponsors tab) |
| FAQScreen: EU Compliance Hub | Task 8 |
| FAQScreen: GDPR section | Task 8 |
| FAQScreen: 16+ Consent gate | Tasks 3 + 8 |
| FAQScreen: Terms of Service | Task 8 |
| FAQScreen: Interactive Q&A | Task 8 |
| Preserve CSS variable / dark mode / accessibility suite | All tasks (never touch `src/index.css`) |

### Placeholder Scan
No "TBD", "TODO", or "similar to" references found. All code blocks are complete and self-contained.

### Type Consistency
- `swipeResults` shape: `{ [category: string]: { liked: number, total: number } }` — consistent between `handleSwipeResult` (Task 3), `SwipeScreen.onSwipeResult` (Task 5), `BridgeScreen.swipeResults` (Task 6), `ImpactScreen.swipeResults` (Task 7).
- `calcMatch(pathway, swipeResults)` signature defined in Task 2 and called in Task 6 — consistent.
- `t(language, key, vars?)` defined in Task 1, used in Tasks 3–8 — consistent.
- `hasConsent`: `null | boolean` — `null` = undecided (shows consent gate in Task 8); `true`/`false` set via `onConsent` — consistent between Task 3 (state) and Task 8 (gate logic).

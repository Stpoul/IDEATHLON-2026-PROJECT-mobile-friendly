# Dynamic Age Engine — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the SkillSwipe age-aware demo by adding JUNIOR/SENIOR swipe decks, a Skill Themes view for under-16s, a "Generate Regional CV" button for 16+, and a proper OpenDyslexic font fix.

**Architecture:** All changes are isolated to four files. `SwipeScreen` picks a deck at render time based on the `ageGroup` prop. `BridgeScreen` branches on `ageGroup` to render either a `SkillThemesView` inline section or the existing pathway list with a CV button appended. New i18n keys are added up front so every task can reference them. No new files are needed.

**Tech Stack:** React 18, Vite, Tailwind CSS, Lucide-react, CSS custom properties, Google Fonts CDN (for OpenDyslexic via cdnfonts.com).

---

## What Is Already Done (skip these)

The following items from the PRD are **fully implemented** — do not rebuild them:

- `App.jsx`: Colorblind SVG filter matrices, CSS filter classes, `font-dyslexic` toggle, high contrast, font size, dark mode, language toggle, God Mode `ageGroup` toggle in the Settings modal, `handleAddXp`, `handleResetXp` — all wired up and passed as props.
- `index.css`: All `.filter-*`, `.font-dyslexic`, `.text-size-*`, `.high-contrast`, `.dark` classes.
- `RoadmapScreen.jsx`: Rewards modal, `+100 XP` button, `Reset XP` button — completely done.
- `BridgeScreen.jsx`: 16+ scholarship banner, Pros/Cons, Actionable Steps — all present.

---

## File Map

| File | Change |
|------|--------|
| `index.html` | Add cdnfonts.com `<link>` for OpenDyslexic |
| `src/i18n.js` | Add translation keys for skill themes, CV button, and junior swipe labels |
| `src/screens/SwipeScreen.jsx` | Replace single `SCENARIOS` with `JUNIOR_DECK` + `SENIOR_DECK`; consume `ageGroup` prop |
| `src/screens/BridgeScreen.jsx` | Add `SKILL_THEMES` data + `SkillThemesView` branch for under16; add CV button + modal for 16+ |

---

## Task 1: Fix OpenDyslexic Font Loading

**Files:**
- Modify: `index.html`

The `font-dyslexic` CSS class already sets `font-family: 'OpenDyslexic'` but no `@font-face` or CDN import exists, so the font silently falls back to Comic Sans. Adding a single `<link>` tag in `index.html` fixes this.

- [ ] **Step 1: Add the CDN link in `index.html`**

Open `index.html` and add after the existing Google Fonts `<link>` tags:

```html
<link href="https://fonts.cdnfonts.com/css/opendyslexic" rel="stylesheet">
```

Final `<head>` font block should look like:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link href="https://fonts.cdnfonts.com/css/opendyslexic" rel="stylesheet">
```

- [ ] **Step 2: Verify visually**

Run `npm run dev`, open the app, tap the accessibility button (top-right), toggle **Dyslexic Font**. All text should switch to the rounded OpenDyslexic letterforms. Toggle off — text returns to Montserrat.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "fix: load OpenDyslexic via cdnfonts CDN so font-dyslexic class works"
```

---

## Task 2: Add i18n Keys for New Features

**Files:**
- Modify: `src/i18n.js`

Add all keys needed by Tasks 3 and 4 before touching any screen component. Both `en` and `cz` blocks must be updated.

- [ ] **Step 1: Add keys to the `en` block**

Inside the `en: { ... }` object in `src/i18n.js`, append the following block **before the closing `},`** of the `en` object:

```js
    // SwipeScreen junior categories
    cat_Empathy: 'Empathy',
    cat_Curiosity: 'Curiosity',
    // BridgeScreen — under16 Skill Themes view
    bridge_themes_title: 'Your Skill Themes',
    bridge_themes_subtitle: 'Based on your swipes so far',
    bridge_theme_tech: 'Tech & Engineering',
    bridge_theme_tech_desc: 'You lean toward building, coding, and solving technical challenges.',
    bridge_theme_creative: 'Creative Arts',
    bridge_theme_creative_desc: "Your imagination and artistic flair stand out — design, media, or music could be your path.",
    bridge_theme_science: 'Science & Research',
    bridge_theme_science_desc: 'You are driven by curiosity and love understanding how the world works.',
    bridge_theme_social: 'Social & Healthcare',
    bridge_theme_social_desc: 'You thrive when helping others — caring professions suit you.',
    bridge_theme_business: 'Business & Enterprise',
    bridge_theme_business_desc: 'You have a head for ideas, strategy, and making things happen.',
    bridge_theme_outdoors: 'Outdoors & Environment',
    bridge_theme_outdoors_desc: "You feel at home in nature and care about our planet's future.",
    bridge_theme_match: 'Alignment',
    bridge_themes_no_swipes: 'Complete some Discover cards to see your Skill Themes!',
    // BridgeScreen — Generate Regional CV
    bridge_cv_btn: 'Generate Regional CV',
    bridge_cv_modal_title: '🎓 Your Talent Portfolio',
    bridge_cv_modal_body: 'Your 4-year swipe data is compiled into a Talent Portfolio ready to send to local universities and companies in the Liberec Region.',
    bridge_cv_modal_cta: 'Download Portfolio (Demo)',
    bridge_cv_modal_close: 'Close',
```

- [ ] **Step 2: Add keys to the `cz` block**

Inside the `cz: { ... }` object, append:

```js
    // SwipeScreen junior categories
    cat_Empathy: 'Empatie',
    cat_Curiosity: 'Zvídavost',
    // BridgeScreen — under16 Skill Themes view
    bridge_themes_title: 'Tvá dovednostní témata',
    bridge_themes_subtitle: 'Na základě tvých dosavadních voleb',
    bridge_theme_tech: 'Technika a inženýrství',
    bridge_theme_tech_desc: 'Tíhneš ke stavění, programování a řešení technických výzev.',
    bridge_theme_creative: 'Kreativní umění',
    bridge_theme_creative_desc: 'Tvá fantazie a umělecký talent vynikají — design, média nebo hudba mohou být tvou cestou.',
    bridge_theme_science: 'Věda a výzkum',
    bridge_theme_science_desc: 'Pohání tě zvědavost a rád/a chápeš, jak svět funguje.',
    bridge_theme_social: 'Sociální a zdravotnictví',
    bridge_theme_social_desc: 'Daří se ti, když pomáháš druhým — pečující profese ti sedí.',
    bridge_theme_business: 'Podnikání',
    bridge_theme_business_desc: 'Máš hlavu na nápady, strategii a uskutečňování věcí.',
    bridge_theme_outdoors: 'Příroda a životní prostředí',
    bridge_theme_outdoors_desc: 'Cítíš se doma v přírodě a záleží ti na budoucnosti planety.',
    bridge_theme_match: 'Shoda',
    bridge_themes_no_swipes: 'Dokonči karty Objevuj a uvidíš svá dovednostní témata!',
    // BridgeScreen — Generate Regional CV
    bridge_cv_btn: 'Generovat regionální CV',
    bridge_cv_modal_title: '🎓 Tvé talentové portfolio',
    bridge_cv_modal_body: 'Tvá 4letá data ze swipování jsou zkompilována do Talentového portfolia připraveného k odeslání místním univerzitám a firmám v Libereckém kraji.',
    bridge_cv_modal_cta: 'Stáhnout portfolio (Demo)',
    bridge_cv_modal_close: 'Zavřít',
```

- [ ] **Step 3: Verify the app still loads**

Run `npm run dev` — no console errors, all existing screens render correctly.

- [ ] **Step 4: Commit**

```bash
git add src/i18n.js
git commit -m "feat: add i18n keys for skill themes view and regional CV button"
```

---

## Task 3: SwipeScreen — JUNIOR_DECK and SENIOR_DECK

**Files:**
- Modify: `src/screens/SwipeScreen.jsx`

Currently `SwipeScreen` has one `SCENARIOS` array and ignores the `ageGroup` prop. Replace it with two decks selected at render time.

- [ ] **Step 1: Replace the SCENARIOS constant with two deck arrays**

In `src/screens/SwipeScreen.jsx`, replace the entire `const SCENARIOS = [...]` block with:

```js
const JUNIOR_DECK = [
  { e: '🔧', text: { en: 'Do you enjoy fixing things around the house?', cz: 'Baví tě opravovat věci doma?' }, c: 'Technical' },
  { e: '🎨', text: { en: 'Do you love drawing, painting, or making art?', cz: 'Miluješ kreslení, malování nebo tvorbu umění?' }, c: 'Creative' },
  { e: '🌱', text: { en: 'Do you care about protecting nature and animals?', cz: 'Záleží ti na ochraně přírody a zvířat?' }, c: 'Outdoors' },
  { e: '🤝', text: { en: 'Do you enjoy helping friends when they have problems?', cz: 'Baví tě pomáhat přátelům s jejich problémy?' }, c: 'Social' },
  { e: '🔢', text: { en: 'Do you like solving puzzles and brain teasers?', cz: 'Rád/a řešíš hádanky a hlavolamy?' }, c: 'Logic' },
  { e: '🧪', text: { en: 'Are you curious about how things work scientifically?', cz: 'Jsi zvídavý/á, jak věci fungují vědecky?' }, c: 'Science' },
  { e: '💰', text: { en: 'Do you like coming up with ideas to earn money?', cz: 'Rád/a vymýšlíš nápady, jak vydělat peníze?' }, c: 'Business' },
  { e: '🏥', text: { en: 'Would you enjoy taking care of someone who is sick?', cz: 'Baví tě starat se o nemocné lidi?' }, c: 'Healthcare' },
  { e: '🖥️', text: { en: 'Do you spend a lot of time using computers or tablets?', cz: 'Trávíš hodně času u počítačů nebo tabletů?' }, c: 'Technical' },
  { e: '🎭', text: { en: 'Do you enjoy acting, performing, or telling stories?', cz: 'Baví tě hrát divadlo, vystupovat nebo vyprávět příběhy?' }, c: 'Creative' },
  { e: '📚', text: { en: '"I wish my teachers used more hands-on experiments in class."', cz: '"Přál/a bych si, aby učitelé používali více praktických pokusů."' }, c: 'ts_experiments' },
  { e: '💡', text: { en: '"I find it easier to learn through videos than lectures."', cz: '"Snáze se učím přes videa než přednášky."' }, c: 'ts_video' },
  { e: '🖥️', text: { en: '"I learn better when we work in groups rather than alone."', cz: '"Lépe se učím, když pracujeme ve skupinách."' }, c: 'ts_group' },
];

const SENIOR_DECK = [
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
  { e: '📚', text: { en: '"I wish my teachers used more hands-on experiments in class."', cz: '"Přál/a bych si, aby učitelé používali více praktických pokusů."' }, c: 'ts_experiments' },
  { e: '💡', text: { en: '"I find it easier to learn through videos than lectures."', cz: '"Snáze se učím přes videa než přednášky."' }, c: 'ts_video' },
  { e: '🖥️', text: { en: '"I learn better when we work in groups rather than alone."', cz: '"Lépe se učím, když pracujeme ve skupinách."' }, c: 'ts_group' },
  { e: '📝', text: { en: '"I prefer digital assignments over paper-based ones."', cz: '"Preferuji digitální zadání před papírovými."' }, c: 'ts_digital' },
  { e: '📱', text: { en: '"I would like more interactive apps like this to help me learn."', cz: '"Chtěl/a bych více interaktivních aplikací jako tato."' }, c: 'ts_apps' },
  { e: '🧪', text: { en: '"I prefer learning by doing rather than reading from a book."', cz: '"Raději se učím praxí než čtením z knihy."' }, c: 'ts_practical' },
];
```

- [ ] **Step 2: Update the component signature and deck selection**

Change the component definition from:

```js
export default function SwipeScreen({ onNavigate, globalStreak, language, onSwipeResult }) {
  const [idx, setIdx] = useState(0);
```

to:

```js
export default function SwipeScreen({ onNavigate, globalStreak, language, onSwipeResult, ageGroup }) {
  const DECK = ageGroup === '16plus' ? SENIOR_DECK : JUNIOR_DECK;
  const [idx, setIdx] = useState(0);
```

- [ ] **Step 3: Replace all references to `SCENARIOS` with `DECK`**

In the component body, make these three replacements:

1. `onSwipeResult(SCENARIOS[idx].c, liked);` → `onSwipeResult(DECK[idx].c, liked);`
2. `if (idx < SCENARIOS.length - 1) {` → `if (idx < DECK.length - 1) {`
3. `const card = SCENARIOS[idx];` → `const card = DECK[idx];`

Also update the progress bar JSX line:

```jsx
<span>{t(language, 'swipe_progress', { current: idx + 1, total: DECK.length })}</span>
<span>{Math.round(((idx + 1) / DECK.length) * 100)}%</span>
```

and:

```jsx
style={{ width: `${((idx + 1) / DECK.length) * 100}%` }}
```

- [ ] **Step 4: Reset the index when ageGroup changes**

Add a `useEffect` import if not already present. Add the following effect after the `const [idx, setIdx] = useState(0);` line:

```js
  useEffect(() => { setIdx(0); }, [ageGroup]);
```

(Import `useEffect` by updating the first import line: `import { useState, useEffect } from 'react';`)

- [ ] **Step 5: Verify visually**

Run `npm run dev`. Open the Settings modal, toggle **Age Group** between Under 16 and 16+. Navigate to the Discover tab. Confirm:
- Under 16 deck shows broad, simple questions (e.g., "Do you enjoy fixing things around the house?")
- 16+ deck shows career-targeted questions (e.g., "Launch a small business idea…")
- Card count updates correctly for each deck
- Swiping through to the end navigates to Connect tab

- [ ] **Step 6: Commit**

```bash
git add src/screens/SwipeScreen.jsx
git commit -m "feat: add JUNIOR_DECK and SENIOR_DECK to SwipeScreen, driven by ageGroup prop"
```

---

## Task 4: BridgeScreen — Skill Themes for Under-16 + Generate CV Button for 16+

**Files:**
- Modify: `src/screens/BridgeScreen.jsx`

Two independent additions: (a) when `ageGroup === 'under16'`, replace the entire tab/pathway list with a Skill Themes grid; (b) when `ageGroup === '16plus'`, append a "Generate Regional CV" button below the scholarship banner, with a modal.

- [ ] **Step 1: Add the `SKILL_THEMES` constant and `calcThemeMatch` helper**

At the top of `BridgeScreen.jsx`, after the existing imports, add:

```js
const SKILL_THEMES = [
  {
    id: 'tech',
    emoji: '💻',
    nameKey: 'bridge_theme_tech',
    descKey: 'bridge_theme_tech_desc',
    matchCategories: ['Technical', 'Logic'],
  },
  {
    id: 'creative',
    emoji: '🎨',
    nameKey: 'bridge_theme_creative',
    descKey: 'bridge_theme_creative_desc',
    matchCategories: ['Creative'],
  },
  {
    id: 'science',
    emoji: '🔬',
    nameKey: 'bridge_theme_science',
    descKey: 'bridge_theme_science_desc',
    matchCategories: ['Science'],
  },
  {
    id: 'social',
    emoji: '🤝',
    nameKey: 'bridge_theme_social',
    descKey: 'bridge_theme_social_desc',
    matchCategories: ['Healthcare', 'Social'],
  },
  {
    id: 'business',
    emoji: '📈',
    nameKey: 'bridge_theme_business',
    descKey: 'bridge_theme_business_desc',
    matchCategories: ['Business'],
  },
  {
    id: 'outdoors',
    emoji: '🌲',
    nameKey: 'bridge_theme_outdoors',
    descKey: 'bridge_theme_outdoors_desc',
    matchCategories: ['Outdoors'],
  },
];

function calcThemeMatch(theme, swipeResults) {
  let liked = 0;
  let total = 0;
  theme.matchCategories.forEach(cat => {
    const r = swipeResults[cat];
    if (r) { liked += r.liked; total += r.total; }
  });
  if (total === 0) return 0;
  return Math.round((liked / total) * 100);
}
```

- [ ] **Step 2: Add `showCvModal` state to the component**

Update the component definition from:

```js
export default function BridgeScreen({ language, swipeResults, ageGroup }) {
  const [expanded, setExpanded] = useState(null);
  const [activeTab, setActiveTab] = useState('university');
```

to:

```js
export default function BridgeScreen({ language, swipeResults, ageGroup }) {
  const [expanded, setExpanded] = useState(null);
  const [activeTab, setActiveTab] = useState('university');
  const [showCvModal, setShowCvModal] = useState(false);
```

- [ ] **Step 3: Add the Skill Themes view branch**

In `BridgeScreen.jsx`, wrap the existing return content in an age-group branch. Replace the JSX starting from `<div className="flex bg-[var(--card)]...` (the tab switcher div) all the way to the closing `</div>` of the screen (just before `return`'s closing `)`), replacing it with:

```jsx
      {ageGroup === 'under16' ? (
        /* ── JUNIOR VIEW: Skill Themes ── */
        <div className="flex-1 overflow-y-auto pb-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-4">{t(language, 'bridge_themes_subtitle')}</p>
          {Object.values(swipeResults).every(r => r.total === 0) || Object.keys(swipeResults).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-5xl mb-4">🃏</span>
              <p className="text-sm font-bold text-[var(--foreground)]">{t(language, 'bridge_themes_no_swipes')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {SKILL_THEMES.map(theme => {
                const match = calcThemeMatch(theme, swipeResults);
                return (
                  <div key={theme.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{theme.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-[var(--foreground)]">{t(language, theme.nameKey)}</p>
                        <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{t(language, theme.descKey)}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${matchColor(match)}`}>
                        {match}%
                      </div>
                    </div>
                    <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                        style={{ width: `${match}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* ── SENIOR VIEW: University / Vocational Pathways ── */
        <>
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

          <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl p-4 mb-3 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🏆</span>
              <p className="font-extrabold text-sm text-white">{t(language, 'bridge_scholarship_title')}</p>
            </div>
            <p className="text-xs text-white/90 mb-3">{t(language, 'bridge_scholarship_desc')}</p>
            <button className="bg-white text-amber-600 font-bold text-xs py-2 px-4 rounded-xl active:scale-95 transition-all">
              {t(language, 'bridge_scholarship_cta')}
            </button>
          </div>

          <button
            onClick={() => setShowCvModal(true)}
            className="w-full mb-4 flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-bold text-sm py-3.5 rounded-2xl active:scale-95 transition-all shadow-md"
          >
            📄 {t(language, 'bridge_cv_btn')}
          </button>

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

                      <p className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-widest mb-2 mt-4">
                        {t(language, 'bridge_steps')}
                      </p>
                      <ol className="space-y-1.5">
                        {(pathway.steps[language] ?? pathway.steps.en).map((step, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[10px] font-extrabold text-[var(--primary)] mt-0.5 w-4 shrink-0">{i + 1}.</span>
                            <span className="text-xs text-[var(--foreground)]">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
```

> **Note:** The above replaces everything between `<div className="flex bg-[var(--card)]` and the final `</div>` before the outer screen `</div>`. The outer `<div className="flex-1 flex flex-col ...">` wrapper and header `<div className="pt-8 mb-4">` remain unchanged.

- [ ] **Step 4: Add the CV modal**

After the outer screen `</div>` (just before the function's closing `}`), add the modal:

```jsx
      {showCvModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-end justify-center backdrop-blur-sm">
          <div className="bg-[var(--card)] w-full max-w-[448px] p-6 rounded-t-[30px] shadow-2xl">
            <h2 className="text-xl font-bold mb-3">{t(language, 'bridge_cv_modal_title')}</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6 leading-relaxed">
              {t(language, 'bridge_cv_modal_body')}
            </p>
            <button
              className="w-full bg-[var(--primary)] text-white font-bold py-3.5 rounded-2xl mb-3 active:scale-95 transition-all"
              onClick={() => setShowCvModal(false)}
            >
              {t(language, 'bridge_cv_modal_cta')}
            </button>
            <button
              className="w-full border-2 border-[var(--border)] text-[var(--muted-foreground)] font-bold py-3 rounded-2xl active:scale-95 transition-all"
              onClick={() => setShowCvModal(false)}
            >
              {t(language, 'bridge_cv_modal_close')}
            </button>
          </div>
        </div>
      )}
```

The complete component now returns a fragment `<>...</>` wrapping the screen div and the CV modal.

- [ ] **Step 5: Verify visually — Under 16 path**

In Settings modal, set Age Group to **Under 16**. Navigate to Connect tab. Confirm:
- No tab switcher or scholarship banner is visible
- Skill Themes grid appears with 6 theme cards
- If no swipes done: empty state with "Complete some Discover cards" message
- If swipes done: each card shows a percentage bar and colored badge
- All text renders in both EN and CZ without missing-key fallbacks

- [ ] **Step 6: Verify visually — 16+ path**

Set Age Group to **16+**. Navigate to Connect tab. Confirm:
- University/Vocational tab switcher is visible
- Amber scholarship banner appears
- "Generate Regional CV" purple button appears between banner and pathway list
- Tapping the CV button opens the modal
- Both modal buttons close it
- Pathway accordion still expands/collapses correctly with Pros/Cons/Steps

- [ ] **Step 7: Commit**

```bash
git add src/screens/BridgeScreen.jsx
git commit -m "feat: add Skill Themes view for under-16 and Generate Regional CV button for 16+ in BridgeScreen"
```

---

## Self-Review Checklist

| Spec requirement | Covered by |
|---|---|
| Dyslexic font actually loads | Task 1 — cdnfonts.com CDN link |
| God Mode ageGroup toggle | Already done — not rebuilt |
| SVG colorblind filters | Already done — not rebuilt |
| Rewards modal | Already done — not rebuilt |
| +100 XP / Reset XP buttons | Already done — not rebuilt |
| `ageGroup` prop consumed by SwipeScreen | Task 3 Step 2 |
| JUNIOR_DECK (broad discovery, simple questions) | Task 3 Step 1 |
| SENIOR_DECK (career/uni targeted questions) | Task 3 Step 1 |
| Deck resets when ageGroup changes | Task 3 Step 4 |
| Under-16 BridgeScreen → Skill Themes grid | Task 4 Steps 1 & 3 |
| Skill Themes empty state | Task 4 Step 3 |
| 16+ BridgeScreen → scholarship banner | Already done — preserved in Task 4 |
| 16+ BridgeScreen → Pros/Cons/Actionable Steps | Already done — preserved in Task 4 |
| 16+ BridgeScreen → "Generate Regional CV" button | Task 4 Steps 3 & 4 |
| CV modal (demo) | Task 4 Step 4 |
| All new strings bilingual (EN + CZ) | Task 2 |

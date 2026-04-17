# Pitch Edition v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two net-new features: a "Reset XP" demo button on RoadmapScreen and an "Actionable Next Steps" numbered list inside each expanded BridgeScreen pathway accordion.

**Architecture:** Features 1–3 from the original Pitch Edition plan (index.css specificity, App.jsx colorblind/ageGroup, RoadmapScreen Rewards modal, BridgeScreen scholarship banner) are **already shipped**. This plan covers only the delta: `handleResetXp` wired from App.jsx → RoadmapScreen via `onResetXp` prop, and a bilingual `steps` field added to all 6 PATHWAYS entries in `matchEngine.js` rendered as a numbered `<ol>` below the Cons section in BridgeScreen.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Lucide React, Vitest (existing)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/i18n.js` | Add 4 keys: `rewards_reset_xp`, `bridge_steps` (EN + CZ) |
| Modify | `src/App.jsx` | Add `handleResetXp`, pass `onResetXp` to `ActiveScreen` |
| Modify | `src/screens/RoadmapScreen.jsx` | Accept `onResetXp`, add RotateCcw Reset button to action row |
| Modify | `src/lib/matchEngine.js` | Add `steps: { en, cz }` to all 6 PATHWAYS entries |
| Modify | `src/lib/matchEngine.test.js` | Extend schema test to validate `steps` field |
| Modify | `src/screens/BridgeScreen.jsx` | Render Next Steps `<ol>` below Cons in expanded accordion |

---

## Task 0: Add i18n keys to `src/i18n.js`

**Files:**
- Modify: `src/i18n.js`

No new tests — the `t()` function already has full test coverage and the dictionary is pure data.

- [ ] **Step 1: Add keys to the English (`en`) block**

Open `src/i18n.js`. Find `rewards_xp_demo: '+100 XP (Demo)',` and insert **after** it (still inside the `en` object):

```js
    rewards_reset_xp: 'Reset XP',
```

Then find `bridge_scholarship_cta: 'Explore Scholarships',` and insert **after** it:

```js
    bridge_steps: 'Next Steps',
```

- [ ] **Step 2: Add keys to the Czech (`cz`) block**

Find `rewards_xp_demo: '+100 XP (Demo)',` in the `cz` block and insert **after** it:

```js
    rewards_reset_xp: 'Resetovat XP',
```

Then find `bridge_scholarship_cta: 'Prozkoumat stipendia',` in the `cz` block and insert **after** it:

```js
    bridge_steps: 'Další kroky',
```

- [ ] **Step 3: Run tests — verify all still pass**

```bash
cd "/Users/test/Desktop/IDEATHLON 2026 PROJECT copy" && npm test 2>&1 | tail -6
```

Expected: `3 passed`, `21 passed`.

- [ ] **Step 4: Commit**

```bash
git add src/i18n.js
git commit -m "feat: add i18n keys for reset XP and bridge next steps"
```

---

## Task 1: Add `handleResetXp` to `src/App.jsx`

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add `handleResetXp` after `handleAddXp`**

Open `src/App.jsx`. Find:

```js
  const handleAddXp = () => setXp(prev => Math.min(prev + 100, 999));
```

Replace with:

```js
  const handleAddXp = () => setXp(prev => Math.min(prev + 100, 999));
  const handleResetXp = () => setXp(0);
```

- [ ] **Step 2: Pass `onResetXp` to `ActiveScreen`**

Find the `ActiveScreen` props block:

```jsx
              onAddXp={handleAddXp}
```

Replace with:

```jsx
              onAddXp={handleAddXp}
              onResetXp={handleResetXp}
```

- [ ] **Step 3: Run tests — verify all still pass**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed`, `21 passed`.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add handleResetXp handler and pass onResetXp prop to screens"
```

---

## Task 2: Add Reset XP button to `src/screens/RoadmapScreen.jsx`

**Files:**
- Modify: `src/screens/RoadmapScreen.jsx`

- [ ] **Step 1: Add `RotateCcw` to the lucide-react import**

Find:

```jsx
import { useState } from 'react';
import { Sparkles, Users, TrendingUp, CheckCircle2, Lock, ChevronRight, Star, Trophy, Plus, X } from 'lucide-react';
```

Replace with:

```jsx
import { useState } from 'react';
import { Sparkles, Users, TrendingUp, CheckCircle2, Lock, ChevronRight, Star, Trophy, Plus, X, RotateCcw } from 'lucide-react';
```

- [ ] **Step 2: Accept `onResetXp` in the function signature**

Find:

```jsx
export default function RoadmapScreen({ onNavigate, globalXp, onAddXp, language }) {
```

Replace with:

```jsx
export default function RoadmapScreen({ onNavigate, globalXp, onAddXp, onResetXp, language }) {
```

- [ ] **Step 3: Add the Reset XP button to the action buttons row**

Find the entire action buttons `<div>` (the block with `{/* Action Buttons */}`):

```jsx
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
```

Replace with:

```jsx
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
          <button
            onClick={onResetXp}
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] font-bold text-xs py-3 rounded-xl active:scale-95 transition-all shadow-sm"
          >
            <RotateCcw size={15} />
            {t(language, 'rewards_reset_xp')}
          </button>
        </div>
```

- [ ] **Step 4: Run tests — verify all still pass**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed`, `21 passed`.

- [ ] **Step 5: Verify in browser**

Run `npm run dev`. On the Journey tab:
- Three buttons appear below the XP bar: "Rewards" (amber trophy) | "+100 XP (Demo)" (green) | "Reset XP" (grey, RotateCcw icon)
- Tapping "+100 XP (Demo)" increments XP and may evolve the pet
- Tapping "Reset XP" immediately resets XP to 0, pet reverts to 🥚, progress bar empties
- All three buttons switch text correctly when toggling EN ↔ CZ

- [ ] **Step 6: Commit**

```bash
git add src/screens/RoadmapScreen.jsx
git commit -m "feat: add Reset XP demo button to RoadmapScreen action row"
```

---

## Task 3: Add `steps` data to `src/lib/matchEngine.js`

**Files:**
- Modify: `src/lib/matchEngine.js`

Each PATHWAY gets a `steps` field: `{ en: string[], cz: string[] }` with 4 actionable items (deadline/application, test/prep, housing/logistics, scholarship/grant).

- [ ] **Step 1: Replace the full `PATHWAYS` export with the updated version**

Open `src/lib/matchEngine.js`. Replace the entire `PATHWAYS` array (lines 1–98) with:

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
    steps: {
      en: ['Apply by 15 March via IS STAG portal', 'Attend campus open day (January)', 'Arrange housing via TUL student portal', 'Check TUL regional merit scholarship'],
      cz: ['Podej přihlášku do 15. března přes IS STAG', 'Navštiv den otevřených dveří (leden)', 'Zařiď ubytování přes studentský portál TUL', 'Zjisti podmínky regionálního prospěchového stipendia TUL'],
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
    steps: {
      en: ['Apply by 28 February via UP e-prihlaska portal', 'Register for SCIO entrance test (Nov–Feb)', 'Research student dormitories in Olomouc', 'Apply for Erasmus+ mobility grant'],
      cz: ['Podej přihlášku do 28. února přes UP e-přihlášku', 'Zaregistruj se na test SCIO (nov–únor)', 'Zjisti dostupnost kolejí v Olomouci', 'Požádej o grant Erasmus+'],
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
    steps: {
      en: ['Prepare portfolio with 3+ original projects', 'Apply by 1 April via VŠPJ admissions', 'Check affordable housing options in Jihlava', 'Apply for creative arts grant via Czech Ministry of Culture'],
      cz: ['Připrav portfolio s 3+ originálními projekty', 'Podej přihlášku do 1. dubna přes přijímačky VŠPJ', 'Zjisti dostupné ubytování v Jihlavě', 'Požádej o grant pro kreativní obory přes MK ČR'],
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
    steps: {
      en: ['Contact regional apprenticeship office by September', 'Interview with partner companies (Sept–Oct)', 'Apply for vocational training grant via ÚP ČR', 'Register with local Úřad práce job centre'],
      cz: ['Kontaktuj regionální úřad učňovského vzdělávání do září', 'Pohovor s partnerskými podniky (září–říjen)', 'Požádej o příspěvek na odborné vzdělávání přes ÚP ČR', 'Zaregistruj se na místním úřadu práce'],
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
    steps: {
      en: ['Submit application to regional hospital by May', 'Complete first-aid certification course', 'Apply for Czech healthcare training scholarship', 'Book a hospital shadow day to confirm fit'],
      cz: ['Odevzdej přihlášku do regionální nemocnice do května', 'Absolvuj kurz první pomoci', 'Požádej o stipendium pro zdravotnické vzdělávání v ČR', 'Domluv si stínování v nemocnici pro potvrzení zájmu'],
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
    steps: {
      en: ['Enrol for online intake (rolling admissions)', 'Set up freelance profile on regional platform', 'Join Liberec Digital Community Hub', 'Apply for EU Digital Skills & Jobs grant'],
      cz: ['Zaregistruj se na online přijímání (průběžný příjem)', 'Vytvoř freelancerský profil na regionální platformě', 'Připoj se k Libereckému digitálnímu komunitnímu centru', 'Požádej o grant EU Digital Skills & Jobs'],
    },
  },
];
```

Leave `calcMatch` unchanged (lines 100–112).

- [ ] **Step 2: Run tests — verify existing tests still pass**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed`, `21 passed` — existing matchEngine tests pass because `calcMatch` and the 6-pathway count are unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/lib/matchEngine.js
git commit -m "feat: add bilingual steps (actionable next steps) to all 6 PATHWAYS"
```

---

## Task 4: Add `steps` validation to `src/lib/matchEngine.test.js`

**Files:**
- Modify: `src/lib/matchEngine.test.js`

- [ ] **Step 1: Write the failing tests**

Open `src/lib/matchEngine.test.js`. Find the last `it(...)` block inside the `describe('calcMatch()')`:

```js
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
```

Replace with:

```js
  it('each pathway has id, type, emoji, name, weights, pros, cons, steps', () => {
    PATHWAYS.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('type');
      expect(p).toHaveProperty('emoji');
      expect(p.name).toHaveProperty('en');
      expect(p.name).toHaveProperty('cz');
      expect(p).toHaveProperty('weights');
      expect(p.pros).toHaveProperty('en');
      expect(p.cons).toHaveProperty('en');
      expect(p.steps).toHaveProperty('en');
      expect(p.steps).toHaveProperty('cz');
    });
  });

  it('each pathway steps has at least 3 items per language', () => {
    PATHWAYS.forEach(p => {
      expect(p.steps.en.length).toBeGreaterThanOrEqual(3);
      expect(p.steps.cz.length).toBeGreaterThanOrEqual(3);
    });
  });
```

- [ ] **Step 2: Run tests — verify all pass (steps data already added in Task 3)**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed`, `23 passed` (21 existing + 2 new).

- [ ] **Step 3: Commit**

```bash
git add src/lib/matchEngine.test.js
git commit -m "test: validate steps field schema on all PATHWAYS"
```

---

## Task 5: Render Actionable Next Steps in `src/screens/BridgeScreen.jsx`

**Files:**
- Modify: `src/screens/BridgeScreen.jsx`

- [ ] **Step 1: Add the Next Steps section inside the expanded accordion**

Open `src/screens/BridgeScreen.jsx`. Find the end of the Cons `<ul>` inside the `isOpen` block:

```jsx
                  <ul className="space-y-1.5">
                    {(pathway.cons[language] ?? pathway.cons.en).map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle size={13} className="text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-[var(--foreground)]">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
```

Replace with:

```jsx
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
```

- [ ] **Step 2: Run tests — verify all pass**

```bash
npm test 2>&1 | tail -6
```

Expected: `3 passed`, `23 passed`.

- [ ] **Step 3: Verify in browser**

Run `npm run dev`. Navigate to Connect tab → expand any pathway card:
- Pros section (green) renders as before
- Cons section (amber) renders as before
- A new "NEXT STEPS" section (indigo label) renders below Cons with a numbered list (1.–4.)
- All 4 steps are relevant to that pathway (e.g., TUL Engineering: IS STAG portal deadline, open day, housing, scholarship)
- Switch language to CZ → steps switch to Czech text
- Dark mode: indigo label renders as `dark:text-indigo-400` (lighter), text uses `text-[var(--foreground)]` (correct)

- [ ] **Step 4: Commit**

```bash
git add src/screens/BridgeScreen.jsx
git commit -m "feat: BridgeScreen — Actionable Next Steps numbered list in expanded pathway accordion"
```

---

## Self-Review

### Spec Coverage

| Requirement | Task |
|---|---|
| index.css: `.font-dyslexic *` specificity fix | ✅ Already shipped (commit c0383d3) |
| App.jsx: SVG `<feColorMatrix>` colorblind filters | ✅ Already shipped (commit 965b3db) |
| App.jsx: Colorblind Mode UI + ageGroup demo controls | ✅ Already shipped (commit 965b3db) |
| RoadmapScreen: Rewards modal (achievements + perks) | ✅ Already shipped (commit dfb8646) |
| RoadmapScreen: "+100 XP (Demo)" button | ✅ Already shipped (commit dfb8646) |
| RoadmapScreen: "Reset XP" button (RotateCcw) → resets to 0 | Task 1 + Task 2 |
| BridgeScreen: Scholarship banner gated on `ageGroup === '16plus'` | ✅ Already shipped (commit ff666d3) |
| BridgeScreen: Actionable Next Steps inside expanded pathway accordion | Task 3 + Task 5 |
| All new strings via EN/CZ i18n | Task 0 |

### Placeholder Scan

No "TBD", "similar to", "fill in", or incomplete code blocks found.

### Type Consistency

- `onResetXp`: `() => void` — defined as `handleResetXp` in Task 1 (App.jsx); called as `onResetXp()` in Task 2 (RoadmapScreen). ✓
- `pathway.steps`: `{ en: string[], cz: string[] }` — added in Task 3; consumed as `pathway.steps[language] ?? pathway.steps.en` in Task 5 (same pattern as `pathway.pros` and `pathway.cons` already in BridgeScreen). ✓
- `bridge_steps` i18n key — added in Task 0; consumed via `t(language, 'bridge_steps')` in Task 5. ✓
- `rewards_reset_xp` i18n key — added in Task 0; consumed via `t(language, 'rewards_reset_xp')` in Task 2. ✓

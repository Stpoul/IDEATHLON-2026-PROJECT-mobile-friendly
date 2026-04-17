# PRD: SkillSwipe (EU Winner & Pitch Edition)
**Event:** Liberec Ideathon 2026
**Mission:** School-Integrated Regional Talent Pipeline & Economic Driver.

## 1. Business, Legal & Economic Architecture
* **GTM:** School-Led B2B distribution for 8th-10th grade. B2C Freemium for 16+.
* **Regional Economy Integration:** Real-world regional rewards (e.g., Liberec Cinema).
* **Compliance:** GDPR-by-Design, EU Age of Consent (16+), RUN Network ready (EN/CZ).

## 2. Core Mechanics & The Autonomy Framework
* **Dynamic Age Engine:** * *Under 16 (Junior):* Swipe questions focus on broad skill discovery (e.g., "Do you like fixing things?"). Bridge screen shows general "Theme Matches" (e.g., "You lean towards Tech").
  * *16+ (Senior):* Swipe questions focus on targeted career/uni choices. Bridge screen shows exact "Pathways" with Pros/Cons and **Actionable Steps (Housing, Deadlines)**.
* **The 1-Click Regional CV:** 16+ users can instantly generate a Talent Portfolio based on their 4-year swipe data to send to local universities or companies.
* **God Mode Demo Suite:** Toggles for Age (Junior/Senior), +100 XP, and Reset XP.

## 3. Screen Specifications & Accessibility
1. **RoadmapScreen:** 3-Stage Timeline, Pet Evolution, Rewards modal, +100 XP, and Reset XP buttons.
2. **SwipeScreen:** Consumes `ageGroup` prop to dynamically load JUNIOR or SENIOR question decks.
3. **BridgeScreen:** * If Junior: Displays "Skill Themes" and basic community forum.
   * If Senior: Displays University/Apprenticeship Pathways (Pros/Cons, Actionable Steps), Premium Scholarships, and the "Generate Regional CV" button.
4. **ImpactScreen & FAQScreen:** B2B Metrics and EU Compliance Hub.
5. **AAA Accessibility:** Dyslexic font CSS fix and SVG Colorblind filters.
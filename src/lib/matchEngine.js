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

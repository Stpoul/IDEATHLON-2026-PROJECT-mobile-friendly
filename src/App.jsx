import { useState, useEffect } from 'react';
import { Map, Layers, Users, MessageCircle, BarChart2, Moon, Sun, X, RotateCcw } from 'lucide-react';
import { t } from './i18n';
import sofiaLogo from './sofia-logo.svg';

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

const activeCls = (cond) => cond ? 'bg-[var(--primary)] text-white' : '';

const CB_OPTIONS = [
  { value: 'none',          labelKey: 'cb_none'          },
  { value: 'protanopia',    labelKey: 'cb_protanopia'    },
  { value: 'deuteranopia',  labelKey: 'cb_deuteranopia'  },
  { value: 'tritanopia',    labelKey: 'cb_tritanopia'    },
  { value: 'achromatopsia', labelKey: 'cb_achromatopsia' },
];

const CB_FILTER = {
  protanopia:    "url('#protanopia')",
  deuteranopia:  "url('#deuteranopia')",
  tritanopia:    "url('#tritanopia')",
  achromatopsia: "url('#achromatopsia')",
};

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [showAccess, setShowAccess] = useState(false);

  const [xp, setXp] = useState(340);
  const [streak, setStreak] = useState(5);

  const [language, setLanguage] = useState('en');
  const [hasConsent, setHasConsent] = useState(null);
  const [swipeResults, setSwipeResults] = useState({});
  const [ageGroup, setAgeGroup] = useState('under16');

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
  const handleResetXp = () => setXp(0);

  const { Screen: ActiveScreen } = TABS.find(tab => tab.id === activeTab);

  // Non-colorblind classes only — colorblind filter is applied via inline style on the container
  // (browser cannot resolve url('#id') filters when set on an ancestor element of the SVG)
  useEffect(() => {
    const classes = [
      darkMode ? 'dark' : '',
      highContrast ? 'high-contrast' : '',
      dyslexic ? 'font-dyslexic' : '',
      `text-size-${textSize}`,
    ].filter(Boolean);
    document.documentElement.className = classes.join(' ');
  }, [darkMode, highContrast, dyslexic, textSize]);

  return (
    <>
      {/* SVG filter defs rendered BEFORE the container that applies them */}
      <ColorblindSVGs />

      <div className="bg-slate-200 flex items-center justify-center min-h-[100dvh]">
        <div
          className="relative w-full max-w-[448px] h-[100dvh] md:h-[90vh] md:max-h-[800px] mx-auto flex flex-col overflow-hidden bg-[var(--background)] shadow-2xl md:rounded-[40px] text-[var(--foreground)] transition-colors duration-300"
          style={{ filter: CB_FILTER[cb] || undefined }}
        >

          {/* Header Bar */}
          <header
            className="shrink-0 z-50 flex items-center justify-between px-4 pb-3 bg-[var(--card)]/90 backdrop-blur-md border-b border-[var(--border)]"
            style={{ paddingTop: 'max(0.875rem, env(safe-area-inset-top))' }}
          >
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 bg-[var(--background)] rounded-full shadow border border-[var(--border)] active:scale-90 transition-transform duration-150"
            >
              {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-[var(--muted-foreground)]" />}
            </button>

            <div className="flex items-center gap-2">
              <img src={sofiaLogo} alt="Sofia" className="w-8 h-8 rounded-xl shadow-md" />
              <span className="text-base font-extrabold tracking-tight text-[var(--foreground)]">Sofia</span>
            </div>

            <button
              onClick={() => setShowAccess(true)}
              className="p-2.5 bg-[var(--primary)] text-white rounded-full shadow active:scale-90 transition-transform duration-150"
            >
              <UniversalAccessIcon />
            </button>
          </header>

          {/* Accessibility Modal */}
          {showAccess && (
            <div
              className="absolute inset-0 bg-black/50 z-[100] flex items-end justify-center backdrop-blur-sm modal-backdrop"
              onClick={(e) => e.target === e.currentTarget && setShowAccess(false)}
            >
              <div className="bg-[var(--card)] w-full p-6 rounded-t-[30px] shadow-2xl max-h-[85%] overflow-y-auto modal-sheet">
                <div className="w-10 h-1 bg-[var(--border)] rounded-full mx-auto mb-5" />
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{t(language, 'settings')}</h2>
                  <button onClick={() => setShowAccess(false)} className="p-2 rounded-full active:scale-90 transition-transform"><X /></button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button onClick={() => setHighContrast(!highContrast)} className={`p-4 rounded-xl border-2 font-bold text-xs active:scale-95 transition-transform ${activeCls(highContrast)}`}>{t(language, 'high_contrast')}</button>
                  <button onClick={() => setDyslexic(!dyslexic)} className={`p-4 rounded-xl border-2 font-bold text-xs active:scale-95 transition-transform ${activeCls(dyslexic)}`}>{t(language, 'dyslexic_font')}</button>
                </div>

                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'font_size')}</h3>
                  <div className="flex gap-2">
                    {[{ key: 'normal', label: 'font_size_normal' }, { key: 'large', label: 'font_size_large' }, { key: 'xlarge', label: 'font_size_xlarge' }].map(({ key, label }) => (
                      <button key={key} onClick={() => setTextSize(key)} className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs active:scale-95 transition-transform ${activeCls(textSize === key)}`}>{t(language, label)}</button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'settings_colorblind')}</h3>
                  <div className="flex gap-1.5 flex-wrap">
                    {CB_OPTIONS.map(({ value, labelKey }) => (
                      <button key={value} onClick={() => setCb(value)} className={`px-3 py-2 rounded-xl border-2 font-bold text-xs active:scale-95 transition-transform ${activeCls(cb === value)}`}>{t(language, labelKey)}</button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'settings_language')}</h3>
                  <div className="flex gap-2">
                    {['en', 'cz'].map(lang => (
                      <button key={lang} onClick={() => setLanguage(lang)} className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs uppercase active:scale-95 transition-transform ${activeCls(language === lang)}`}>{lang}</button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">{t(language, 'settings_age_group')}</h3>
                  <div className="flex gap-2">
                    {[{ value: 'under16', labelKey: 'age_under16' }, { value: '16plus', labelKey: 'age_16plus' }].map(({ value, labelKey }) => (
                      <button key={value} onClick={() => setAgeGroup(value)} className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs active:scale-95 transition-transform ${activeCls(ageGroup === value)}`}>{t(language, labelKey)}</button>
                    ))}
                  </div>
                </div>

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
                      className="w-full py-3 border-2 border-[var(--border)] text-[var(--muted-foreground)] font-bold text-xs rounded-xl active:scale-95 transition-transform"
                    >
                      {t(language, 'consent_reset')}
                    </button>
                  )}
                </div>

                <button
                  onClick={() => { setDarkMode(false); setHighContrast(false); setDyslexic(false); setTextSize('normal'); setCb('none'); }}
                  className="w-full py-4 border-2 border-red-100 text-red-500 font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <RotateCcw size={18} /> {t(language, 'reset_defaults')}
                </button>
              </div>
            </div>
          )}

          {/* key prop forces re-animation on every tab switch */}
          <main className="flex-1 overflow-y-auto gpu-scroll">
            <div key={activeTab} className="screen-enter h-full">
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
                setXp={setXp}
                onAddXp={handleAddXp}
                onResetXp={handleResetXp}
              />
            </div>
          </main>

          <nav
            className="shrink-0 border-t border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <ul className="flex">
              {TABS.map(({ id, key, Icon }) => (
                <li key={id} className="flex-1">
                  <button
                    onClick={() => setActiveTab(id)}
                    className="w-full flex flex-col items-center gap-1 py-3 active:scale-90 transition-transform duration-150"
                  >
                    <Icon size={22} className={`transition-colors duration-200 ${activeTab === id ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`} />
                    <span className={`text-[10px] font-semibold transition-colors duration-200 ${activeTab === id ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}>
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

const ColorblindSVGs = () => (
  <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
    <defs>
      <filter id="protanopia"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0" /></filter>
      <filter id="deuteranopia"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0" /></filter>
      <filter id="tritanopia"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0" /></filter>
      <filter id="achromatopsia"><feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0" /></filter>
    </defs>
  </svg>
);

const UniversalAccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><circle cx="12" cy="4" r="2" /><path d="M20 13c-2-2-5-3-8-3s-6 1-8 3M12 10v6M7 22l5-6 5 6" /></svg>
);

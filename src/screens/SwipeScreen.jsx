import { useState, useEffect } from 'react';
import { Flame, Zap, X, Heart, AlertOctagon } from 'lucide-react';
import { t } from '../i18n';

// Notice the new TRAP card hidden in the middle of both decks!
const JUNIOR_DECK = [
  { id: 'j1', e: '🔧', category: 'Vocational', text: { en: 'I enjoy fixing things or taking them apart to see how they work.', cz: 'Rád/a opravuji věci nebo je rozebírám, abych viděl/a, jak fungují.' } },
  { id: 'j2', e: '📹', category: 'Pedagogical', text: { en: 'I prefer learning by watching a video rather than reading a textbook.', cz: 'Raději se učím sledováním videa než čtením učebnice.' } },
  { id: 'j3', e: '🎨', category: 'Vocational', text: { en: 'I love coming up with creative ideas for art, writing, or design.', cz: 'Miluju vymýšlení kreativních nápadů pro umění, psaní nebo design.' } },
  { id: 'trap1', e: '🤖', category: 'Trap', text: { en: 'Attention Check: If you are reading this carefully, swipe LEFT.', cz: 'Kontrola pozornosti: Pokud to čtete pozorně, přejeďte VLEVO.' } },
  { id: 'j4', e: '👥', category: 'Pedagogical', text: { en: 'I learn better when the teacher lets us work in groups instead of sitting quietly.', cz: 'Lépe se učím, když nám učitel dovolí pracovat ve skupinách místo tiché práce.' } },
  { id: 'j5', e: '🌲', category: 'Vocational', text: { en: 'I like spending my free time outdoors or working with nature.', cz: 'Rád/a trávím volný čas venku nebo v přírodě.' } },
  { id: 'j6', e: '🤫', category: 'Pedagogical', text: { en: 'When studying, I need absolute silence to focus properly.', cz: 'Při studiu potřebuji absolutní ticho, abych se dokázal/a soustředit.' } },
];

const SENIOR_DECK = [
  { id: 's1', e: '🎓', category: 'Vocational', text: { en: "I want to apply for a 3-year technical bachelor's degree instead of a 5-year master's.", cz: 'Chci se přihlásit na 3letý technický bakalářský obor místo 5letého magistra.' } },
  { id: 's2', e: '📊', category: 'Pedagogical', text: { en: 'I prefer project-based grading over traditional written exams for my final grade.', cz: 'Dávám přednost hodnocení na základě projektů před tradičními písemnými zkouškami.' } },
  { id: 's3', e: '🏭', category: 'Vocational', text: { en: 'I am interested in a paid apprenticeship (e.g., at Škoda) straight after high school.', cz: 'Zajímá mě placené odborné učiliště (např. ve Škodě) přímo po střední škole.' } },
  { id: 'trap2', e: '🤖', category: 'Trap', text: { en: 'Attention Check: I am not just spamming buttons, so I will swipe LEFT.', cz: 'Kontrola pozornosti: Nemačkám jen tlačítka, takže přejedu VLEVO.' } },
  { id: 's4', e: '💻', category: 'Pedagogical', text: { en: 'I study best when I have access to online recorded lectures to review at my own pace.', cz: 'Nejlépe studuji, když mám přístup k nahraným přednáškám online k přehrání vlastním tempem.' } },
  { id: 's5', e: '🏠', category: 'Lifestyle', text: { en: 'I am willing to relocate to a different city and live in a student dormitory.', cz: 'Jsem ochoten/ochotna přestěhovat se do jiného města a bydlet na koleji.' } },
  { id: 's6', e: '👔', category: 'Pedagogical', text: { en: 'I learn better from professors who bring real-world industry experience into the classroom.', cz: 'Lépe se učím od profesorů, kteří přinášejí do výuky zkušenosti z praxe.' } },
];

export default function SwipeScreen({ onNavigate, globalStreak, language, onSwipeResult, ageGroup }) {
  const DECK = ageGroup === '16plus' ? SENIOR_DECK : JUNIOR_DECK;
  const [idx, setIdx] = useState(0);
  const [showTrapWarning, setShowTrapWarning] = useState(false);

  useEffect(() => { setIdx(0); }, [ageGroup]);

  const handleSwipe = (liked) => {
    const currentCard = DECK[idx];

    // THE TRAP LOGIC
    if (currentCard.category === 'Trap') {
      if (liked === true) {
        // They swiped right! Caught them spamming.
        setShowTrapWarning(true);
        return; 
      }
      // If they swiped left, they pass. Proceed normally.
    }

    if (currentCard.category !== 'Trap') {
      onSwipeResult(currentCard.category, liked);
    }

    if (idx < DECK.length - 1) {
      setIdx(idx + 1);
    } else {
      onNavigate('bridge');
    }
  };

  const card = DECK[idx];
  const isPedagogical = card.category === 'Pedagogical';

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter p-6 relative">
      
      {/* SPAM WARNING MODAL */}
      {showTrapWarning && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-6 screen-enter backdrop-blur-sm">
          <div className="bg-[var(--card)] rounded-3xl p-8 text-center max-w-sm border-2 border-[var(--danger)] shadow-2xl">
            <AlertOctagon size={48} className="text-[var(--danger)] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
              {language === 'cz' ? 'Zpomalte, rychlíku! 🏎️' : 'Whoa there, speedster! 🏎️'}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              {language === 'cz' ? 'Všimli jsme si, že naslepo přejíždíte. Tato data formují vaši budoucnost – čtěte pozorně!' : 'We noticed you are swiping blindly. This data shapes your future—read carefully!'}
            </p>
            <button 
              onClick={() => { setShowTrapWarning(false); setIdx(idx + 1); }} 
              className="w-full bg-[var(--danger)] text-white font-bold py-3 rounded-xl active:scale-95"
            >
              {language === 'cz' ? 'Slibuji, že budu číst' : 'I promise to read'}
            </button>
          </div>
        </div>
      )}

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
          <span className="text-orange-600 dark:text-orange-300 text-sm font-bold">{globalStreak} {t(language, 'swipe_streak')}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-[10px] font-bold text-[var(--muted-foreground)] mb-1">
          <span>{t(language, 'swipe_progress', { current: idx + 1, total: DECK.length })}</span>
          <span>{Math.round(((idx + 1) / DECK.length) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--primary)] rounded-full transition-all duration-300" style={{ width: `${((idx + 1) / DECK.length) * 100}%` }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full bg-[var(--card)] rounded-3xl p-8 shadow-xl border border-[var(--border)] text-center transition-colors">
          <div className="text-6xl mb-4">{card.e}</div>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2 block">
            {card.category === 'Trap' ? 'System Check' : isPedagogical ? t(language, 'swipe_teaching_label') : t(language, `cat_${card.category}`)}
          </span>
          <p className="text-[var(--foreground)] text-xl font-bold leading-snug">{card.text[language] ?? card.text.en}</p>
        </div>
      </div>

      <div className="flex justify-center gap-6 py-8">
        <button onClick={() => handleSwipe(false)} className="w-16 h-16 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--danger)] flex items-center justify-center active:scale-95 transition-all shadow-md"><X size={28} /></button>
        <button onClick={() => handleSwipe(true)} className="w-20 h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"><Heart size={36} fill="white" strokeWidth={0} /></button>
      </div>
    </div>
  );
}
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
          {t(language, 'faq_delete_data')}
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

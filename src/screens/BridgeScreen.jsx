import { useState } from 'react';
import { t } from '../i18n';
import { School, Briefcase, FileText, CheckCircle, AlertTriangle, MessageSquare, ArrowRight, DollarSign, CheckSquare, Square, Wrench, Code, Zap, ChefHat, MapPin, Calendar } from 'lucide-react';

const PATHWAYS = [
  { id: 1, category: 'university', type: 'Bachelors Degree', title: 'TUL - Mechatronics', match: 94, icon: School, colorClass: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40', pros: ['+45% Prefers hands-on projects', '+15% Strong math inclination'], cons: ['-6% Dislikes heavy theory'], steps: [{ id: '1a', title: 'Attend Open Days', desc: 'Visit the TUL campus in late November.' }, { id: '1b', title: 'Submit Application', desc: 'Electronic submission deadline: March 31.' }, { id: '1c', title: 'Prep for Entrance Exams', desc: 'Review high school Physics and Math (June).' }, { id: '1d', title: 'Secure Housing', desc: 'Apply for Harcov Dorms (System opens in May).' }] },
  { id: 2, category: 'university', type: 'Bachelors Degree', title: 'TUL - Economics & Management', match: 78, icon: Briefcase, colorClass: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40', pros: ['+30% Leadership & organizational skills'], cons: ['-25% Prefers physical building over desk work'], steps: [{ id: '2a', title: 'Research Majors', desc: 'Compare Marketing vs. Corporate Finance tracks.' }, { id: '2b', title: 'Submit Application', desc: 'Electronic submission deadline: April 30.' }, { id: '2c', title: 'Language Prep', desc: 'Ensure B2 English level for international tracks.' }] },
  { id: 3, category: 'university', type: 'Masters Degree', title: 'ČVUT - Software Engineering', match: 62, icon: Code, colorClass: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40', pros: ['+40% Excellent logic & puzzle solving'], cons: ['-30% Dislikes fully remote/isolated work', '-15% Prefers regional staying (Prague commute)'], steps: [{ id: '3a', title: 'Portfolio Build', desc: 'Upload 3 coding projects to GitHub by January.' }, { id: '3b', title: 'Submit Application', desc: 'Electronic submission deadline: March 31.' }, { id: '3c', title: 'Math Entrance Exam', desc: 'Intensive calculus review required.' }] },
  { id: 4, category: 'vocational', type: 'Corporate Apprenticeship', title: 'Škoda Auto - Mechatronic Apprentice', match: 91, icon: Wrench, colorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40', pros: ['+50% Immediate starting salary', '+35% Highly practical, paid learning'], cons: ['-20% Narrower initial career flexibility', '-10% Potential for shift work'], steps: [{ id: '4a', title: 'Factory Tour', desc: 'Register for an open day in Mladá Boleslav.' }, { id: '4b', title: 'Submit CV', desc: 'Use Sofia 1-Click CV to apply before Feb 28.' }, { id: '4c', title: 'Aptitude Test', desc: 'Complete the online manual dexterity & logic test.' }, { id: '4d', title: 'Interview Prep', desc: 'Practice answering teamwork and behavioral questions.' }] },
  { id: 5, category: 'vocational', type: 'Intensive Bootcamp', title: 'GreenTech Solar Installation Cert', match: 85, icon: Zap, colorClass: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40', pros: ['+60% Outdoor & physical work preference', '+20% High regional demand'], cons: ['-15% Seasonal workflow fluctuations'], steps: [{ id: '5a', title: 'Information Session', desc: 'Attend the online webinar on November 15.' }, { id: '5b', title: 'Safety Certification', desc: 'Complete basic occupational hazards pre-course.' }, { id: '5c', title: 'Enrollment Deposit', desc: 'Secure your spot for the Spring cohort.' }] },
  { id: 6, category: 'vocational', type: 'Trade Academy', title: 'Turnov Culinary Arts Academy', match: 45, icon: ChefHat, colorClass: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40', pros: ['+25% Creative expression'], cons: ['-40% Stress tolerance lower than required', '-15% Weekend shift requirements'], steps: [{ id: '6a', title: 'Kitchen Trial Day', desc: 'Spend 4 hours shadowing a line cook.' }, { id: '6b', title: 'Health & Safety Test', desc: 'Pass the food handling hygiene exam.' }, { id: '6c', title: 'Submit Application', desc: 'Deadline: May 15.' }] }
];

export default function BridgeScreen({ ageGroup, language }) {
  const [expandedId, setExpandedId] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState({});
  const [activeTab, setActiveTab] = useState('university');

  const isSenior = ageGroup === '16plus';

  const toggleStep = (e, stepId) => {
    e.stopPropagation();
    setCheckedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const filteredPathways = PATHWAYS.filter(p => p.category === activeTab);

  const handleDownloadCV = () => {
    const cvContent = `=========================================\n      SOFIA REGIONAL TALENT CV\n=========================================\n\nSTUDENT PROFILE:\n- Age Group: 16+\n- Top Theme: Tech & Engineering\n- Learning Style: Visual & Hands-on\n\nTOP PATHWAY MATCHES:\n1. Technical University of Liberec (TUL) - Mechatronics (94%)\n2. Škoda Auto - Mechatronic Apprentice (91%)\n\nACHIEVEMENTS & MILESTONES:\n- Reached Transition Era (Year 4)\n- Consistent 10-Day Swipe Streak\n- Unlocked Regional Independence Badge\n\nGenerated via the Sofia platform.\n`;
    const blob = new Blob([cvContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Sofia_Regional_CV.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter overflow-y-auto pb-24">
      <div className="pt-8 mb-6">
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">
          {isSenior ? t(language, 'bridge_senior_title') : t(language, 'bridge_junior_title')}
        </h1>
        <p className="text-[var(--muted-foreground)] text-sm">
          {isSenior ? t(language, 'bridge_senior_sub') : t(language, 'bridge_junior_sub')}
        </p>
      </div>

      {isSenior ? (
        <>
          <div className="mb-6 p-1 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 shadow-lg">
            <div className="bg-[var(--card)] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">{t(language, 'premium_unlocked')}</p>
                <p className="font-bold text-[var(--foreground)] text-sm mt-1">{t(language, 'eligible_grant')}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{t(language, 'grant_amount')}</p>
              </div>
              <DollarSign className="text-amber-500" size={28} />
            </div>
          </div>

          <div className="flex bg-[var(--border)] rounded-xl p-1 mb-6">
            <button onClick={() => { setActiveTab('university'); setExpandedId(null); }} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'university' ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
              Universities
            </button>
            <button onClick={() => { setActiveTab('vocational'); setExpandedId(null); }} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'vocational' ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
              Vocational & Alternative
            </button>
          </div>

          <div className="space-y-4 mb-8 min-h-[300px]">
            {filteredPathways.map((pathway) => (
              <div key={pathway.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
                <div onClick={() => setExpandedId(expandedId === pathway.id ? null : pathway.id)} className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-50 dark:active:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pathway.colorClass}`}><pathway.icon size={24} /></div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[var(--muted-foreground)]">{pathway.type}</p>
                      <p className="text-sm font-bold text-[var(--foreground)]">{pathway.title}</p>
                    </div>
                  </div>
                  <span className="text-lg font-extrabold text-[var(--primary)]">{pathway.match}%</span>
                </div>
                
                {expandedId === pathway.id && (
                  <div className="px-4 pb-4 border-t border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/20 pt-4 screen-enter">
                    <div className="mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Algorithm Match Factors</p>
                      <div className="space-y-2">
                        {pathway.pros.map((pro, i) => <p key={`pro-${i}`} className="flex items-center gap-2 text-xs font-medium text-[var(--foreground)]"><CheckCircle size={14} className="text-[var(--success)] shrink-0"/> {pro}</p>)}
                        {pathway.cons.map((con, i) => <p key={`con-${i}`} className="flex items-center gap-2 text-xs font-medium text-[var(--foreground)]"><AlertTriangle size={14} className="text-[var(--danger)] shrink-0"/> {con}</p>)}
                      </div>
                    </div>
                    
                    <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">How to Achieve This (Checklist)</p>
                      <div className="space-y-4">
                        {pathway.steps.map((step) => {
                          const isChecked = checkedSteps[step.id] || false;
                          return (
                            <div key={step.id} onClick={(e) => toggleStep(e, step.id)} className="flex gap-3 items-start cursor-pointer group">
                              <div className={`mt-0.5 shrink-0 transition-colors ${isChecked ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)] group-hover:text-[var(--primary)]'}`}>
                                {isChecked ? <CheckSquare size={18} /> : <Square size={18} />}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm font-bold transition-all ${isChecked ? 'text-[var(--muted-foreground)] line-through' : 'text-[var(--foreground)]'}`}>{step.title}</p>
                                <p className={`text-xs transition-all ${isChecked ? 'text-[var(--muted-foreground)]/50' : 'text-[var(--muted-foreground)]'}`}>{step.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={handleDownloadCV} className="w-full mb-8 flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform">
            <FileText size={18} /> {t(language, 'generate_cv')}
          </button>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[var(--card)] p-4 border border-[var(--border)] rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-3"><Briefcase size={20} /></div>
            <h3 className="font-bold text-sm text-[var(--foreground)]">Builder</h3>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">You swipe right on hands-on tasks.</p>
          </div>
          <div className="bg-[var(--card)] p-4 border border-[var(--border)] rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-3"><School size={20} /></div>
            <h3 className="font-bold text-sm text-[var(--foreground)]">Visual Learner</h3>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">You prefer videos over reading.</p>
          </div>
        </div>
      )}

      <div className="bg-[var(--primary)] p-6 rounded-3xl text-white shadow-lg">
        <MessageSquare size={24} className="mb-4 text-white/80" />
        <h3 className="text-xl font-bold">Regional Peer Forum</h3>
        <p className="text-white/80 text-xs mt-1">Talk anonymously with local students navigating the exact same choices.</p>
        <button className="mt-4 w-full bg-white text-[var(--primary)] font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
          Enter Forum <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
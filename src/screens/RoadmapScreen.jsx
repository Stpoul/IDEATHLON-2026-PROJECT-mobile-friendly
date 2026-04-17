import { useState } from 'react';
import { Trophy, Gift, RotateCcw, Zap, CheckCircle, Lock } from 'lucide-react';

export default function RoadmapScreen({ globalXp, setXp }) {
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);

  const getEra = () => {
    if (globalXp < 300) return { title: "Discovery Era", desc: "Years 1-2", pet: "🥚" };
    if (globalXp < 600) return { title: "Community Era", desc: "Year 3", pet: "🐣" };
    return { title: "Transition Era", desc: "Year 4+", pet: "🐥" };
  };
  
  const currentEra = getEra();
  const maxCurrentLevelXp = globalXp < 300 ? 300 : globalXp < 600 ? 600 : 1000;
  const progressPercent = Math.min(100, (globalXp / maxCurrentLevelXp) * 100);

  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter overflow-y-auto pb-24 relative">
      <div className="pt-8 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-[var(--foreground)] text-3xl font-[800]">Your Journey</h1>
          <p className="text-[var(--muted-foreground)] text-sm">{currentEra.title} ({currentEra.desc})</p>
        </div>
        <button onClick={() => setIsRewardsOpen(true)} className="p-3 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-2xl hover:scale-105 transition-transform">
          <Trophy size={24} />
        </button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm mb-6 flex flex-col items-center">
        <div className="text-6xl mb-4 animate-bounce-slow">{currentEra.pet}</div>
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">Level {Math.floor(globalXp / 100)}</h2>
        <div className="w-full bg-[var(--muted)] rounded-full h-4 mb-2 overflow-hidden border border-[var(--border)]">
          <div className="bg-[var(--primary)] h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="text-xs font-bold text-[var(--muted-foreground)] tracking-widest uppercase">{globalXp} / {maxCurrentLevelXp} XP</p>

        <div className="mt-6 flex gap-3 w-full border-t border-[var(--border)] pt-4">
          <button onClick={() => setXp(globalXp + 100)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold text-xs rounded-xl active:scale-95 transition-transform">
            <Zap size={14} /> +100 XP (Demo)
          </button>
          <button onClick={() => setXp(0)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl active:scale-95 transition-transform">
            <RotateCcw size={14} /> Reset (Demo)
          </button>
        </div>
      </div>

      {isRewardsOpen && (
        <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center p-4 screen-enter">
          <div className="bg-[var(--card)] border border-[var(--border)] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 text-center border-b border-[var(--border)] bg-slate-50 dark:bg-slate-900">
              <Gift size={32} className="mx-auto text-[var(--primary)] mb-2" />
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Regional Rewards</h2>
              <p className="text-xs text-[var(--muted-foreground)]">Your XP unlocks real-world perks.</p>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="text-emerald-500" size={24} />
                <div>
                  <p className="font-bold text-[var(--foreground)] text-sm">15% Off Liberec Cinema</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Unlocked at 300 XP</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-[var(--border)] opacity-70">
                <Lock className="text-[var(--muted-foreground)]" size={24} />
                <div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Free Coffee @ Turnov Cafe</p>
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">Locks at 600 XP (Currently {globalXp})</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[var(--background)]">
              <button onClick={() => setIsRewardsOpen(false)} className="w-full py-3 bg-[var(--primary)] text-white font-bold rounded-xl active:scale-95">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
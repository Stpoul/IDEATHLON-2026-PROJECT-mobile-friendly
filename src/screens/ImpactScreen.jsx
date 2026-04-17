import { BarChart2, TrendingUp, Users, MapPin, Target, ShieldCheck } from 'lucide-react';

export default function ImpactScreen({ language }) {
  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter overflow-y-auto pb-24">
      <div className="pt-8 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="text-[var(--success)]" size={20} />
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--success)]">B2B Admin & City View</p>
        </div>
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">Regional Impact</h1>
        <p className="text-[var(--muted-foreground)] text-sm">Aggregated, anonymized talent data for Liberec schools and local government.</p>
      </div>

      <div className="bg-[var(--primary)] text-white p-6 rounded-3xl shadow-lg mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Total Regional Pipeline</p>
          <h2 className="text-5xl font-extrabold mb-2">4,281</h2>
          <p className="text-sm font-medium flex items-center gap-2"><TrendingUp size={16} className="text-emerald-300" /> +12% active students this month</p>
        </div>
        <BarChart2 size={120} className="absolute -right-6 -bottom-6 text-white opacity-10" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[var(--card)] p-5 border border-[var(--border)] rounded-2xl shadow-sm">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3"><Target size={20} /></div>
          <p className="text-2xl font-bold text-[var(--foreground)]">68%</p>
          <p className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] mt-1">Tech / STEM Lean</p>
        </div>
        <div className="bg-[var(--card)] p-5 border border-[var(--border)] rounded-2xl shadow-sm">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3"><Users size={20} /></div>
          <p className="text-2xl font-bold text-[var(--foreground)]">84%</p>
          <p className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] mt-1">Apprentice Interest</p>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-[var(--border)] bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
          <h3 className="font-bold text-[var(--foreground)] text-sm">Pedagogical Alert</h3>
          <span className="px-2 py-1 bg-rose-100 text-rose-600 text-[10px] font-bold rounded-md">ACTION REQUIRED</span>
        </div>
        <div className="p-4">
          <p className="text-sm text-[var(--foreground)] leading-relaxed"><strong className="text-[var(--primary)]">Insight:</strong> 72% of 8th graders in the Turnov district swiped right on "I learn better by watching videos than reading."</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-[var(--border)]"><strong>Recommendation for Teachers:</strong> Shift next week's curriculum away from textbook reading toward interactive visual media.</p>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 border border-[var(--border)] rounded-2xl shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0"><MapPin size={24} /></div>
        <div>
          <p className="font-bold text-sm text-[var(--foreground)]">Liberec Retention</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">89% of 16+ users intend to study or work within the Liberec region, up from 65% pre-Sofia.</p>
        </div>
      </div>
    </div>
  );
}
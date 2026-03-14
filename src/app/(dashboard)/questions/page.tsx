import {
  BookOpen,
  CircleHelp,
  FileCheck2,
  Layers3,
  GraduationCap,
  BarChart3,
  FlaskConical,
  Trophy,
} from "lucide-react";

const stats = [
  {
    label: "Total Questions",
    value: "4,287",
    icon: CircleHelp,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    label: "Published Tests",
    value: "156",
    icon: FileCheck2,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    label: "Passages",
    value: "89",
    icon: Layers3,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
  },
  {
    label: "Active Students",
    value: "12,430",
    icon: GraduationCap,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  {
    label: "Quiz Sessions",
    value: "45.2K",
    icon: BarChart3,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50",
  },
];

const flowItems = [
  { label: "Study Archive", icon: BookOpen, color: "bg-emerald-500" },
  { label: "Official Tests", icon: FileCheck2, color: "bg-blue-500" },
  { label: "Additional Tests", icon: Layers3, color: "bg-violet-500" },
  { label: "Practice by Subject", icon: FlaskConical, color: "bg-orange-500" },
  { label: "Full Simulation", icon: CircleHelp, color: "bg-cyan-500" },
  { label: "Result & Analytics", icon: Trophy, color: "bg-pink-500" },
];

export default function QuestionsPage() {
  return (
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-blue-600 p-5 text-white shadow-[0_20px_40px_-24px_rgba(37,99,235,0.95)]">
        <div className="pointer-events-none absolute -top-10 -right-8 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 left-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
        <p className="text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase">
          Overview
        </p>
        <h2 className="mt-1 text-2xl font-extrabold">Question &amp; Test System Architecture</h2>
        <p className="mt-1 text-sm text-blue-50">
          Centralized architecture - one question source, used everywhere
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        {stats.map((item) => (
          <div
            key={item.label}
            className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-20px_rgba(15,23,42,0.55)]"
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg}`}
            >
              <item.icon className={`h-5 w-5 ${item.iconColor}`} />
            </div>
            <p className="text-3xl font-bold text-slate-900">{item.value}</p>
            <p className="mt-1 text-xs text-slate-500">{item.label}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-3/4 rounded-full bg-linear-to-r from-blue-500 to-cyan-400" />
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">Centralized Architecture Flow</h3>
        <p className="mt-1 text-xs text-slate-500">
          Questions are created once and reused across all platform features. No duplication.
        </p>

        <div className="mt-5 flex justify-center">
          <div className="rounded-xl bg-blue-600 px-8 py-4 text-center text-white shadow-lg shadow-blue-200">
            <p className="text-sm font-semibold">Question Database</p>
            <p className="text-xs text-blue-100">Single Source of Truth</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {flowItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-sm">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}
                >
                  <item.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-800">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
          <p className="mb-2 text-xs font-semibold text-blue-700">Key Principles</p>
          <ul className="space-y-1 text-xs text-blue-700">
            <li>- Questions are created once in the Question Bank.</li>
            <li>- Test Archive inherits final structure (with questions linked to tests).</li>
            <li>- Passages are separate content blocks linked to multiple questions.</li>
            <li>- Study Archive and simulation consume the same validated source.</li>
          </ul>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-900">Study Archive</h4>
          <ul className="mt-2 space-y-1 text-xs text-slate-500">
            <li>- Reads from Test Archive</li>
            <li>- Uses question bank references</li>
            <li>- Correct answers are always visible</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-900">Quiz Section</h4>
          <ul className="mt-2 space-y-1 text-xs text-slate-500">
            <li>- Uses centralized question database</li>
            <li>- Supports timed quiz formats</li>
            <li>- Answers hidden until submission</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-900">Full Simulation</h4>
          <ul className="mt-2 space-y-1 text-xs text-slate-500">
            <li>- Uses official test structure</li>
            <li>- Follows real order (no random)</li>
            <li>- Respects linked passages and subjects</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

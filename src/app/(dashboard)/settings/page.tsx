import { Settings, Bell, ShieldCheck, Palette, Globe } from "lucide-react";

const sections = [
  {
    icon: Settings,
    title: "General Settings",
    description: "Platform name, timezone, language, and default preferences.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Email and in-app notification preferences for admins.",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: ShieldCheck,
    title: "Security & Access",
    description: "Admin roles, two-factor authentication, and session management.",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Theme, logo, colors, and UI customization.",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: Globe,
    title: "Integrations",
    description: "Connected services: Stripe, PayPal, email providers, and APIs.",
    color: "text-teal-600 bg-teal-50",
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-full p-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          <p className="mt-0.5 text-sm text-gray-400">
            Configure platform settings and preferences
          </p>
        </div>

        {/* Settings cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <button
              key={s.title}
              className="flex items-start gap-4 rounded-xl border border-gray-100 p-5 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >
              <div
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${s.color}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{s.title}</p>
                <p className="mt-0.5 text-sm text-gray-400">{s.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Coming soon */}
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-14 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <Settings className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="mb-1 text-base font-semibold text-gray-700">Settings Coming Soon</h3>
          <p className="max-w-sm text-sm text-gray-400">
            Full settings panel with live configuration updates is under development.
          </p>
        </div>
      </div>
    </div>
  );
}

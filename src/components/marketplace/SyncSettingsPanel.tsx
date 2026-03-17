"use client";

import { syncDataFields, syncIntervalCards, syncIntervalOptions } from "@/lib/marketplace-data";
import { CheckCircle2, RefreshCw, Settings2 } from "lucide-react";
import { useState } from "react";

export default function SyncSettingsPanel() {
  const [autoSync, setAutoSync] = useState(true);
  const [interval, setInterval] = useState<(typeof syncIntervalOptions)[number]>("Every 12 hours");

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-[#3f5f7a]">Sync Settings</h3>
        <p className="text-xs text-[#8ea1b4]">
          Configure product synchronization intervals and automation
        </p>
      </div>

      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <h4 className="text-sm font-medium text-[#3f5f7a]">Synchronization Mode</h4>
        <div className="mt-4 rounded-md border border-[#e8eef5] p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d8e5f5] bg-[#eef5ff] text-[#4d79bb]">
                <RefreshCw className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#3f5f7a]">Automatic Synchronization</p>
                <p className="text-[10px] text-[#8ea1b4]">
                  Automatically sync products at scheduled intervals
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAutoSync((prev) => !prev)}
              className={`flex h-6 w-10 items-center rounded-full border px-0.5 transition ${autoSync ? "border-[#5ea5ef] bg-[#5ea5ef]" : "border-[#dce7f2] bg-[#edf3f8]"}`}
            >
              <span
                className={`h-4.5 w-4.5 rounded-full bg-white transition ${autoSync ? "translate-x-4" : "translate-x-0"}`}
              />
            </button>
          </div>
        </div>

        <div className="mt-3 rounded-md border border-[#d8e5f5] bg-[#eef5ff] p-3">
          <p className="flex items-center gap-2 text-xs font-medium text-[#3f5f7a]">
            <Settings2 className="h-3.5 w-3.5 text-[#4d79bb]" /> Sync Interval
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            {syncIntervalOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setInterval(option)}
                className={`rounded-md border px-3 py-2 text-[11px] ${interval === option ? "border-[#5ea5ef] bg-white text-[#2f86d8]" : "border-[#dce7f2] bg-white text-[#6f859b]"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <h4 className="text-sm font-medium text-[#3f5f7a]">Manual Synchronization</h4>
        <p className="mt-1 text-[11px] text-[#8ea1b4]">
          Manually trigger product sync anytime regardless of automatic settings
        </p>
        <button
          type="button"
          className="mt-3 rounded-md bg-[#57a9e7] px-3 py-1.5 text-xs font-medium text-white"
        >
          Sync Now
        </button>
      </section>

      <section className="rounded-lg border border-[#eddcf7] bg-[#fcf6ff] p-4">
        <h4 className="text-sm font-medium text-[#3f5f7a]">Sync Interval Options</h4>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {syncIntervalCards.map((card) => (
            <div key={card.title} className="rounded-md border border-[#f0e3fb] bg-white p-3">
              <p className="text-xs font-medium text-[#3f5f7a]">{card.title}</p>
              <p className="mt-1 text-[10px] text-[#8ea1b4]">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <h4 className="text-sm font-medium text-[#3f5f7a]">What Gets Synchronized</h4>
        <p className="mt-1 text-[11px] text-[#8ea1b4]">
          During each sync, the following data is updated from AutoDS suppliers:
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {syncDataFields.map((field) => (
            <div
              key={field.title}
              className="rounded-md border border-[#dce7f2] bg-white px-3 py-2"
            >
              <p className="flex items-center gap-2 text-xs font-medium text-[#3f5f7a]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4f7dff]" /> {field.title}
              </p>
              <p className="mt-1 pl-5 text-[10px] text-[#8ea1b4]">{field.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[#cfe8d6] bg-[#eefaf2] p-4">
        <p className="flex items-center gap-2 text-xs font-medium text-[#3f5f7a]">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#3ea666]" /> Last Synchronization
        </p>
        <p className="mt-1 text-[11px] text-[#587189]">March 10, 2026 - 08:30 AM</p>
        <p className="text-[10px] text-[#8ea1b4]">5 products synced successfully</p>
      </section>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="rounded-md border border-[#dce7f2] bg-white px-3 py-1.5 text-xs font-medium text-[#6f859b]"
        >
          Reset to Default
        </button>
        <button
          type="button"
          className="rounded-md bg-[#57a9e7] px-3 py-1.5 text-xs font-medium text-white"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

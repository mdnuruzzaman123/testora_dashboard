import { autoDsCapabilities, autoDsSyncFields } from "@/lib/marketplace-data";
import { CheckCircle2, Link2, PackageCheck, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";

const capabilityIcons = [PackageCheck, RefreshCw, Sparkles, ShieldCheck];

export default function AutoDsIntegrationPanel() {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-[#3f5f7a]">AutoDS Integration</h3>
        <p className="text-xs text-[#8ea1b4]">
          Connect with AutoDS for automated dropshipping and product synchronization
        </p>
      </div>

      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c6ecd0] bg-[#edf8f2] text-[#3ea666]">
              <Link2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3f5f7a]">Connected to AutoDS</p>
              <p className="text-[11px] text-[#8ea1b4]">Last synced: March 10, 2026 - 08:30 AM</p>
            </div>
          </div>
          <span className="inline-flex rounded-full border border-[#bfe6c9] bg-[#e8f7ed] px-2.5 py-1 text-[10px] font-medium text-[#3c9b63]">
            Active
          </span>
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-3">
          <div className="rounded-md border border-[#d8e5f5] bg-[#eef5ff] p-3">
            <p className="text-[10px] text-[#90a3b6]">Synced Products</p>
            <p className="mt-1 text-lg font-semibold text-[#3f5f7a]">5</p>
          </div>
          <div className="rounded-md border border-[#e4d9f6] bg-[#f5efff] p-3">
            <p className="text-[10px] text-[#90a3b6]">Sync Interval</p>
            <p className="mt-1 text-lg font-semibold text-[#3f5f7a]">Every 12 hours</p>
          </div>
          <div className="rounded-md border border-[#d4eadf] bg-[#edf8f3] p-3">
            <p className="text-[10px] text-[#90a3b6]">Auto Sync</p>
            <p className="mt-1 text-lg font-semibold text-[#3f5f7a]">Enabled</p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#e6dbf9] bg-[#faf6ff] p-4">
        <h4 className="text-sm font-medium text-[#3f5f7a]">AutoDS Capabilities</h4>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {autoDsCapabilities.map((capability, index) => {
            const Icon = capabilityIcons[index] ?? PackageCheck;
            return (
              <div
                key={capability.title}
                className="rounded-md border border-[#e2d8f8] bg-white p-3"
              >
                <div className="flex items-center gap-2 text-[#6d54dd]">
                  <Icon className="h-3.5 w-3.5" />
                  <p className="text-xs font-medium text-[#3f5f7a]">{capability.title}</p>
                </div>
                <p className="mt-1 text-[10px] text-[#8ea1b4]">{capability.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <h4 className="text-sm font-medium text-[#3f5f7a]">Product Synchronization Fields</h4>
        <p className="mt-1 text-[11px] text-[#8ea1b4]">
          The following data is automatically synced from AutoDS suppliers:
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {autoDsSyncFields.map((field) => (
            <div
              key={field}
              className="flex items-center gap-2 rounded-md border border-[#dce7f2] bg-[#fbfdff] px-3 py-2 text-xs text-[#587189]"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#3ea666]" />
              <span>{field}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[#f1ddc3] bg-[#fff7ec] p-4">
        <h4 className="text-sm font-medium text-[#3f5f7a]">
          Automatic Stock Synchronization Logic
        </h4>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4 rounded-md border border-[#f0e2cd] bg-white px-3 py-3">
          <div>
            <p className="text-[11px] font-medium text-[#6f859b]">
              Supplier Stock: Updated in real-time
            </p>
            <p className="mt-1 text-[11px] text-[#8ea1b4]">
              When supplier stock becomes <span className="font-semibold text-[#df5e5e]">0</span>,
              the marketplace product automatically becomes{" "}
              <span className="font-semibold text-[#df5e5e]">Out of Stock</span>.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="rounded-md border border-[#d4eadf] bg-[#edf8f3] px-3 py-2 text-center text-[10px] text-[#8ea1b4]">
              <p className="text-sm font-semibold text-[#3ea666]">120</p>
              <p>Supplier</p>
            </div>
            <div className="rounded-md border border-[#d4eadf] bg-[#edf8f3] px-3 py-2 text-center text-[10px] text-[#8ea1b4]">
              <p className="text-sm font-semibold text-[#3ea666]">120</p>
              <p>Marketplace</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <h4 className="text-sm font-medium text-[#3f5f7a]">Actions</h4>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-md bg-[#57a9e7] px-3 py-1.5 text-xs font-medium text-white"
          >
            Sync Now
          </button>
          <button
            type="button"
            className="rounded-md bg-[#18b04c] px-3 py-1.5 text-xs font-medium text-white"
          >
            Import Products
          </button>
          <button
            type="button"
            className="rounded-md border border-[#dce7f2] bg-white px-3 py-1.5 text-xs font-medium text-[#6f859b]"
          >
            API Settings
          </button>
        </div>
      </section>
    </div>
  );
}

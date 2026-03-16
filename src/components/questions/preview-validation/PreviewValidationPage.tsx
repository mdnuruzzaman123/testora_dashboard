import AppPreviewSection from "./AppPreviewSection";
import AuditHistoryCard from "./AuditHistoryCard";
import PublishingValidationCard from "./PublishingValidationCard";

export default function PreviewValidationPage() {
  return (
    <div className="space-y-3">
      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-base font-semibold text-[#3f5f7a]">Preview &amp; Validation</h2>
        <p className="text-sm text-[#7e95ab]">
          Review the question in-app and confirm all validations before publishing
        </p>
      </section>

      {/* ── Two-column layout ────────────────────────────────────────────────── */}
      <div className="grid gap-3 lg:grid-cols-[1fr_320px]">
        {/* Left: App preview */}
        <AppPreviewSection />

        {/* Right: Validation checklist + audit history */}
        <div className="space-y-3">
          <PublishingValidationCard />
          <AuditHistoryCard />
        </div>
      </div>
    </div>
  );
}

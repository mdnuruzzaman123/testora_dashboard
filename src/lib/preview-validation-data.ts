// ─── Validation checklist items ───────────────────────────────────────────────

export type ChecklistStatus = "pass" | "fail" | "warn";

export type ChecklistItem = {
  label: string;
  status: ChecklistStatus;
  detail?: string;
};

export const publishingChecklist: ChecklistItem[] = [
  { label: "Category selected", status: "pass" },
  { label: "Year selected", status: "pass" },
  { label: "Subject or Faculty selected", status: "pass" },
  { label: "At least 2 answer options provided", status: "pass" },
  { label: "Exactly 1 correct answer marked", status: "pass" },
  { label: "Valid question order assigned", status: "pass" },
  {
    label: "Valid passage connection (if used)",
    status: "warn",
    detail: "No passage linked — standalone question",
  },
  { label: "No duplicate question text detected", status: "pass" },
  { label: "All validations passed", status: "pass" },
];

// ─── Preview mock question ─────────────────────────────────────────────────────

export const previewQuestion = {
  category: "Semimatura 2025",
  subject: "Albanian Language",
  order: 3,
  total: 40,
  passage: "Passage 1 (1–5 questions)",
  text: "Cili është kuptimi i fjalës 'elaborim' në kontekstin e tekstit të dhënë?",
  options: [
    { letter: "A", text: "Sqarim i hollësishëm" },
    { letter: "B", text: "Përmbledhje e shkurtër" },
    { letter: "C", text: "Ndryshim rrënjësor" },
    { letter: "D", text: "Vlerësim kritik" },
  ],
  correctIndex: 0,
};

// ─── Audit history ────────────────────────────────────────────────────────────

export type AuditEntry = {
  action: string;
  by: string;
  at: string;
};

export const auditHistory: AuditEntry[] = [
  { action: "Question created", by: "Admin User", at: "Mar 8, 2026 at 10:32 AM" },
  { action: "Options updated", by: "Admin User", at: "Mar 9, 2026 at 11:00 AM" },
  { action: "Status changed to Review", by: "Admin User", at: "Mar 10, 2026 at 2:15 PM" },
  { action: "Passage linked (PSG-01)", by: "Admin User", at: "Mar 10, 2026 at 3:40 PM" },
];

type AuditHistoryCardProps = {
  createdBy?: string;
  dateCreated?: string;
  modifiedBy?: string;
  lastModified?: string;
};

export default function AuditHistoryCard({
  createdBy = "Admin User",
  dateCreated = "Mar 8, 2026 at 10:32 AM",
  modifiedBy = "Admin User",
  lastModified = "Mar 10, 2026 at 2:15 PM",
}: AuditHistoryCardProps) {
  return (
    <div className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-[#3f5f7a]">Audit History</h3>

      <dl className="space-y-2.5">
        <div>
          <dt className="text-[10px] font-semibold tracking-wide text-[#90a3b6] uppercase">
            Created By
          </dt>
          <dd className="mt-0.5 text-xs text-[#4f6d87]">{createdBy}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold tracking-wide text-[#90a3b6] uppercase">
            Date Created
          </dt>
          <dd className="mt-0.5 text-xs text-[#4f6d87]">{dateCreated}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold tracking-wide text-[#90a3b6] uppercase">
            Modified By
          </dt>
          <dd className="mt-0.5 text-xs text-[#4f6d87]">{modifiedBy}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold tracking-wide text-[#90a3b6] uppercase">
            Last Modified
          </dt>
          <dd className="mt-0.5 text-xs text-[#4f6d87]">{lastModified}</dd>
        </div>
      </dl>
    </div>
  );
}

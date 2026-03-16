"use client";

import { AlertTriangle, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { UserManagementRow } from "./UserRow";

type Props = {
  open: boolean;
  user: UserManagementRow | null;
  onClose: () => void;
  onConfirm: (reason: string) => void;
};

const reasons = ["Spam", "Abuse", "Payment issue", "Other"];

export default function SuspendUserModal({ open, user, onClose, onConfirm }: Props) {
  const [reason, setReason] = useState("");

  const disabled = useMemo(() => reason.trim().length === 0, [reason]);

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d4056]/30 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#dce7f2] bg-white">
        <div className="flex items-start justify-between px-5 py-4">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-[#fdeeee] text-[#db6f6f]">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#2f3f52]">Suspend User</h3>
              <p className="text-sm text-[#8ea1b4]">
                This will restrict the user&apos;s access to the platform
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#8ea1b5] hover:bg-[#f4f8fc]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-5 pb-4">
          <div className="rounded-lg border border-[#dce7f2] bg-[#f8fbff] p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#e8f2fc] text-xs font-semibold text-[#4b92d9]">
                {user.initials}
              </div>
              <div>
                <p className="font-medium text-[#4f6d87]">{user.name}</p>
                <p className="text-xs text-[#90a2b5]">{user.email}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[#4f6d87]">Reason for suspension</p>
            <div className="space-y-2">
              {reasons.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-[#dce7f2] px-3 py-2.5 hover:bg-[#f8fbff]"
                >
                  <input
                    type="radio"
                    name="suspend-reason"
                    checked={reason === item}
                    onChange={() => setReason(item)}
                    className="h-4 w-4 border-[#c5d4e2] text-[#2f86d8]"
                  />
                  <span className="text-sm text-[#4f6d87]">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[#e6edf5] px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-[#6f8194] hover:bg-[#f5f9fd]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              onConfirm(reason);
              setReason("");
            }}
            className="rounded-md bg-[#f59c9c] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Confirm Suspension
          </button>
        </div>
      </div>
    </div>
  );
}

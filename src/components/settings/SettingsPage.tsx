/* eslint-disable @next/next/no-img-element */
"use client";

import { adminProfile, passwordFormDefaults, profileFormDefaults } from "@/lib/settings-data";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import { useState } from "react";

type Tab = "edit" | "password";

const inputClass =
  "h-10 w-full rounded-md border border-[#9fb3c6] bg-white px-3 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3]";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("edit");
  const [username, setUsername] = useState(profileFormDefaults.username);
  const [passwords, setPasswords] = useState(passwordFormDefaults);

  return (
    <div className="rounded-lg border border-[#dce7f2] bg-[#e5e6e8] p-4 md:p-10">
      <div className="mx-auto w-full max-w-230">
        <div className="rounded-2xl bg-linear-to-r from-[#4a9bd7] to-[#4398dc] px-5 py-4">
          <div className="flex items-center justify-center gap-4">
            <div className="relative h-22 w-22">
              <img
                src={adminProfile.avatarUrl}
                alt={adminProfile.name}
                className="h-full w-full rounded-full border-2 border-[#ecf3fb] object-cover"
              />
              <button
                type="button"
                className="absolute right-0 bottom-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#9fc4ea] bg-[#e9f3fd] text-[#2f86d8]"
                aria-label="Update profile image"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            <div>
              <p className="text-5xl leading-none font-semibold text-white">{adminProfile.name}</p>
              <p className="mt-1 text-2xl leading-none text-[#deecfa]">{adminProfile.role}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-135">
          <div className="mb-6 flex items-center justify-center gap-8 text-[28px]">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={cn(
                "border-b-2 px-1 pb-1",
                activeTab === "edit"
                  ? "border-[#2f86d8] text-[#2f86d8]"
                  : "border-transparent text-[#111111]"
              )}
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("password")}
              className={cn(
                "border-b-2 px-1 pb-1",
                activeTab === "password"
                  ? "border-[#2f86d8] text-[#2f86d8]"
                  : "border-transparent text-[#111111]"
              )}
            >
              Change Password
            </button>
          </div>

          {activeTab === "edit" ? (
            <form className="space-y-4">
              <div className="text-center">
                <h2 className="text-4xl font-semibold text-[#2f3f52]">Edit Your Profile</h2>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#4f6d87]">User Name</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClass}
                />
              </div>

              <button
                type="button"
                className="flex h-11 w-full items-center justify-center rounded-md bg-linear-to-r from-[#2360A5] to-[#4584CA] text-sm font-semibold text-white"
              >
                Save &amp; Change
              </button>
            </form>
          ) : (
            <form className="space-y-4">
              <div className="text-center">
                <h2 className="text-4xl font-semibold text-[#2f3f52]">Change Password</h2>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#4f6d87]">Current Password</label>
                <input
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, currentPassword: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#4f6d87]">New Password</label>
                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#4f6d87]">Confirm New Password</label>
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, confirmPassword: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>

              <button
                type="button"
                className="flex h-11 w-full items-center justify-center rounded-md bg-linear-to-r from-[#2360A5] to-[#4584CA] text-sm font-semibold text-white"
              >
                Save &amp; Change
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

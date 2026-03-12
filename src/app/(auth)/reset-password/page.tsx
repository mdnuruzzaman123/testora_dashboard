"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, AlertCircle, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "One uppercase letter")
      .regex(/[a-z]/, "One lowercase letter")
      .regex(/[0-9]/, "One number")
      .regex(/[^A-Za-z0-9]/, "One special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const requirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

function strengthLabel(score: number): { label: string; color: string } {
  if (score <= 1) return { label: "Weak", color: "bg-red-400" };
  if (score <= 3) return { label: "Fair", color: "bg-amber-400" };
  if (score === 4) return { label: "Good", color: "bg-blue-400" };
  return { label: "Strong", color: "bg-green-500" };
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const passwordValue = watch("password") ?? "";
  const metCount = requirements.filter((r) => r.test(passwordValue)).length;
  const { label: strengthText, color: strengthColor } = strengthLabel(metCount);

  const onSubmit = async (_data: FormValues) => {
    setServerError(null);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setSuccess(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-[420px] px-4">
        <div className="rounded-2xl border border-gray-200 bg-white px-8 py-10 text-center shadow-sm">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
              <CheckCircle2 className="h-9 w-9 text-green-500" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Password Updated!</h2>
          <p className="mt-2 mb-6 text-sm text-gray-500">
            Your password has been reset successfully. You can now log in with your new password.
          </p>
          <Link
            href="/login"
            className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Login
          </Link>
          {email && (
            <p className="mt-4 text-xs text-gray-400">
              For your security, we recommend safely storing your new password.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px] px-4">
      {/* Brand */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 shadow-lg">
          <svg
            className="h-7 w-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L12 22M12 2L6 8M12 2L18 8" />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-widest text-gray-900">TESTORA</h1>
          <p className="mt-0.5 text-sm text-gray-400">Admin Portal</p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-gray-200 bg-white px-8 py-8 shadow-sm">
        <div className="mb-5 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Lock className="h-7 w-7 text-blue-600" />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-900">Create New Password</h2>
        <p className="mt-1 mb-6 text-center text-sm text-gray-500">
          Your new password must be different from your previous password.
        </p>

        {serverError && (
          <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* New password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">New Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                {...register("password")}
                placeholder="Enter new password"
                className={cn(
                  "w-full rounded-lg border py-2.5 pr-10 pl-3.5 text-sm text-gray-900 placeholder-gray-400 transition outline-none",
                  "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                  errors.password
                    ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/20"
                    : "border-gray-300 bg-white"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Strength bar */}
            {passwordValue && (
              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex flex-1 gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all",
                          i <= metCount ? strengthColor : "bg-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-500">{strengthText}</span>
                </div>
              </div>
            )}

            {/* Requirements checklist */}
            <div className="mt-2 space-y-1">
              {requirements.map((r) => {
                const met = r.test(passwordValue);
                return (
                  <p
                    key={r.label}
                    className={cn(
                      "flex items-center gap-1.5 text-xs",
                      met ? "text-green-600" : "text-gray-400"
                    )}
                  >
                    <CheckCircle2
                      className={cn("h-3.5 w-3.5", met ? "text-green-500" : "text-gray-300")}
                    />
                    {r.label}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Confirm new password"
                className={cn(
                  "w-full rounded-lg border py-2.5 pr-10 pl-3.5 text-sm text-gray-900 placeholder-gray-400 transition outline-none",
                  "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                  errors.confirmPassword
                    ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/20"
                    : "border-gray-300 bg-white"
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isSubmitting ? "Saving..." : "Save New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}

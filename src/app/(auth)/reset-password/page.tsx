"use client";

import { cn } from "@/lib/utils";
import { getErrorMessage, useResetPasswordMutation } from "@/store/apis";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const passwordValue = useWatch({ control, name: "password", defaultValue: "" });
  const metCount = requirements.filter((r) => r.test(passwordValue)).length;
  const { label: strengthText, color: strengthColor } = strengthLabel(metCount);

  const onSubmit = async (data: FormValues) => {
    if (!email) {
      const message = "Email is missing. Please restart the reset flow.";

      toast.error(message);
      return;
    }

    try {
      const response = await resetPassword({ email, newPassword: data.password }).unwrap();
      toast.success(response.message || "Password has been reset successfully.");
      setSuccess(true);
    } catch (error) {
      const message = getErrorMessage(error, "Something went wrong. Please try again.");

      toast.error(message);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-100 text-center">
        <div className="mb-5 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Password Updated</h2>
        <p className="mb-6 text-sm text-gray-500">
          Your password has been reset successfully. You can now log in with your new password.
        </p>
        {/* Updated email hint */}
        {email && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-700">
            ✓ Your account email has been successfully updated.
          </div>
        )}
        <Link
          href={"/login"}
          className="bg-primary hover:bg-primary/90 block w-full rounded-lg py-2.5 text-sm font-semibold text-white transition"
        >
          Back to Login
        </Link>
        <p className="mt-4 text-xs text-gray-400">
          For your security, we recommend safely storing your new password and device information.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-100">
      {/* Icon */}
      <div className="mb-5 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <Lock className="text-primary h-7 w-7" />
        </div>
      </div>

      <h2 className="mb-1 text-center text-2xl font-bold text-gray-900">Create New Password</h2>
      <p className="mb-6 text-center text-sm text-gray-500">
        Your new password must be different from your previous password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* New password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">New Password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type={showPass ? "text" : "password"}
              {...register("password")}
              placeholder="Enter new password"
              className={cn(
                "w-full rounded-lg border py-2.5 pr-10 pl-10 text-sm placeholder-gray-400 transition outline-none",
                "focus:border-primary focus:ring-primary/20 focus:ring-2",
                errors.password
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/20"
                  : "border-gray-200 bg-white"
              )}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPass((v) => !v)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Strength bar */}
          {passwordValue && (
            <div className="mt-2">
              <div className="mb-1.5 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all",
                      i <= metCount ? strengthColor : "bg-gray-200"
                    )}
                  />
                ))}
                <span className="ml-1 text-xs font-medium text-gray-500">{strengthText}</span>
              </div>
            </div>
          )}

          {/* Requirements */}
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
                    className={cn("h-3.5 w-3.5 shrink-0", met ? "text-green-500" : "text-gray-300")}
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
            <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm new password"
              className={cn(
                "w-full rounded-lg border py-2.5 pr-10 pl-10 text-sm placeholder-gray-400 transition outline-none",
                "focus:border-primary focus:ring-primary/20 focus:ring-2",
                errors.confirmPassword
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/20"
                  : "border-gray-200 bg-white"
              )}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="h-3 w-3" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isResetting}
          className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
        >
          {(isSubmitting || isResetting) && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {isSubmitting || isResetting ? "Saving..." : "Save New Password"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => router.push(`/verify-otp?email=${encodeURIComponent(email)}`)}
        className="mt-3 w-full text-xs text-gray-500 hover:text-gray-700"
      >
        Back to verification
      </button>
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

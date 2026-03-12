"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Mail, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      // Pass email to verify-otp page via query param
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

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
        <h2 className="text-xl font-semibold text-gray-900">Forgot Password?</h2>
        <p className="mt-1 mb-6 text-sm text-gray-500">
          Enter your email address and we&apos;ll send you instructions to reset your password.
        </p>

        {serverError && (
          <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                autoComplete="email"
                {...register("email")}
                placeholder="admin@testora.com"
                className={cn(
                  "w-full rounded-lg border py-2.5 pr-3.5 pl-10 text-sm text-gray-900 placeholder-gray-400 transition outline-none",
                  "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                  errors.email
                    ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/20"
                    : "border-gray-300 bg-white"
                )}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
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
            {isSubmitting ? "Sending..." : "Continue"}
          </button>
        </form>

        <div className="mt-5 flex flex-col items-center gap-2 text-center text-sm">
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Login
          </Link>
          <p className="text-gray-400">
            Remember your password?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

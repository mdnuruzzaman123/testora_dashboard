"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const OTP_LENGTH = 6;

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCoolDown, setResendCoolDown] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCoolDown <= 0) return;
    const t = setTimeout(() => setResendCoolDown((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCoolDown]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError(null);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = [...otp];
    pasted.split("").forEach((c, i) => {
      next[i] = c;
    });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter all 6 digits.");
      return;
    }
    setIsVerifying(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 900));
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Invalid code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setResendCoolDown(60);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-100 text-center">
      {/* Icon */}
      <div className="mb-5 flex justify-center">
        <div className="bg-primary/5 flex h-16 w-16 items-center justify-center rounded-2xl">
          <ShieldCheck className="text-primary h-8 w-8" />
        </div>
      </div>

      <h2 className="mb-1 text-2xl font-bold text-gray-900">Verify Code</h2>
      <p className="mb-6 text-sm text-gray-500">
        Enter the 6-digit verification code sent to your email.
      </p>

      {/* OTP inputs */}
      <div className="mb-4 flex justify-center gap-2" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`focus:border-primary focus:ring-primary/20 h-12 w-11 rounded-lg border text-center text-lg font-semibold text-gray-900 transition outline-none focus:ring-2 ${
              error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
            }`}
          />
        ))}
      </div>

      {error && <p className="mb-3 text-xs text-red-500">{error}</p>}

      <button
        onClick={handleVerify}
        disabled={isVerifying}
        className="bg-primary hover:bg-primary/90 mb-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
      >
        {isVerifying && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {isVerifying ? "Verifying..." : "Verify Code"}
      </button>

      <button
        onClick={handleResend}
        disabled={isResending || resendCoolDown > 0}
        className="text-primary mb-4 w-full text-sm font-medium hover:underline disabled:opacity-50"
      >
        {resendCoolDown > 0 ? `Resend Code (${resendCoolDown}s)` : "Resend Code"}
      </button>

      <p className="mb-4 text-xs text-gray-400">
        Didn&apos;t receive the code? Check your spam folder or request a new one.
      </p>

      <Link
        href={"/login"}
        className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </Link>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <VerifyOtpForm />
    </Suspense>
  );
}

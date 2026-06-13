"use client";

import { cn } from "@/lib/utils";
import { getErrorMessage, useForgotPasswordMutation } from "@/store/apis";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading: isSending }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await forgotPassword({ email: data.email }).unwrap();
      toast.success(response.message || "OTP sent to your email.");
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      const message = getErrorMessage(error, "Something went wrong. Please try again.");

      toast.error(message);
    }
  };

  const isSubmittingForm = isSubmitting || isSending;

  return (
    <div className="w-full max-w-100">
      <h2 className="mb-1 text-2xl font-bold text-gray-900">Forgot Password</h2>
      <p className="mb-6 text-sm text-gray-500">Enter your email address</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              autoComplete="email"
              {...register("email")}
              placeholder="your@email.com"
              className={cn(
                "w-full rounded-lg border py-2.5 pr-3.5 pl-10 text-sm placeholder-gray-400 transition outline-none",
                "focus:border-primary focus:ring-primary/20 focus:ring-2",
                errors.email
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/20"
                  : "border-gray-200 bg-white"
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
          disabled={isSubmittingForm}
          className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
        >
          {isSubmittingForm && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {isSubmittingForm ? "Sending..." : "Continue"}
        </button>
      </form>

      <div className="mt-5 flex flex-col items-center gap-3 text-sm">
        <p className="text-gray-400">
          Remember your password?{" "}
          <Link href={"/login"} className="text-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

import { baseApi } from "./baseApi";

export interface ApiEnvelope<T = unknown> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken?: string;
  userId?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export interface EmailRequest {
  email: string;
}

export interface OtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface GetMeData {
  name: string;
  email: string;
  avatar: string;
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong."): string {
  if (!error || typeof error !== "object") return fallback;

  if ("data" in error && error.data && typeof error.data === "object") {
    const apiError = error.data as { message?: unknown };
    if (typeof apiError.message === "string") return apiError.message;
  }

  if ("error" in error && typeof error.error === "string") return error.error;

  return fallback;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiEnvelope<LoginData>, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    forgotPassword: builder.mutation<ApiEnvelope<unknown>, EmailRequest>({
      query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
    }),
    resetPasswordOtp: builder.mutation<ApiEnvelope<unknown>, EmailRequest>({
      query: (body) => ({ url: "/auth/reset-password-otp", method: "POST", body }),
    }),
    verifyResetPassword: builder.mutation<ApiEnvelope<unknown>, OtpRequest>({
      query: (body) => ({ url: "/auth/verify/reset-password", method: "POST", body }),
    }),
    resetPassword: builder.mutation<ApiEnvelope<unknown>, ResetPasswordRequest>({
      query: (body) => ({ url: "/auth/reset-password", method: "POST", body }),
    }),
    resendOtp: builder.mutation<ApiEnvelope<unknown>, EmailRequest>({
      query: (body) => ({ url: "/auth/resend-otp", method: "POST", body }),
    }),
    verifyEmail: builder.mutation<ApiEnvelope<unknown>, OtpRequest>({
      query: (body) => ({ url: "/auth/verify-email", method: "POST", body }),
    }),
    refreshToken: builder.mutation<ApiEnvelope<LoginData>, RefreshTokenRequest>({
      query: (body) => ({ url: "/auth/refresh-token", method: "POST", body }),
    }),
    getMe: builder.query<ApiEnvelope<GetMeData>, void>({
      query: () => "/admin/get-me",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordOtpMutation,
  useVerifyResetPasswordMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useVerifyEmailMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
} = authApi;

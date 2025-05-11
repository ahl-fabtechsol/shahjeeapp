"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordAPI } from "@/services/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function CreateNewPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  const mutation = useMutation({
    mutationFn: ({ password }) => resetPasswordAPI({ email, password, otp }),
    onSuccess: () => {
      toast.success("Password reset successful! Please log in.");
      router.push("/auth/password-changed");
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Reset failed");
    },
  });

  const onSubmit = ({ password }) => {
    mutation.mutate({ password });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-black">
          Create New Password
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Setting a new password for{" "}
          <span className="font-medium">{email}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {mutation.error && (
          <p className="text-red-600 text-sm">
            {mutation.error?.response?.data?.message ||
              "Something went wrong. Please try again."}
          </p>
        )}

        <div>
          <Label>New Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create new password"
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label>Confirm New Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="pr-10"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Changing Password…
            </span>
          ) : (
            "Change Password"
          )}
        </Button>

        {mutation.isPending ? (
          ""
        ) : (
          <div className="flex justify-center mt-2">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-primary"
            >
              Go Back to Login
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}

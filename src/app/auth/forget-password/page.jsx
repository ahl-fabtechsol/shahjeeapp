"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAPI } from "@/services/auth";
import { Loader2 } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgetPassword() {
  const router = useRouter();
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(emailSchema) });

  const mutation = useMutation({
    mutationFn: ({ email }) => forgotPasswordAPI({ email }),
    onSuccess: () => {
      toast.success("Verification code sent to your email.");
      router.push(
        `/auth/otp-verification?email=${encodeURIComponent(submittedEmail)}`
      );
    },
    onError: (error) => {
      console.error(error);
      const message = error?.response?.data?.message || "Failed to send email.";
      toast.error(message);
    },
  });

  const onSubmit = (data) => {
    setSubmittedEmail(data.email);
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-black">Forgot Password</h1>
        <p className="mt-2 text-sm text-gray-600">
          Don't worry! It happens. Enter the email linked with your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {mutation.error && (
          <p className="text-red-600 text-sm text-center">
            {mutation.error?.response?.data?.message ||
              "Something went wrong. Please try again."}
          </p>
        )}

        <div>
          <Label>Email Address</Label>
          <Input
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </span>
          ) : (
            "Send Email"
          )}
        </Button>

        {mutation.isPending ? (
          ""
        ) : (
          <div className="flex justify-center mt-2">
            <Link
              href="/auth/login"
              className="text-xs font-medium text-primary"
            >
              Go Back to Login
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}

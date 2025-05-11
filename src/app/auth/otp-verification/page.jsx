"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { verifyOtpAPI } from "@/services/auth";
import { Loader2 } from "lucide-react";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function OTPVerification() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    const firstEmpty = otpDigits.findIndex((d) => d === "");
    if (firstEmpty >= 0 && inputRefs.current[firstEmpty]) {
      inputRefs.current[firstEmpty].focus();
    }
  }, [otpDigits]);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: otpDigits.join("") },
  });

  const mutation = useMutation({
    mutationFn: ({ otp }) => verifyOtpAPI({ email, otp }),
    onSuccess: () => {
      toast.success("OTP verified! Proceed to reset your password.");
      router.push(
        `/auth/create-newpassword?email=${encodeURIComponent(
          email
        )}&otp=${otpDigits.join("")}`
      );
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Verification failed");
    },
  });

  const onSubmit = ({ otp }) => {
    mutation.mutate({ otp });
  };

  const updateOtp = (index, value) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    const newDigits = [...otpDigits];
    newDigits[index] = cleaned;
    setOtpDigits(newDigits);
    setValue("otp", newDigits.join(""), { shouldValidate: true });

    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const newDigits = [...otpDigits];
      newDigits[index - 1] = "";
      setOtpDigits(newDigits);
      setValue("otp", newDigits.join(""), { shouldValidate: true });
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          OTP Verification
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Please enter the 6-digit code sent to <br />
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {errors.otp && (
          <p className="text-red-600 text-sm text-center">
            {errors.otp.message}
          </p>
        )}

        <div className="flex justify-center gap-2">
          {otpDigits.map((digit, idx) => (
            <Input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => updateOtp(idx, e.target.value)}
              onKeyDown={(e) => onKeyDown(idx, e)}
              className="h-12 w-12 text-center text-xl font-semibold border border-gray-200 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in…
            </span>
          ) : (
            "Verify OTP"
          )}
        </Button>

        {mutation.isPending ? (
          ""
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <Link
                href="/auth/forget-password"
                className="text-sm font-medium text-primary"
              >
                Go Back
              </Link>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

"use client";

import React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  useEffect(() => {
    const firstEmptyIndex = otp.findIndex((digit) => digit === "");
    if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
      inputRefs.current[firstEmptyIndex]?.focus();
    }
  }, [otp]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      const pastedValue = value.slice(0, 6);
      const newOtp = [...otp];

      for (let i = 0; i < pastedValue.length; i++) {
        if (i + index < 6) {
          newOtp[i + index] = pastedValue[i];
        }
      }

      setOtp(newOtp);
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    } else {
      const newOtp = [...otp];
      newOtp[index] = value.replace(/[^0-9]/g, "");
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          OTP Verification
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Please enter verification code we send to
          <br />
          your provided email.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-8 w-8 sm:h-12 sm:w-12 rounded-md border border-gray-200 text-center text-lg font-semibold focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Link href="/auth/create-newpassword">
          <Button type="button" className="w-full">
            Create New Password
          </Button>
        </Link>

        <Button type="button" variant="outline" className="w-full mt-3">
          Send Again
        </Button>

        <div className="text-center">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-primary"
          >
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}

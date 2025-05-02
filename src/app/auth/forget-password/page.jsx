"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgetPassword() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-black">Forget Password</h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Don't worry! It occurs. Please enter the email <br /> address linked
          with your account.
        </p>
      </div>

      <form className="space-y-4">
        <div className="">
          <Label className="text-sm font-medium text-black mb-1">
            Email Address
          </Label>
          <Input type="email" placeholder="Enter your email address" />
        </div>

        <Link href="/auth/otp-verification">
          <Button type="submit" className="w-full">
            Send Email
          </Button>
        </Link>
        <div className="flex justify-center mt-2">
          <Link
            href="/auth/login"
            className="font-medium text-primary text-underline text-center text-xs"
          >
            Go back
          </Link>
        </div>
      </form>
    </>
  );
}

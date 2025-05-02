"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateNewPassword() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-black">
          Create New Password
        </h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Set a new password that is unique & strong <br />
          from the previous one.
        </p>
      </div>

      <form className="space-y-4">
        <div className="">
          <Label className="text-sm font-medium text-black mb-1">
            New Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create new password"
              className="w-full rounded-md border border-gray-200 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="">
          <Label className="text-sm font-medium text-black mb-1">
            Confirm new Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full rounded-md border border-gray-200 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <Link href="/auth/password-changed">
          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </Link>

        <div className="flex justify-center mt-4">
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PasswordChanged() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-black">Password Changed</h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Your password has been updated successfully! <br /> Keep it safe &
          secure.
        </p>
      </div>

      <form className="space-y-4">
        <Link href="/auth/login">
          <Button type="submit" className="w-full">
            Back to Login
          </Button>
        </Link>
      </form>
    </>
  );
}

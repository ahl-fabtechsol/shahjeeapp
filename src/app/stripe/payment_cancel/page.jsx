"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <CardTitle className="mt-4">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Oops! Something went wrong during your payment. Please try again or
            contact support.
          </CardDescription>
          <div className="mt-6 flex flex-col space-y-3">
            <Button onClick={() => router.push("/")} variant="outline">
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

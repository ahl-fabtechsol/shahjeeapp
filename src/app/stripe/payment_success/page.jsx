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
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="mt-4">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Thank you for your purchase. Your transaction has been processed
            successfully.
          </CardDescription>
          <div className="mt-6 flex flex-col space-y-3">
            <Button onClick={() => router.push("/orders")} variant="default">
              View Your Orders
            </Button>
            <Button onClick={() => router.push("/")} variant="outline">
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { SellerDetail } from "../(components)/sellerDetail";

export default function SellerDetails() {
  const id = useParams().id;
  return (
    <div className="mx-auto p-6 sm:px-16 xl:px-32">
      <Link href="/">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Sellers
        </Button>
      </Link>
      <SellerDetail sellerId={id} />
    </div>
  );
}

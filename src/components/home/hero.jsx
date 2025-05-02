import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-10" />
      <div className=" relative z-20 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
          Your Global Marketplace for Everything
        </h1>
        <p className="text-lg md:text-xl max-w-[700px] mb-8 text-muted-foreground">
          Connect with thousands of verified suppliers worldwide. Find products
          at competitive prices and grow your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/products">Explore Products</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/suppliers">Find Suppliers</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

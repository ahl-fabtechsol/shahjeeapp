import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="w-full p-4">
      <div className="rounded-lg bg-primary/10 dark:bg-primary/5 p-8 md:p-10 lg:p-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Ready to Start Sourcing?
        </h2>
        <p className="text-muted-foreground max-w-[700px] mx-auto mb-8">
          Join thousands of businesses that use GlobalMarket to find products,
          connect with suppliers, and grow their business.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/auth/register">Create an Account</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

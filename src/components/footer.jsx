import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className=" p-10 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6" />
              <span className="font-bold text-xl">Make Easy</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your Make Easy marketplace for sourcing products from verified
              suppliers worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  href="/deals"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Deals & Discounts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Make Easy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

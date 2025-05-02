"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search, ShoppingCart, User, Menu, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    { href: "/categories", label: "Categories" },
    { href: "/sellers", label: "Sellers" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-10 lg:px-20">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
              <div className="h-full flex flex-col">
                <div className="p-6 border-b">
                  <Link href="/" className="flex items-center gap-2">
                    <Globe className="h-6 w-6" />
                    <span className="font-bold text-xl">GlobalMarket</span>
                  </Link>
                </div>

                <nav className="flex-1 overflow-y-auto p-6">
                  <ul className="space-y-2">
                    {routes.map((route) => (
                      <li key={route.href}>
                        <Link
                          href={route.href}
                          className={`block px-4 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                            pathname === route.href
                              ? "bg-muted text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {route.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="p-4 border-t text-sm text-muted-foreground text-center">
                  &copy; 2025 GlobalMarket
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="hidden items-center gap-2  md:flex ">
            <Globe className="h-6 w-6" />
            <span className="font-bold text-xl">GlobalMarket</span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Catagories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    {[
                      {
                        label: "Electronics",
                        description: "Phones, laptops, and gadgets",
                        href: "/categories/electronics",
                      },
                      {
                        label: "Fashion",
                        description: "Clothing, shoes, and accessories",
                        href: "/categories/fashion",
                      },
                      {
                        label: "Home & Garden",
                        description: "Furniture, decor, and appliances",
                        href: "/categories/home",
                      },
                      {
                        label: "Beauty",
                        description: "Skincare, makeup, and personal care",
                        href: "/categories/beauty",
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex p-2 hover:bg-muted rounded-md"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/sellers"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                      pathname === "/sellers"
                        ? "bg-muted text-primary"
                        : "bg-background hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    Sellers
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/products"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                      pathname === "/products"
                        ? "bg-muted text-primary"
                        : "bg-background hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    Products
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/deals"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                      pathname === "/deals"
                        ? "bg-muted text-primary"
                        : "bg-background hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    Deals
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                      pathname === "/about"
                        ? "bg-muted text-primary"
                        : "bg-background hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] md:w-[300px]"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <span className="sr-only">Close search</span>
                &times;
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Link href="/auth/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, User, Menu, Globe, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getUser, isLoggedIn, logout } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems);
  const loggedIn = isLoggedIn();
  const router = useRouter();
  const user = getUser();
  const userDashboard =
    user?.role === "S"
      ? "/dashboard/seller"
      : user?.role === "AD"
      ? "/dashboard/admin"
      : "/dashboard/buyer";

  const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    { href: "/sellers", label: "Sellers" },
    { href: "/deals", label: "Deals" },
    { href: "/about", label: "About Us" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

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
                    <span className="font-bold text-xl">MakeEasy</span>
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
                  &copy; 2025 MakeEasy
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="hidden items-center gap-2  md:flex ">
            <Globe className="h-6 w-6" />
            <span className="font-bold text-xl">MakeEasy</span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
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
          {loggedIn ? (
            <Link href={userDashboard} className="cursor-pointer">
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image} alt="User" />
                  <AvatarFallback>{user?.name[0]}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          ) : (
            <Link href="/auth/login" className="cursor-pointer">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          )}

          <Link href="/cart" className="cursor-pointer">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {totalItems}
              </Badge>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {loggedIn && (
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

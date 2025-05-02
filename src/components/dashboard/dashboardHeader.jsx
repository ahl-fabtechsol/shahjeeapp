"use client";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { allRoutes } from "@/lib/navigation";

export default function DashboardHeader({ type }) {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const currentPage = allRoutes[type].find((item) => item.url === pathname);

  return (
    <header className="bg-secondary sticky top-0 z-50 sm:p-5 px-5 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-black md:flex hidden">
        {currentPage?.title || "Home"}
      </h1>

      <Menu onClick={toggleSidebar} className="md:hidden" />

      <div className="flex items-center gap-4">
        <div className="flex-1 mx-6 max-w-md relative md:flex hidden">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input type="text" placeholder="Search..." className="pl-10" />
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-primary/20 transition">
            <Bell className="text-muted-foreground" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>

          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/profileImage.svg" alt="User" />
              <AvatarFallback>LI</AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-medium">Lorem Ipsum</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

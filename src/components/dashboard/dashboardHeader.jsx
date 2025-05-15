"use client";
import { Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { allRoutes } from "@/lib/navigation";
import { getUser } from "@/store/authStore";

export default function DashboardHeader({ type }) {
  const { toggleSidebar } = useSidebar();
  const user = getUser();
  const pathname = usePathname();
  const currentPage = allRoutes[type].find((item) => item.url === pathname);

  return (
    <header className="bg-secondary sticky top-0 z-50 sm:p-5 px-5 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-black md:flex hidden">
        {currentPage?.title || "Home"}
      </h1>

      <Menu onClick={toggleSidebar} className="md:hidden" />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.image || "/profileImage.svg"}
                alt="User"
              />
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.role === "AD"
                  ? "Admin"
                  : user?.role === "S"
                  ? "Seller"
                  : user?.role === "B"
                  ? "Buyer"
                  : "Manager"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

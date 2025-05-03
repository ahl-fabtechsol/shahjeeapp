"use client";

import { LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { allRoutes } from "@/lib/navigation";

export function DashboardSidebar({ type }) {
  const pathname = usePathname();
  const navigation = allRoutes[type];
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-secondary  ">
        <div className="flex flex-col items-center  p-2 sm:p-4 justify-center text-white">
          {state === "collapsed" ? (
            <span className="text-lg font-semibold my-2">V</span>
          ) : (
            <span className="text-lg font-bold text-primary header-font">
              {type === "buyer"
                ? "Buyer"
                : type === "admin"
                ? "Admin"
                : type === "seller"
                ? "Seller"
                : "Lorem Ipsum"}{" "}
              Dashboard
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-secondary  sm:p-4 p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    style={{
                      padding: "1.3rem",
                    }}
                    className={`${
                      pathname === item.url
                        ? "bg-primary text-white hover:bg-primary hover:text-white "
                        : "hover:bg-primary/20 hover:text-black text-sidebaritem-text active:bg-primary active:text-white"
                    } transition-colors duration-200`}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter className="bg-secondary p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              style={{ padding: "1.3rem" }}
              className="hover:bg-primary/20 hover:text-black text-sidebaritem-text active:bg-primary active:text-white transition-colors duration-200"
            >
              <Link href="/login">
                <LogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}

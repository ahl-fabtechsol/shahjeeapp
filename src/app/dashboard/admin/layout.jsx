import DashboardHeader from "@/components/dashboard/dashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/dashboardSidebar";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export const metadata = {
  title: "Admin Dashboard | GlobalMarket",
  description: "Manage your marketplace",
};

export default function AdminDashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <DashboardSidebar type="admin" />
      </Sidebar>
      <SidebarInset>
        <DashboardHeader type="admin" />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

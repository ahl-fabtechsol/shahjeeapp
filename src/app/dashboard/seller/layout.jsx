import DashboardHeader from "@/components/dashboard/dashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/dashboardSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export const metadata = {
  title: "Seller Dashboard | GlobalMarket",
  description: "Manage your products and orders",
};

export default function SellerDashboardLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <Sidebar variant="inset">
          <DashboardSidebar type="seller" />
        </Sidebar>
        <SidebarInset>
          <DashboardHeader type="seller" />
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

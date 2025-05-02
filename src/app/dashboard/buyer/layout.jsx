import DashboardHeader from "@/components/dashboard/dashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/dashboardSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export const metadata = {
  title: "Buyer Dashboard | GlobalMarket",
  description: "Manage your purchases and orders",
};

export default function BuyerDashboardLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <Sidebar variant="inset">
          <DashboardSidebar type="buyer" />
        </Sidebar>
        <SidebarInset>
          <DashboardHeader type="buyer" />
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

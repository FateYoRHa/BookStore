import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "@/features/admin/dashboard/components/DashboardSidebar";
import DashboardHeader from "@/features/admin/dashboard/components/DashboardHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}>
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <DashboardHeader />

        <div className="min-h-screen bg-muted">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

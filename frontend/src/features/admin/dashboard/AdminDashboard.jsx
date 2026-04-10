import DashboardSidebar from "./components/DashboardSidebar";
import DashboardCharts from "./components/DashboardCharts";
import DashboardHeader from "./components/DashboardHeader";
import DashboardCards from "./components/DashboardCards";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
const AdminDashboard = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardCards />
          <div className="px-4 lg:px-6">
            <DashboardCharts />
          </div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

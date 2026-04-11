import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCards from "./components/DashboardCards";
import DashboardCharts from "./components/DashboardCharts";
import { useGetDashboardRevenue } from "./hooks/admin_dashboard_hooks";
import { dashboardRevenue, revenueChartData } from "./util/dashboardStats";
import { revenueChartConfig } from "./util/chartConfig";
const AdminDashboard = () => {
  const { data: revenue } = useGetDashboardRevenue();
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto">
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 sticky top-0 z-10">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-6 overflow-auto">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 md:gap-6">
              <DashboardCards data={dashboardRevenue(revenue)} />
              <div className="px-4 lg:px-6">
                <DashboardCharts
                  chartData={revenueChartData(revenue?.revenue?.summary)}
                  title="Revenue Summary"
                  chartConfig={revenueChartConfig}
                />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="visits" className="space-y-6">
          {/* Visits content */}
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

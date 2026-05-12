import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCards from "./components/DashboardCards";
import DashboardCharts from "./components/DashboardCharts";
import {
  useGetDashboardCustomerSummary,
  useGetDashboardPerformanceSummary,
  useGetDashboardRevenue,
} from "./hooks/admin_dashboard_hooks";
import {
  dashboardCustomerSummary,
  dashboardPerformaceSummary,
  dashboardRevenue,
  getCustomerSummaryChartData,
  getPerformanceSummaryChartData,
  revenueChartData,
} from "./util/dashboardStats";
import {
  customerChartConfig,
  performanceChartConfig,
  revenueChartConfig,
} from "./util/chartConfig";
const AdminDashboard = () => {
  const { data: revenue } = useGetDashboardRevenue();
  const { data: customers } = useGetDashboardCustomerSummary();
  const { data: performance } = useGetDashboardPerformanceSummary();
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto">
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 sticky top-0 z-10">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:gap-6">
            <TabsContent value="revenue" className="space-y-6 overflow-auto">
              <DashboardCards
                data={dashboardRevenue(revenue)}
                metricName="Revenue"
              />
              <div className="px-4 lg:px-6">
                <DashboardCharts
                  chartData={revenueChartData(revenue?.revenue?.summary)}
                  title="Revenue Summary"
                  chartConfig={revenueChartConfig}
                />
              </div>
            </TabsContent>
            <TabsContent value="customers" className="space-y-6">
              <DashboardCards
                data={dashboardCustomerSummary(customers)}
                metricName="Visitors"
              />
              <div className="px-4 lg:px-6">
                <DashboardCharts
                  chartData={getCustomerSummaryChartData(
                    customers?.customerSummary?.customers,
                  )}
                  title="Customer Summary"
                  chartConfig={customerChartConfig}
                />
              </div>
            </TabsContent>
            <TabsContent value="performance" className="space-y-6">
              <DashboardCards
                data={dashboardPerformaceSummary(performance)}
                metricName="Orders"
              />
              <div className="px-4 lg:px-6">
                <DashboardCharts
                  chartData={getPerformanceSummaryChartData(
                    performance?.performanceSummary?.orders,
                  )}
                  title="Performance Summary"
                  chartConfig={performanceChartConfig}
                />
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

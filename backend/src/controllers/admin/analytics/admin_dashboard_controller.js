import * as adminDashboardService from "../../../services/analytics/admin_dashboard_services.js";

export async function getDashboardRevenue(req, res) {
  try {
    const revenue = await adminDashboardService.getDashboardRevenueService();
    res.status(200).json({ revenue });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch dashboard revenue" });
  }
}

import DataTable from "../../components/DataTable";
import OrdersTableColumns from "./components/OrdersTableColumns";
import { useGetAdminOrders } from "../hooks/admin_order_hooks";
const AdminOrders = () => {
  const { data } = useGetAdminOrders();
  const columns = OrdersTableColumns();
  return (
    <div className="flex min-h-0 flex-1 flex-col min-w-0 overflow-hidden p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminOrders;

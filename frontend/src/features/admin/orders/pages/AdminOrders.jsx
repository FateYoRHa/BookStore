import DataTable from "../../components/DataTable";
import OrdersTableColumns from "./components/OrdersTableColumns";
import { useGetAdminOrders } from "../hooks/admin_order_hooks";
const AdminOrders = () => {
  const { data } = useGetAdminOrders();
  const columns = OrdersTableColumns();
  return (
    <div className="flex flex-col flex-1 p-4 overflow-auto min-w-0">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminOrders;

import { useGetCategories } from "@/features/categories/hooks/category_hooks";
import DataTable from "../../components/DataTable";
import CategoryTableColumns from "./components/CategoryTableColumns";

const AdminCategories = () => {
  const { data } = useGetCategories();
  const columns = CategoryTableColumns();
  return (
    <div className="flex flex-col flex-1 p-4 overflow-auto min-w-0">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default AdminCategories;

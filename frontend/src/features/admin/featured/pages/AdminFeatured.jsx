import DataTable from "../../components/DataTable";
import { useGetFeaturedItems } from "../hooks/feature_hooks";
import FeaturedTableColumns from "./components/FeaturedTableColumns";
const AdminFeatured = () => {
  const { data, isPending: isFetching } = useGetFeaturedItems();
  const columns = FeaturedTableColumns();
  return (
    <div className="flex flex-col flex-1 p-4 overflow-auto min-w-0">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default AdminFeatured;

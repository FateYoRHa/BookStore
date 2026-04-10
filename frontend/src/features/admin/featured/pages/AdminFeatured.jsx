import { useState } from "react";
import DataTable from "../../components/DataTable";
import { useGetFeaturedItems } from "../hooks/feature_hooks";
import FeaturedTableColumns from "./components/FeaturedTableColumns";
import UpdateFeaturedDialog from "./components/UpdateFeaturedDialog";
const AdminFeatured = () => {
  const { data, isPending: isFetching } = useGetFeaturedItems();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleUpdate = (data) => {
    setSelectedItem(data);
    setOpenUpdate(true);
  };
  const columns = FeaturedTableColumns({ onUpdate: handleUpdate });
  return (
    <div className="flex flex-col flex-1 p-4 overflow-auto min-w-0">
      <DataTable data={data} columns={columns} />

      <UpdateFeaturedDialog
        open={openUpdate}
        setOpen={setOpenUpdate}
        item={selectedItem}
      />
    </div>
  );
};

export default AdminFeatured;

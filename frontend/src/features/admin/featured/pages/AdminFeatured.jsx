import { useState } from "react";
import DataTable from "../../components/DataTable";
import { useGetFeaturedItems } from "../hooks/feature_hooks";
import FeaturedTableColumns from "./components/FeaturedTableColumns";
import UpdateFeaturedDialog from "./components/UpdateFeaturedDialog";
const AdminFeatured = () => {
  const { data } = useGetFeaturedItems();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleUpdate = (data) => {
    setSelectedItem(data);
    setOpenUpdate(true);
  };
  const columns = FeaturedTableColumns({ onUpdate: handleUpdate });
  return (
    <div className="flex min-h-0 flex-1 flex-col min-w-0 overflow-hidden p-4">
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

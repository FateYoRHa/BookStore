import DataTable from "../../components/DataTable";
import CategoryTableColumns from "./components/CategoryTableColumns";
import { useState } from "react";
import AddCategory from "./components/AddCategory";
import { BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminGetCategories } from "../hooks/admin_category_hooks";

const AdminCategories = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const { data } = useAdminGetCategories();
  const columns = CategoryTableColumns();

  // HANDLERS
  const handleAddCategory = () => {
    setOpenAddForm(true);
  };
  return (
    <div className="flex flex-col flex-1 p-4 overflow-auto min-w-0">
      <Button onClick={handleAddCategory} className="self-end mb-4">
        <BookmarkPlus className="h-4 w-4" />
        Add Category
      </Button>
      <DataTable data={data} columns={columns} />

      {/* ADD CATEGORY FORM */}
      <AddCategory open={openAddForm} setOpen={setOpenAddForm} />
    </div>
  );
};

export default AdminCategories;

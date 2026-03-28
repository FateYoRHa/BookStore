import DataTable from "../../components/DataTable";
import CategoryTableColumns from "./components/CategoryTableColumns";
import { useState } from "react";
import AddCategory from "./components/AddCategory";
import { BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useAdminGetCategories,
  useReAddAdminCategory,
  useRemoveAdminCategory,
} from "../hooks/admin_category_hooks";
import EditCategory from "./components/EditCategory";

const AdminCategories = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [category, setCategory] = useState(null);
  const { data } = useAdminGetCategories();
  const { mutate: remove, isPending: isRemoving } = useRemoveAdminCategory();
  const { mutate: reAdd, isPending: isReadding } = useReAddAdminCategory();
  // HANDLERS
  const handleAddCategory = () => {
    setOpenAddForm(true);
  };
  const handleEditCategory = (category) => {
    setOpenEditForm(true);
    setCategory(category);
  };
  const handleRemoveCategory = (category) => {
    remove(category);
  };
  const handleReAddCategory = (category) => {
    reAdd(category);
  };

  // table columns
  const columns = CategoryTableColumns({
    onEdit: handleEditCategory,
    onRemove: handleRemoveCategory,
    onReAdd: handleReAddCategory,
    isRemoving,
    isReadding,
  });
  return (
    <div className="flex flex-col flex-1 p-4 overflow-auto min-w-0">
      <Button onClick={handleAddCategory} className="self-end mb-4">
        <BookmarkPlus className="h-4 w-4" />
        Add Category
      </Button>
      <DataTable data={data} columns={columns} />

      {/* ADD CATEGORY FORM */}
      <AddCategory open={openAddForm} setOpen={setOpenAddForm} />
      {/* UPDATE CATEGORY FORM */}
      <EditCategory
        open={openEditForm}
        setOpen={setOpenEditForm}
        category={category}
      />
    </div>
  );
};

export default AdminCategories;

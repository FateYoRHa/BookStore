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
import AddFeaturedDialog from "../../featured/pages/components/AddFeaturedDialog";

const AdminCategories = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openFeatured, setOpenFeatured] = useState(false);

  const [featureCategory, setFeatureCategory] = useState(null);
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

  const handleFeature = (category) => {
    setFeatureCategory(category);
    setOpenFeatured(true);
  };
  // table columns
  const columns = CategoryTableColumns({
    onEdit: handleEditCategory,
    onRemove: handleRemoveCategory,
    onReAdd: handleReAddCategory,
    onFeatured: handleFeature,
    isRemoving,
    isReadding,
  });
  return (
    <div className="flex min-h-0 flex-1 flex-col min-w-0 overflow-hidden p-4">
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
      {/* OPEN FEATURE CATEGORY FORM */}

      <AddFeaturedDialog
        featured={featureCategory}
        open={openFeatured}
        setOpen={setOpenFeatured}
        itemType="Category"
      />
    </div>
  );
};

export default AdminCategories;

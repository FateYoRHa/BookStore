import { useState } from "react";
import DataTable from "../../components/DataTable";
import AddAuthor from "./components/AddAuthor";
import EditAuthor from "./components/EditAuthor";
import AuthorTableColumns from "./components/AuthorTableColumns";
import {
  useGetAdminAuthors,
  useReAddAdminAuthor,
  useRemoveAdminAuthor,
} from "../hooks/admin_author_hooks";
import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddFeaturedDialog from "../../featured/pages/components/AddFeaturedDialog";
const AdminAuthors = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openFeatured, setOpenFeatured] = useState(false);

  const [featureAuthor, setFeatureAuthor] = useState(null);
  const [editAuthor, setEditAuthor] = useState(null);
  const { mutate: removeAuthor, isPending: isRemoving } =
    useRemoveAdminAuthor();
  const { mutate: reAddAuthor, isPending: isReAdding } = useReAddAdminAuthor();

  const handleAddAuthor = () => {
    setOpenAddForm(true);
  };
  const handleEditAuthor = (author) => {
    setEditAuthor(author);
    setOpenEditForm(true);
  };
  const handleDeleteAuthor = (author) => {
    removeAuthor(author);
  };
  const handleReAddAuthor = (author) => {
    reAddAuthor(author);
  };
  const handleFeature = (author) => {
    setFeatureAuthor(author);
    setOpenFeatured(true);
  };
  const { data } = useGetAdminAuthors();
  const column = AuthorTableColumns({
    onEdit: handleEditAuthor,
    onDelete: handleDeleteAuthor,
    onReAdd: handleReAddAuthor,
    onFeatured: handleFeature,
    isDeleting: isRemoving,
    isReAdding: isReAdding,
  });
  return (
    <div className="flex flex-col flex-1 p-4 overflow-auto min-w-0">
      <Button onClick={handleAddAuthor} className="self-end mb-4">
        <User2 className="h-4 w-4" />
        Add Author
      </Button>
      <DataTable data={data} columns={column} />
      <AddAuthor open={openAddForm} setOpen={setOpenAddForm} />
      <EditAuthor
        open={openEditForm}
        setOpen={setOpenEditForm}
        author={editAuthor}
      />

      <AddFeaturedDialog
        featured={featureAuthor}
        open={openFeatured}
        setOpen={setOpenFeatured}
        itemType="Author"
      />
    </div>
  );
};

export default AdminAuthors;

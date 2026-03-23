import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const BookCategories = ({ categ, open, setOpenCat, categories, setValue }) => {
  const handleAddCategory = (newId) => {
    setValue("categories", [...categories, newId]);
  };
  const removeCategory = (id) => {
    setValue(
      "categories",
      categories.filter((c) => c !== id),
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpenCat}>
      <DialogContent className="items-center">
        <DialogHeader>
          <DialogTitle className="text-center">Add Category</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {categ?.map((category) => {
            const exist = categories?.includes(category._id);
            return exist ? (
              <Badge
                key={category?._id}
                variant="success"
                className="flex items-center gap-1">
                {category?.name}
                <button
                  type="button"
                  onClick={() => removeCategory(category._id)}>
                  <X className="flex h-3 w-3" />
                </button>
              </Badge>
            ) : (
              <Badge
                key={category?._id}
                variant="destructive"
                className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleAddCategory(category._id)}>
                  {category?.name}
                </button>
              </Badge>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookCategories;

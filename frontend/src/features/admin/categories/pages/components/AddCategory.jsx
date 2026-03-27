import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const AddCategory = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="items-center">
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Fill in the details to add new category.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input placeholder="Category name" />
        </div>

        {/* Description */}
        <div>
          <Textarea placeholder="Description" rows={3} />
        </div>

        {/* Image Upload */}
        <div>
          {/* File Input */}
          <Input type="file" accept="image/*" />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Add Category</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;

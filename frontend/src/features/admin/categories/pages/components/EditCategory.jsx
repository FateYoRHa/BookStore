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
const EditCategory = () => {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader className="items-center">
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Fill in the details to add new category.
          </DialogDescription>
        </DialogHeader>
        <form>
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
            {/* Remove button */}
            <Button type="button" variant="ghost" size="sm" className="mt-2">
              Remove Image
            </Button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Add Category</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { featuredSections } from "@/features/admin/utils/constantValues";

const AddFeaturedDialog = ({ open, setOpen, featured, itemType }) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="items-center">
            <DialogTitle>Feature {itemType}</DialogTitle>
            <DialogDescription>
              Feature a {itemType} for customers to checkout
            </DialogDescription>
          </DialogHeader>
          <Field>
            <FieldLabel>Type</FieldLabel>
            <Input placeholder="Type" value={itemType} readOnly />
          </Field>
          <Field>
            <FieldLabel>Featured Item</FieldLabel>
            <Input value={featured?.title} readOnly />
            <Input value={featured?._id} hidden readOnly />
          </Field>
          <Field>
            <FieldLabel>Section</FieldLabel>
            <Select value="">
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>

              <SelectContent>
                {featuredSections?.map((feat) => (
                  <SelectItem key={feat} value={feat}>
                    <span className="capitalize">{feat}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <div className="flex items-end gap-3">
            <Field className="flex-1">
              <FieldLabel>Start From</FieldLabel>
              <Input type="date" />
            </Field>

            <span className="pb-2 text-sm text-muted-foreground">to</span>

            <Field className="flex-1">
              <FieldLabel>Ends In</FieldLabel>
              <Input type="date" />
            </Field>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFeaturedDialog;

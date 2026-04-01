import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddFeaturedDialog = ({ open, setOpen, featured }) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle>Feature Item</DialogTitle>
        <DialogDescription>
          Feature an Item, Book, an Author or Category
        </DialogDescription>
        <DialogContent>
          <Field>
            <FieldLabel>Type</FieldLabel>
            <Input placeholder="Type" disabled />
          </Field>
          <Field>
            <FieldLabel>Id</FieldLabel>
            <Input />
          </Field>
          <Field>
            <FieldLabel>Section</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem>Hero</SelectItem>

                <SelectItem>New Arrivals</SelectItem>

                <SelectItem>Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className="flex flex-row">
            <FieldSet>
              <Field>
                <FieldLabel>Start From</FieldLabel>
                <Input type="date" />
              </Field>
              <span>to</span>
              <Field>
                <FieldLabel>Start From</FieldLabel>
                <Input type="date" />
              </Field>
            </FieldSet>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFeaturedDialog;

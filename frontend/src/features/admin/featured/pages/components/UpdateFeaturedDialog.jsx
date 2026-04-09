import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { featuredSections } from "@/features/admin/utils/constantValues";
import { Controller } from "react-hook-form";
const UpdateFeaturedDialog = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="items-center">
            <DialogTitle>Feature</DialogTitle>
            <DialogDescription>
              Feature a for customers to checkout
            </DialogDescription>
          </DialogHeader>
          {/* FORM */}

          <Field>
            <FieldLabel>Type</FieldLabel>
            <Input />
          </Field>
          <Field>
            <FieldLabel>Featured Item</FieldLabel>
            <Input />
          </Field>
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Section</FieldLabel>

                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Section" />
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
            )}
          />
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
          <div className="flex justify-end gap-2">
            <Button type="submit">Feature</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateFeaturedDialog;

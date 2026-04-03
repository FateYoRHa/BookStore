import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFeaturedItemSchema } from "../../featureSchema";

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
import { useFeatureItem } from "../../hooks/feature_hooks";
import FormFieldError from "@/components/forms/FormFieldError";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AddFeaturedDialog = ({ open, setOpen, featured, itemType }) => {
  const { mutate: addFeatured } = useFeatureItem();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      itemId: featured?._id || "",
      itemType,
      section: "",
      startDate: "",
      endDate: "",
    },
    resolver: zodResolver(addFeaturedItemSchema),
    mode: "onChange",
  });

  const onSubmit = (item) => {
    console.log(item);
    // addFeatured(item);
    setOpen(false);
  };
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
          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <FieldLabel>Type</FieldLabel>
              <Input {...register("itemType")} value={itemType} readOnly />
              <FormFieldError error={errors?.itemType} />
            </Field>
            <Field>
              <FieldLabel>Featured Item</FieldLabel>
              <Input
                value={featured?.title || featured?.penName || featured?.name}
                readOnly
              />
              <Input
                {...register("itemId")}
                value={featured?._id}
                hidden
                readOnly
              />
              <FormFieldError error={errors?.itemId} />
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

                  <FormFieldError error={errors?.section} />
                </Field>
              )}
            />
            <div className="flex items-end gap-3">
              <Field className="flex-1">
                <FieldLabel>Start From</FieldLabel>
                <Input
                  {...register("startDate")}
                  type="date"
                  className={cn(
                    errors?.startDate &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />

                <FormFieldError error={errors?.startDate} />
              </Field>

              <span className="pb-2 text-sm text-muted-foreground">to</span>

              <Field className="flex-1">
                <FieldLabel>Ends In</FieldLabel>
                <Input
                  {...register("endDate")}
                  type="date"
                  className={cn(
                    errors?.endDate &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
                <FormFieldError error={errors?.endDate} />
              </Field>
            </div>

            <Button type="submit">Feature {itemType}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFeaturedDialog;

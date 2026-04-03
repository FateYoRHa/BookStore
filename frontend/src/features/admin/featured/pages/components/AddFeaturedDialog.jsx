import { useEffect, useState } from "react";
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
import { toast } from "sonner";

const AddFeaturedDialog = ({ open, setOpen, featured, itemType }) => {
  const { mutate: addFeatured } = useFeatureItem();
  const [isPending, setIsPending] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      itemId: "",
      itemType,
      section: "",
      startDate: "",
      endDate: "",
    },
    resolver: zodResolver(addFeaturedItemSchema),
    mode: "onChange",
  });

  // Load author data
  useEffect(() => {
    if (!featured) return;
    reset({
      itemId: featured?._id || "",
      itemType: itemType || "",
      section: "",
      startDate: "",
      endDate: "",
    });
  }, [featured, reset]);

  const onSubmit = (item) => {
    setIsPending(true);
    console.log(item);
    addFeatured(item, {
      onSuccess: () => {
        toast.success(`${item?.itemType} added to featured successfully.`);
      },
      onError: () => {
        toast.error(`Adding ${item?.itemType} to featured failed.`);
      },
      onSettled: () => {
        setIsPending(false);
      },
    });
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
          <form
            onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
            <Field>
              <FieldLabel>Type</FieldLabel>
              <Input
                {...register("itemType")}
                readOnly
                className={cn(
                  errors?.itemType &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError error={errors?.itemType} />
            </Field>
            <Field>
              <FieldLabel>Featured Item</FieldLabel>
              <Input
                value={featured?.title || featured?.penName || featured?.name}
                readOnly
              />
              <Input type="hidden" {...register("itemId")} />
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

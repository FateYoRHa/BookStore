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
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateFeaturedItem } from "../../hooks/feature_hooks";
import { normalizeFeaturedItem } from "../../utils/normalizeFeaturedItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFeaturedItemSchema } from "../../featureSchema";
import FormFieldError from "@/components/forms/FormFieldError";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// Maps API/input variants to the canonical section slugs used by Select/Zod.
const SECTION_ALIAS_MAP = {
  hero: "hero",
  "best-seller": "best-seller",
  "best seller": "best-seller",
  best_seller: "best-seller",
  bestseller: "best-seller",
  "new-arrival": "new-arrival",
  "new arrival": "new-arrival",
  new_arrival: "new-arrival",
  newarrival: "new-arrival",
  popular: "popular",
};

// Normalizes any incoming section value to a valid slug or empty string.
const normalizeSectionValue = (value) => {
  if (typeof value !== "string") return "";
  const normalizedKey = value.trim().toLowerCase();
  return SECTION_ALIAS_MAP[normalizedKey] || "";
};

const UpdateFeaturedDialog = ({ open, setOpen, item }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate: updateFeaturedItem, isPending } = useUpdateFeaturedItem();
  // Guards against repeated reset() calls when item object references change.
  const lastInitializedRef = useRef("");

  // Normalize the featured item item for easier rendering
  const featuredItem = normalizeFeaturedItem(item);
  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      itemId: "",
      itemType: "",
      section: "",
      startDate: "",
      endDate: "",
    },
    resolver: zodResolver(addFeaturedItemSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const formatDateForInput = (rawDate) => {
    if (!rawDate) return "";

    const parsedDate = rawDate instanceof Date ? rawDate : new Date(rawDate);
    if (Number.isNaN(parsedDate.getTime())) return "";

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!item?._id) return;

    // Signature of server values used to initialize the form.
    const initKey = [
      item._id,
      typeof item.item === "object" ? item.item?._id : item.item,
      item.itemType,
      item.section,
      item.startDate,
      item.endDate,
    ].join("|");

    if (lastInitializedRef.current === initKey) return;

    const itemId =
      typeof item.item === "object" ? item.item?._id : (item.item ?? "");

    reset({
      itemId,
      itemType: item.itemType ?? "",
      section: normalizeSectionValue(item.section),
      startDate: formatDateForInput(item.startDate),
      endDate: formatDateForInput(item.endDate),
    });

    lastInitializedRef.current = initKey;
  }, [
    item?._id,
    item?.endDate,
    item?.item,
    item?.itemType,
    item?.section,
    item?.startDate,
    reset,
  ]);

  const onSubmit = (featured) => {
    setIsUpdating(true);
    featured = { ...featured, id: item?.featuredCode };
    updateFeaturedItem(featured, {
      onSuccess: () => {
        toast.success("Featured item updated successfully");
        setOpen(false);
      },
      onError: () => {
        toast.error("Failed to update featured item");
      },
      onSettled: () => {
        setIsUpdating(false);
      },
    });
  };
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <Field className="flex flex-col gap-y-2 gap-x-6 text-sm">
              <FieldLabel className="font-semibold text-black">
                Item Type
              </FieldLabel>
              <Input
                {...register("itemType")}
                readOnly
                className={cn(
                  errors?.itemType &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError error={errors?.itemType} />
              <Controller
                name="section"
                control={control}
                render={({ field }) => {
                  return (
                    <Field>
                      <FieldLabel>Section</FieldLabel>

                      <Select
                        value={
                          normalizeSectionValue(field.value) ||
                          normalizeSectionValue(item?.section)
                        }
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

                      <FormFieldError
                        error={isUpdating ? errors?.section : undefined}
                      />
                    </Field>
                  );
                }}
              />
            </Field>
            <Field className="flex flex-col gap-y-2 gap-x-6 text-sm">
              <FieldLabel className="font-semibold text-black">
                {featuredItem?.featuredMeta?.startDate?.label || "Start Date"}
              </FieldLabel>
              <Input
                {...register("startDate")}
                type="date"
                className={cn(
                  errors?.startDate &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError
                error={isUpdating ? errors?.startDate : undefined}
              />
              <FieldLabel className="font-semibold text-black">
                {featuredItem?.featuredMeta?.endDate?.label || "End Date"}
              </FieldLabel>
              <Input
                {...register("endDate")}
                type="date"
                className={cn(
                  errors?.endDate &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError
                error={isUpdating ? errors?.endDate : undefined}
              />
            </Field>
            <div className="flex justify-end gap-2">
              <Button type="submit">
                {isUpdating ? (
                  <>
                    <Spinner /> Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateFeaturedDialog;

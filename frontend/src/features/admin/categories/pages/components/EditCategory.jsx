import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useUpdateAdminCategory } from "../../hooks/admin_category_hooks";

import FormFieldError from "@/components/forms/FormFieldError";
import { updateCategorySchema } from "../../categorySchema";
import { cn } from "@/lib/utils";
import { deleteImages, uploadImages } from "@/services/cloudinaryImages";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
const EditCategory = ({ open, setOpen, category }) => {
  const { mutate: editCategory } = useUpdateAdminCategory();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      newImage: undefined,
    },
  });

  // image stuff
  const newImage = watch("newImage");
  const [preview, setPreview] = useState(null);
  // Load category data
  useEffect(() => {
    if (!category) return;

    reset({
      name: category.name || "",
      description: category.description || "",
      newImage: undefined,
    });

    setPreview(category?.image?.url || null);
  }, [category, reset]);

  // Handle new image preview (override existing)
  useEffect(() => {
    if (!newImage) return;

    const url = URL.createObjectURL(newImage);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [newImage]);

  // ON SUBMIT
  const onSubmit = async (data) => {
    setIsPending(true);
    let url = category?.image;
    let res = null;
    if (data.newImage) {
      res = await uploadImages(data.newImage, "categories");
      url = res.images[0];
    }
    const payload = { ...data, image: url, catCode: category.categoryCode };
    editCategory(payload, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Category updated successfully.");
      },
      onError: async () => {
        if (res) {
          await deleteImages([url.public_id]); // <- this will delete uploaded image on error
        }
        toast.error("Failed to update category. Please try again.");
      },
      onSettled: () => setIsPending(false),
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="items-center">
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Fill in the details to update category details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="Category name"
              {...register("name")}
              className={cn(
                errors?.name && "border-red-500 focus-visible:ring-red-500",
              )}
            />

            <FormFieldError error={errors?.name} />
          </div>

          {/* Description */}
          <div>
            <Textarea
              placeholder="Description"
              rows={3}
              {...register("description")}
              className={cn(
                errors?.description &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError error={errors?.description} />
          </div>

          {/* Image Upload */}
          <div>
            {/* File Input */}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setValue("newImage", e.target.files?.[0], {
                  shouldValidate: true,
                })
              }
              className={cn(
                errors?.newImage && "border-red-500 focus-visible:ring-red-500",
              )}
            />

            {/* Error */}
            <FormFieldError error={errors?.newImage} />
            {/* Preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-md border mt-2"
              />
            )}

            {/* File name */}
            {newImage && (
              <p className="text-xs text-muted-foreground mt-1">
                {newImage.name}
              </p>
            )}

            {/* Remove button */}
            {(preview || newImage) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setValue("image", undefined, { shouldValidate: true });
                  setPreview(null);
                }}>
                Remove Image
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner /> Updating...
                </>
              ) : (
                "Update Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;

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
import { useAddAdminCategory } from "../../hooks/admin_category_hooks";

import FormFieldError from "@/components/forms/FormFieldError";
import { addCategorySchema } from "../../categorySchema";
import { cn } from "@/lib/utils";
import { uploadImages } from "@/services/cloudinaryImages";
import { toast } from "sonner";
const AddCategory = ({ open, setOpen }) => {
  const { mutate: addCategory } = useAddAdminCategory();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
  });
  // ON SUBMIT
  const onSubmit = async (data) => {
    setIsPending(true);
    const url = await uploadImages(data.image, "categories");
    const category = { ...data, image: url.images[0] };
    addCategory(category, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Category added successfully.");
      },
      onError: () => {
        toast.error("Failed to add category. Please try again.");
      },
      onSettled: () => setIsPending(false),
    });
  };

  // image stuff
  const image = watch("image");
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!image) return;

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="items-center">
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Fill in the details to add new category.
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
                setValue("image", e.target.files?.[0], {
                  shouldValidate: true,
                })
              }
              className={cn(
                errors?.image && "border-red-500 focus-visible:ring-red-500",
              )}
            />

            {/* Error */}
            <FormFieldError error={errors?.image} />
            {/* Preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-md border mt-2"
              />
            )}

            {/* File name */}
            {image && (
              <p className="text-xs text-muted-foreground mt-1">{image.name}</p>
            )}

            {/* Remove button */}
            {(preview || image) && (
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
                  <Spinner /> Adding...
                </>
              ) : (
                "Add Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;

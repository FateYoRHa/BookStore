import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldError from "@/components/forms/FormFieldError";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/ui/spinner";
import { authorSchema } from "../../authorSchema";
import { useEffect, useState } from "react";
import { useAddAdminAuthor } from "../../hooks/admin_author_hooks";
import { deleteImages, uploadImages } from "@/services/cloudinaryImages";
import { cn } from "@/lib/utils";
const AddAuthor = ({ open, setOpen }) => {
  const { mutate: addAuthor } = useAddAdminAuthor();
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      penName: "",
      bio: "",
      image: undefined,
    },
  });

  const onSubmit = async (values) => {
    setIsPending(true);
    const url = await uploadImages(values.image, "authors");
    const author = {
      ...values,
      image: url.images[0],
    };
    addAuthor(author, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Author added successfully.");
      },
      onError: async () => {
        await deleteImages([url?.images?.[0]?.public_id]);
        toast.error("Failed to add author. Please try again.");
      },
      onSettled: () => setIsPending(false),
    });
  };
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
          <DialogTitle>Add Author</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new author.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Pen Name */}
          <div>
            <Input
              placeholder="Pen Name"
              {...register("penName")}
              className={cn(
                errors?.penName && "border-red-500 focus-visible:ring-red-500",
              )}
            />

            <FormFieldError error={errors?.penName} />
          </div>

          {/* Bio */}
          <div>
            <Textarea placeholder="Bio" rows={3} {...register("bio")} />

            <FormFieldError error={errors?.bio} />
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
                "Add Author"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAuthor;

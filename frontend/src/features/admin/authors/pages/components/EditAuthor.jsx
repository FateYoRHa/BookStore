import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import FormFieldError from "@/components/forms/FormFieldError";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { updateAuthorSchema } from "../../authorSchema";
import { useUpdateAdminAuthor } from "../../hooks/admin_author_hooks";
import { Spinner } from "@/components/ui/spinner";
import { uploadImages } from "@/services/uploadImages";
const EditAuthor = ({ open, setOpen, author }) => {
  const { mutate: updateAuthor } = useUpdateAdminAuthor();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(updateAuthorSchema),
    defaultValues: {
      penName: "",
      bio: "",
      newImage: undefined,
    },
  });

  const newImage = watch("newImage");

  const [preview, setPreview] = useState(null);

  // Load author data
  useEffect(() => {
    if (!author) return;

    reset({
      penName: author.penName || "",
      bio: author.bio || "",
      newImage: undefined,
    });

    setPreview(author?.image?.url || null);
  }, [author, reset]);

  // Handle new image preview (override existing)
  useEffect(() => {
    if (!newImage) return;

    const url = URL.createObjectURL(newImage);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [newImage]);

  // Submit logic (clean separation)
  const handleFormSubmit = async (values) => {
    try {
      setIsPending(true);

      let imageUrl = author?.image;

      // ONLY upload if new image exists
      if (values.newImage) {
        const res = await uploadImages(values.newImage, "authors");
        imageUrl = res?.images[0]; // adjust based on your API response
      }

      const payload = {
        authorCode: author.authorCode,
        penName: values.penName,
        bio: values.bio,
        image: imageUrl,
      };

      updateAuthor(payload, {
        onSuccess: () => {
          toast.success("Author updated successfully.");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to update author.");
        },
        onSettled: () => setIsPending(false),
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="items-center">
          <DialogTitle>Edit Author</DialogTitle>
          <DialogDescription>
            Edit the author's details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
            <Textarea
              placeholder="Bio"
              rows={3}
              {...register("bio")}
              className={cn(
                errors?.bio && "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError error={errors?.bio} />
          </div>

          {/* Image Upload */}
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setValue("newImage", e.target.files?.[0], {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className={cn(
                errors?.newImage && "border-red-500 focus-visible:ring-red-500",
              )}
            />

            <FormFieldError error={errors?.newImage} />

            {/* Preview (new overrides old) */}
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

            {/* Remove */}
            {(preview || newImage) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setValue("newImage", undefined);
                  setPreview(author?.image?.url || null); // restore original
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
                "Update Author"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditAuthor;

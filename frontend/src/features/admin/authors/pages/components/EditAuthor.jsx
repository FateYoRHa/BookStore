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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { authorSchema } from "../../authorSchema";
import { useUpdateAdminAuthor } from "../../hooks/admin_author_hooks";
import { Spinner } from "@/components/ui/spinner";
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
    resolver: zodResolver(authorSchema),
    defaultValues: {
      penName: "",
      bio: "",
      image: undefined,
    },
  });

  // Watch new uploaded image
  const image = watch("image");

  // Preview state (handles both existing + new)
  const [preview, setPreview] = useState(null);

  // Load author data when dialog opens / author changes
  useEffect(() => {
    if (!author) return;

    reset({
      penName: author.penName || "",
      bio: author.bio || "",
      image: undefined, // important: don't preload file
    });

    // existing image preview
    setPreview(author?.image?.url || null);
  }, [author, reset]);

  // Handle new image preview
  useEffect(() => {
    if (!image) return;

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleFormSubmit = (values) => {
    setIsPending(true);

    const payload = {
      ...values,
      authorCode: author?.authorCode, // include identifier
    };
    console.log("Payload: ", payload);
    // updateAuthor(payload, {
    //   onSuccess: () => {
    //     setOpen(false);
    //   },
    // });
    setOpen(false);
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
                setValue("image", e.target.files?.[0], {
                  shouldValidate: true,
                })
              }
              className={cn(
                errors?.image && "border-red-500 focus-visible:ring-red-500",
              )}
            />

            <FormFieldError error={errors?.image} />

            {/* Preview (existing OR new) */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-md border mt-2"
              />
            )}

            {/* File name (only for new upload) */}
            {image && (
              <p className="text-xs text-muted-foreground mt-1">{image.name}</p>
            )}

            {/* Remove image (optional UX) */}
            {(preview || image) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setValue("image", undefined);
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

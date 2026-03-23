import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import FormFieldError from "@/components/forms/FormFieldError";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";
import { toast } from "sonner";

import { useGetAdminAuthorsList } from "@/features/admin/authors/hooks/admin_author_hooks";
import { addBook } from "../../bookSchema";
import { useAddAdminBook } from "../../hooks/admin_books_hooks";
import { useGetCategories } from "@/features/categories/hooks/category_hooks";
import { uploadImages } from "@/services/uploadImages";
import BookCategories from "./BookCategories";
import { Spinner } from "@/components/ui/spinner";

const AddBook = ({ open, setOpen }) => {
  const { data: authors } = useGetAdminAuthorsList();
  const { data: categ } = useGetCategories();
  const { mutate } = useAddAdminBook();
  const [openCat, setOpenCat] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      author: "",
      publisher: "",
      publicationDate: "",
      price: null,
      categories: [],
      images: [],
      quantity: null,
      pages: null,
      language: "",
    },
    resolver: zodResolver(addBook),
    mode: "onChange",
  });

  const categories = watch("categories");
  const images = watch("images");

  // Category handlers
  const addCategory = () => {
    // const newId = Date.now().toString();
    setOpenCat(true);
  };

  const removeCategory = (id) => {
    setValue(
      "categories",
      categories.filter((c) => c !== id),
    );
  };

  // Image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // append to existing newImages instead of replacing
    setValue("images", [...(images || []), ...files]);
  };

  const onSubmit = async (data) => {
    setIsPending(true);
    let uploadedUrls = [];
    if (data.images?.length > 0) {
      const res = await uploadImages(data?.images);
      uploadedUrls = res.urls;
    }
    const payload = {
      ...data,
      images: uploadedUrls,
    };
    mutate(payload, {
      onSuccess: () => {
        toast.success("Book Added.");
        setOpen(false);
        setIsPending(false);
      },
    });
  };
  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setValue("images", updated);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center">Add Book Form</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto pr-2 max-h-[calc(90vh-120px)]">
          <form
            onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            className="space-y-4">
            <FieldGroup>
              {/* TITLE */}
              <Field>
                <Label>Title</Label>
                <Input
                  {...register("title")}
                  className={cn(errors?.title && "border-red-500")}
                />
                <FormFieldError error={errors?.title} />
              </Field>
              {/* DESCRIPTION */}
              <Field>
                <Label>Description</Label>
                <Textarea
                  {...register("description")}
                  className={cn(
                    errors?.description &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
                <FormFieldError error={errors?.description} />
              </Field>
              {/* AUTHOR */}
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <Field>
                    <Label>Author</Label>

                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select author" />
                      </SelectTrigger>

                      <SelectContent>
                        {authors?.map((author) => (
                          <SelectItem key={author._id} value={author._id}>
                            {author.penName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormFieldError error={errors?.author} />
                  </Field>
                )}
              />
              {/* PUBLISHER */}
              <Field>
                <Label>Publisher</Label>
                <Input
                  {...register("publisher")}
                  className={cn(
                    errors?.publisher &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
                <FormFieldError error={errors?.publisher} />
              </Field>
              {/* DATE */}
              <Field>
                <Label>Publication Date</Label>
                <Input
                  type="date"
                  {...register("publicationDate")}
                  className={cn(
                    errors?.publicationDate &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
                <FormFieldError error={errors?.publicationDate} />
              </Field>
              {/* CATEGORIES */}
              <Field>
                <Label>Categories</Label>
                {/* CATEGORY DIALOG */}
                <BookCategories
                  open={openCat}
                  setOpenCat={setOpenCat}
                  categ={categ}
                  categories={categories}
                  setValue={setValue}
                />
                <div className="flex flex-wrap gap-2 mb-2">
                  {categories?.map((catId) => {
                    const catName =
                      categ?.find((c) => c._id === catId)?.name || catId;
                    return (
                      <Badge key={catId} className="flex items-center gap-1">
                        {catName}
                        <button
                          type="button"
                          onClick={() => removeCategory(catId)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>

                <Button type="button" variant="secondary" onClick={addCategory}>
                  Add Category
                </Button>

                <FormFieldError error={errors?.categories} />
              </Field>
              {/* PAGES */}
              <Field>
                <Label>Pages</Label>
                <Input
                  type="number"
                  {...register("pages")}
                  className={`[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none [-moz-appearance:textfield] focus-visible:ring-0 ${cn(
                    errors?.pages &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}`}
                />
                <FormFieldError error={errors?.pages} />
              </Field>
              {/* Language */}
              <Field>
                <Label>Language</Label>
                <Input
                  {...register("language")}
                  className={cn(
                    errors?.language &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
                <FormFieldError error={errors?.language} />
              </Field>
              {/* Quantity */}
              <Field>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  {...register("quantity")}
                  className={`[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none [-moz-appearance:textfield] focus-visible:ring-0 ${cn(
                    errors?.quantity &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}`}
                />
                <FormFieldError error={errors?.pages} />
              </Field>
              {/* PRICE */}
              <Field>
                <Label>Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("price")}
                  className={`[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none [-moz-appearance:textfield] focus-visible:ring-0 ${cn(
                    errors?.description &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}`}
                />
                <FormFieldError error={errors?.price} />
              </Field>
              {/* IMAGE */}
              <Field>
                <Label>Images</Label>

                <Input type="file" multiple onChange={handleImageUpload} />

                <FormFieldError error={errors?.images} />

                <div className="flex gap-2 mt-2 flex-wrap">
                  {images?.map((file, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        className="h-16 w-16 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-0 right-0 bg-black text-white rounded-full">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </Field>
            </FieldGroup>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner /> Adding...
                  </>
                ) : (
                  "Add Book"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;

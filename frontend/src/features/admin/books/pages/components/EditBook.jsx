import { useState, useEffect } from "react";

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

import { useGetAdminAuthorsList } from "@/features/admin/authors/hooks/admin_author_hooks";

const EditBook = ({ book, open, setOpen }) => {
  const { data: authors } = useGetAdminAuthorsList();

  // local for state
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    publisher: "",
    publicationDate: "",
    price: "",
    categories: [],
    images: [],
  });

  // populate book when form changes
  useEffect(() => {
    if (!book) return;

    setForm({
      title: book.title || "",
      description: book.description || "",
      author: book.author?._id || "",
      publisher: book.publisher || "",
      publicationDate: book.publicationDate || "",
      price: book.price || "",
      categories: book.categories || [],
      images: book.images || [],
    });
  }, [book]);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // handle author select change
  const handleAuthorChange = (value) => {
    setForm((prev) => ({ ...prev, author: value }));
  };

  // remove category
  const removeCategory = (id) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c._id !== id),
    }));
  };

  // TEMPORARY add category
  // TODO make modal for adding category
  const addCategory = () => {
    const newCategory = {
      _id: Date.now().toString(),
      name: "New Category",
    };

    setForm((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategory],
    }));
  };

  /**
   * Handle image upload (frontend only preview)
   */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file), // preview
    }));

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...previews],
    }));
  };

  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <p className="text-sm text-muted-foreground">{book.bookCode}</p>
        </DialogHeader>
        <div className="overflow-y-auto pr-2 max-h-[calc(90vh-120px)]">
          {" "}
          <form className="space-y-4">
            <FieldGroup>
              {/* TITLE */}
              <Field>
                <Label>Title</Label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </Field>

              {/* DESCRIPTION */}
              <Field>
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </Field>

              {/* AUTHOR SELECT */}
              <Field>
                <Label>Author</Label>
                <Select value={form.author} onValueChange={handleAuthorChange}>
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
              </Field>

              {/* PUBLISHER */}
              <Field>
                <Label>Publisher</Label>
                <Input
                  name="publisher"
                  value={form.publisher}
                  onChange={handleChange}
                />
              </Field>

              {/* PUBLICATION DATE */}
              <Field>
                <Label>Publication Date</Label>
                <Input
                  type="date"
                  name="publicationDate"
                  value={form.publicationDate?.slice(0, 10)}
                  onChange={handleChange}
                />
              </Field>

              {/* PRICE */}
              <Field>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </Field>

              {/* CATEGORIES */}
              <Field>
                <Label>Categories</Label>

                {/* Existing categories */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.categories.map((cat) => (
                    <Badge key={cat._id} className="flex items-center gap-1">
                      {cat.name}

                      {/* Remove category */}
                      <button
                        type="button"
                        onClick={() => removeCategory(cat._id)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                {/* Add category (TEMP) */}
                <Button type="button" variant="secondary" onClick={addCategory}>
                  Add Category
                </Button>
              </Field>

              {/* IMAGE UPLOAD */}
              <Field>
                <Label>Images</Label>

                <Input type="file" multiple onChange={handleImageUpload} />

                {/* Preview */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {form.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url || img}
                      alt="preview"
                      className="h-16 w-16 object-cover rounded border"
                    />
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

              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;

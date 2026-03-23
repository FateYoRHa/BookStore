import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const BooksTable = ({ books = [], onEdit, onDelete, isDeleting }) => {
  /*Formats a date into a readable string. Used for publicationDate column.*/
  const formatDate = (date) => {
    if (!date) return "-"; // fallback if null/undefined
    return new Date(date).toLocaleDateString();
  };

  /* Formats price into PHP currency format. Example: 1200 -> ₱1,200  */
  const formatPrice = (price) => {
    return `₱${price?.toLocaleString()}`;
  };
  const rows = useMemo(() => books, [books]);

  return (
    <div className="flex flex-col h-full rounded-2xl border bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* If no data, show empty state */}

            {rows?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex min-h-[400px] items-center justify-center text-muted-foreground">
                    No books found.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              rows?.map((book) => {
                const imageUrl =
                  book?.images?.[0]?.url || "https://via.placeholder.com/40";

                return (
                  <TableRow key={book._id}>
                    {/* BOOK INFO (image + title + publisher) */}
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <img
                          src={imageUrl}
                          alt={book.title}
                          className="h-10 w-10 rounded-md object-cover border shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          {/* Title */}
                          <span className="font-medium leading-tight line-clamp-2">
                            {book.title}
                          </span>
                          {/* Metadata row */}

                          {/* BOOK CODE (auto-generated in backend) */}
                          <span className="font-mono opacity-70">
                            {book.bookCode}
                          </span>
                          {/* AUTHOR (populated from backend) */}
                          <div className="text-xs text-muted-foreground flex flex-wrap gap-x-2">
                            <span>Author: {book.author?.penName}</span>
                          </div>
                          {/* Publisher */}
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            Publisher: {book.publisher}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {book.deletedAt ? (
                        <span className="text-xs px-2 py-1 rounded-md bg-destructive text-destructive-foreground">
                          Deleted
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-md bg-success text-success-foreground">
                          Active
                        </span>
                      )}
                    </TableCell>
                    {/* CATEGORIES (array of populated category objects) */}
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {book.categories?.length > 0 ? (
                          book.categories.map((cat) => (
                            <Badge key={cat._id} variant="secondary">
                              {cat.name}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            —
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* PRICE */}
                    <TableCell>{formatPrice(book.price)}</TableCell>

                    {/* INVENTORY (virtual populate) */}
                    <TableCell>
                      <Badge
                        variant={
                          book?.inventory?.quantity === 0
                            ? "destructive"
                            : book?.inventory?.quantity < 10
                              ? "warning"
                              : "default"
                        }>
                        {/* fallback to 0 if inventory is missing */}
                        {book?.inventory?.quantity ?? 0}
                      </Badge>
                    </TableCell>

                    {/* PUBLICATION DATE */}
                    <TableCell>{formatDate(book.publicationDate)}</TableCell>

                    {/* ACTION BUTTONS */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          /* Pass selected book to parent handler, Parent decides what to do (open modal, navigate, etc.) */
                          onClick={() => onEdit(book)}>
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          /**
                           * Same idea as edit — delegate logic to parent
                           */
                          onClick={() => onDelete(book.bookCode)}
                          disabled={isDeleting}>
                          {isDeleting ? (
                            <Spinner className="h-4 w-4" />
                          ) : (
                            <Trash className="h-4 w-4 text-destructive" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BooksTable;

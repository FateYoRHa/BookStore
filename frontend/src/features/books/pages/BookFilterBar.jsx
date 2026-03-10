import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetCategories } from "@/features/categories/hooks/category_hooks";

const BookFilterBar = ({ searchInput, setSearchInput }) => {
  /**
   * useSearchParams lets us read & modify the URL query string
   * Example:
   * /books?search=harry&minPrice=10
   */
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Helper function to update a single query param.
   * If value is empty, remove it from URL.
   */
  const { data: categories } = useGetCategories();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "newest";
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (!value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };
  useEffect(() => {
    if (!searchParams.get("sort")) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("sort", "newest");
        return params;
      });
    }
  }, [searchParams, setSearchParams]);
  /**
   * Clears all filters at once.
   * Resets URL back to /books
   */
  const clearFilters = () => {
    setSearchParams({ sort: "newest" });
  };

  return (
    /**
     * Card acts as the visual filter container
     * - shadow-sm → subtle depth
     * - sticky top-24 → stays visible while scrolling (desktop UX)
     */
    <Card className="shadow-sm sticky top-24">
      <CardHeader>
        <CardTitle>Filter Books</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* ========================= */}
        {/* SEARCH INPUT */}
        {/* ========================= */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            value={searchInput}
            placeholder="Search by title..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* ========================= */}
        {/* CATEGORY SELECT */}
        {/* ========================= */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Category</label>

          <Select
            value={category}
            onValueChange={(value) => updateParam("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <ul className="grid w-[600px] grid-cols-3 gap-x-6 gap-y-2 p-6">
                {categories?.map((category) => (
                  <SelectItem key={category?._id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </ul>
            </SelectContent>
          </Select>
        </div>

        {/* ========================= */}
        {/* PRICE RANGE */}
        {/* ========================= */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Min Price</label>
          <Input
            type="number"
            value={minPrice}
            placeholder="0"
            onChange={(e) => updateParam("minPrice", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Max Price</label>
          <Input
            type="number"
            value={maxPrice}
            placeholder="100"
            onChange={(e) => updateParam("maxPrice", e.target.value)}
          />
        </div>

        {/* ========================= */}
        {/* ↕ SORT SELECT */}
        {/* ========================= */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Sort By</label>

          <Select
            value={sort}
            onValueChange={(value) => updateParam("sort", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort books" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ========================= */}
        {/* CLEAR BUTTON */}
        {/* ========================= */}
        <Button variant="outline" onClick={clearFilters} className="mt-4">
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};
export default BookFilterBar;

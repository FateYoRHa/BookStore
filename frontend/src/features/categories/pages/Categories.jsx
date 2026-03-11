import { useGetCategories } from "../hooks/category_hooks";
import CategorySkeleton from "./components/CategorySkeleton";
import CategoryCard from "./components/CategoryCard";
const Categories = () => {
  const { data: categories, isLoading } = useGetCategories();
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* ================= Header SECTION ================= */}
      <section className="container flex flex-col items-center text-center mx-auto px-4 py-5">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          Discover Your Next Favorite Book Category(Genre)
        </h1>
      </section>

      {/* Categories Grid */}
      {isLoading ? (
        <div
          className="grid gap-5 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-6 ">
          {Array.from({ length: 16 }).map((_, i) => (
            <CategorySkeleton key={i} />
          ))}
        </div>
      ) : (
        <div
          className="grid gap-5 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-6 ">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;

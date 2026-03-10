// Homepage.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Homepage() {
  return (
    // Main page wrapper
    // This ensures full width and vertical spacing between sections
    <div className="bg-background">
      {/* ================= HERO SECTION ================= */}
      {/* Container centers content horizontally */}
      <section className="container mx-auto px-4 py-16">
        {/* 
          flex → activates Flexbox
          flex-col → stack items vertically
          items-center → center horizontally
          text-center → center text
          gap-6 → space between elements
        */}
        <div className="flex flex-col items-center text-center gap-6">
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Discover Your Next Favorite Book
          </h1>

          {/* Subtext */}
          <p className="text-muted-foreground max-w-2xl">
            Explore thousands of books across all genres. From fiction to
            business, we have something for everyone.
          </p>

          {/* CTA Buttons container */}
          <div className="flex gap-4">
            <Button size="lg">Browse Books</Button>
            <Link to={`/categories`}>
              <Button variant="outline" size="lg">
                View Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED BOOKS ================= */}

      <section className="container mx-auto px-4 py-12">
        {/* Section Title */}
        <h2 className="text-3xl font-semibold mb-8">Featured Books</h2>

        {/* 
          grid → CSS Grid layout
          grid-cols-1 → 1 column on mobile
          sm:grid-cols-2 → 2 columns on small screens
          md:grid-cols-3 → 3 columns on medium screens
          lg:grid-cols-4 → 4 columns on large screens
          gap-6 → spacing between cards
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Individual Book Card */}
          {[1, 2, 3, 4].map((book) => (
            <Card key={book} className="hover:shadow-lg transition-shadow">
              {/* 
                CardContent adds padding automatically
                p-4 ensures internal spacing
              */}
              <CardContent className="p-4 flex flex-col gap-4">
                {/* Book Image Placeholder */}
                <div className="aspect-[3/4] bg-muted rounded-md" />

                {/* Book Title */}
                <h3 className="font-semibold">Book Title</h3>

                {/* Author */}
                <p className="text-sm text-muted-foreground">Author Name</p>

                {/* Price + Button Row */}
                <div className="flex justify-between items-center mt-auto">
                  {/* 
                    mt-auto pushes this section to bottom
                    (because parent is flex column)
                  */}
                  <span className="font-bold">$19.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      {/* <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8">Browse by Category</h2>

          {/* 
            flex-wrap allows items to wrap to next line
            gap-4 spaces category cards

          <div className="flex flex-wrap gap-4">
            {["Fiction", "Business", "Technology", "Self-Help"].map((cat) => (
              <Card key={cat} className="w-48 hover:shadow-md transition">
                <CardContent className="p-6 text-center font-medium">
                  {cat}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 BookStore. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

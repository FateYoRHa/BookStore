import { Link } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCart } from "@/features/cart/hooks/cart_hooks.js";
import AuthPage from "@/features/auth/pages/AuthPage";
import { Logout } from "@/features/auth/pages/forms/Logout";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Search, ShoppingCart, Menu } from "lucide-react";

export default function NavBar() {
  // In real app these come from Zustand or React Query
  const user = useAuthStore((state) => state.user);
  const customer = useAuthStore((state) => state.customer).customer;
  const cart = useCart();
  const cartCount = cart?.data?.items.length;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* ===================================== */}
        {/* LEFT SIDE: LOGO */}
        {/* ===================================== */}

        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-primary">
          Leaf & Ledger
        </Link>

        {/* ===================================== */}
        {/* DESKTOP NAVIGATION */}
        {/* Hidden on mobile */}
        {/* ===================================== */}

        <div className="hidden md:flex items-center gap-8 font-medium font-sans">
          {/* -------- Categories Dropdown -------- */}
          <NavigationMenu>
            <NavigationMenuList>
              {/* BOOKS */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild // Use asChild if wrapping a framework's Link component
                  className={`${navigationMenuTriggerStyle()} hover:border-b-2 hover:border-primary transition-colors`}>
                  <Link to="/books">Books</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

                {/* Dropdown Panel */}
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-6 md:grid-cols-2">
                    {/* // TODO map all categories */}
                    {["Fiction", "Business", "Science", "Children"].map(
                      (category) => (
                        <li key={category}>
                          <Link
                            to={`/books?category=${category}`}
                            className="block rounded-md p-3 hover:bg-muted transition">
                            {category}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* BEST SELLERS */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild // Use asChild if wrapping a framework's Link component
                  className={`${navigationMenuTriggerStyle()}hover:border-b-2 hover:border-primary transition-colors`}>
                  <Link to="/best-sellers">Best Sellers</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* AUTHORS */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild // Use asChild if wrapping a framework's Link component
                  className={`${navigationMenuTriggerStyle()} hover:border-b-2 hover:border-primary transition-colors`}>
                  <Link to="/authors">Authors</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* END OF AUTHORS */}
            </NavigationMenuList>
          </NavigationMenu>
          {/* -------- Search Bar -------- */}
          {/* Important for bookstore UX */}
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input placeholder="Search books, authors..." className="pl-9" />
          </div>
        </div>

        {/* ===================================== */}
        {/* RIGHT SIDE: CART + AUTH */}
        {/* ===================================== */}

        <div className="flex items-center gap-4">
          {/* -------- Cart Icon -------- */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />

            {/* Badge for item count */}
            {user && cartCount > 0 && (
              <Badge className="absolute -right-2 -top-2 px-1.5 text-xs">
                {cartCount}
              </Badge>
            )}
          </Link>

          {/* -------- Auth Dropdown -------- */}
          {user ? (
            <DropdownMenu>
              {/* Avatar trigger */}
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>{customer?.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog>
              <DialogTitle className="sr-only"></DialogTitle>
              <DialogDescription className="sr-only"></DialogDescription>
              <DialogTrigger asChild>
                <Button variant="outline">Login</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-5xl">
                <AuthPage />
              </DialogContent>
            </Dialog>
          )}

          {/* ===================================== */}
          {/* MOBILE MENU (Hamburger) */}
          {/* Visible only on mobile */}
          {/* ===================================== */}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            {/* Drawer Content */}
            <SheetContent side="left" className="w-72">
              <SheetTitle className="sr-only"></SheetTitle>
              {/* Mobile Search */}
              <div className="mb-6">
                <Input placeholder="Search books..." />
              </div>

              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-4">
                <Link to="/books" className="text-sm font-medium">
                  All Books
                </Link>

                <Link to="/books?category=Fiction">Fiction</Link>

                <Link to="/books?category=Business">Business</Link>

                <Link to="/books?category=Science">Science</Link>

                <Link to="/deals">Deals</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

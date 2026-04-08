import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/AuthPage";

// PUBLIC PAGES
import MainLayout from "./MainLayout";
import HomePage from "@/features/homepage/pages/HomePage";

import Books from "@/features/books/pages/Books";
import BookDetails from "@/features/books/pages/BookDetails";

import Cart from "@/features/cart/pages/Cart";

import Authors from "@/features/authors/pages/Authors";
import AuthorDetails from "@/features/authors/pages/AuthorDetails";

import Profile from "@/features/customers/pages/Profile";

import PaymentSuccess from "../features/orders/pages/components/PaymentSuccess";
import PaymentFailed from "../features/orders/pages/components/PaymentFailed";

import CustomerOrders from "@/features/orders/pages/CustomerOrders";

import Categories from "@/features/categories/pages/Categories";

import CustomerWishlist from "@/features/wishlist/pages/CustomerWishlist";

// ADMIN PAGES
import AdminLayout from "./AdminLayout";
import RouteGuard from "./RouteGuard";
import AdminDashboard from "@/features/admin/dashboard/AdminDashboard";
import AdminBooks from "@/features/admin/books/pages/AdminBooks";
import AdminAuthors from "@/features/admin/authors/pages/AdminAuthors";
import AdminCategories from "@/features/admin/categories/pages/AdminCategories";
import AdminOrders from "@/features/admin/orders/pages/AdminOrders";
import OrderDetails from "@/features/admin/orders/pages/components/OrderDetails";
import OrderUpdate from "@/features/admin/orders/pages/components/OrderUpdate";
import AdminFeatured from "@/features/admin/featured/pages/AdminFeatured";
import ViewFeaturedItem from "@/features/admin/featured/pages/components/ViewFeaturedItem";
export default function AppRouter() {
  return (
    <Routes>
      {/* ========================== PUBLIC ROUTES ========================== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/profile"
          element={
            <RouteGuard allowedRoles={["customer"]}>
              <Profile />
            </RouteGuard>
          }
        />

        <Route
          path="/cart"
          element={
            <RouteGuard allowedRoles={["customer"]}>
              <Cart />
            </RouteGuard>
          }
        />
        <Route
          path="/customer/orders"
          element={
            <RouteGuard allowedRoles={["customer"]}>
              <CustomerOrders />
            </RouteGuard>
          }
        />

        <Route path="/categories" element={<Categories />} />
        <Route
          path="/wishlist"
          element={
            <RouteGuard allowedRoles={["customer"]}>
              <CustomerWishlist />
            </RouteGuard>
          }
        />

        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />

        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
        <Route path="/checkout/success" element={<PaymentSuccess />} />
        <Route path="/checkout/failed" element={<PaymentFailed />} />
      </Route>

      {/* ========================== ADMIN ROUTES ========================== */}

      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <RouteGuard>
              <AdminDashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/books"
          element={
            <RouteGuard>
              <AdminBooks />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/authors"
          element={
            <RouteGuard>
              <AdminAuthors />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <RouteGuard>
              <AdminCategories />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <RouteGuard>
              <AdminOrders />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/order/detail/:id"
          element={
            <RouteGuard>
              <OrderDetails />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/order/update/:id"
          element={
            <RouteGuard>
              <OrderUpdate />
            </RouteGuard>
          }
        />
        {/* FEATURED ITEMS */}
        <Route
          path="/admin/featured"
          element={
            <RouteGuard>
              <AdminFeatured />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/featured/:id"
          element={
            <RouteGuard>
              <ViewFeaturedItem />
            </RouteGuard>
          }
        />
      </Route>
    </Routes>
  );
}

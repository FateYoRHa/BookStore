import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./RouteGuard";
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
import BooksTable from "@/features/admin/books/BooksTable";
import AuthorsTable from "@/features/admin/authors/AuthorsTable";
import CategoriesTable from "@/features/admin/categories/CategoriesTable";
import OrdersTable from "@/features/admin/orders/OrdersTable";

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
            <RouteGuard>
              <Profile />
            </RouteGuard>
          }
        />

        <Route
          path="/cart"
          element={
            <RouteGuard>
              <Cart />
            </RouteGuard>
          }
        />
        <Route path="/customer/orders" element={<CustomerOrders />} />

        <Route path="/categories" element={<Categories />} />
        <Route
          path="/wishlist"
          element={
            <RouteGuard>
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
              <BooksTable />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/authors"
          element={
            <RouteGuard>
              <AuthorsTable />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/category"
          element={
            <RouteGuard>
              <CategoriesTable />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <RouteGuard>
              <OrdersTable />
            </RouteGuard>
          }
        />
      </Route>
    </Routes>
  );
}
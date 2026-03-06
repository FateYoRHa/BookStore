import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/AuthPage";

import HomePage from "@/features/homepage/pages/HomePage";

import Books from "@/features/books/pages/Books";
import BookDetails from "@/features/books/pages/BookDetails";

import Cart from "@/features/cart/pages/Cart";

import Author from "@/features/authors/pages/Author";
import Profile from "@/features/customers/pages/Profile";

import PaymentSuccess from "../features/orders/pages/components/PaymentSuccess";
import PaymentFailed from "../features/orders/pages/components/PaymentFailed";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetails />} />

      <Route path="/authors" element={<Author />} />

      <Route path="/checkout/success" element={<PaymentSuccess />} />
      <Route path="/checkout/failed" element={<PaymentFailed />} />
    </Routes>
  );
}

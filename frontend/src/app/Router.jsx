import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/AuthPage";

import HomePage from "@/features/homepage/pages/HomePage";

import Books from "@/features/books/pages/Books";
import BookDetails from "@/features/books/pages/BookDetails";

import Author from "@/features/authors/pages/Author";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetails />} />

      <Route path="/authors" element={<Author />} />
    </Routes>
  );
}

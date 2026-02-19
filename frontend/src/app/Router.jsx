import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/AuthPage";

import HomePage from "@/features/HomePage";

import Books from "@/features/books/pages/Books";

import Author from "@/features/authors/pages/Author";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/books" element={<Books />} />

      <Route path="/authors" element={<Author />} />
    </Routes>
  );
}

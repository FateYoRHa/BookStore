import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import Books from "@/features/books/pages/Books";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/books" element={<Books />} />
    </Routes>
  );
}

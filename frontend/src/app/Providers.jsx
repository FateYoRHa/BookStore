import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "../services/queryClient.js";

import NavBar from "@/components/NavBar.jsx";

// This file wraps GLOBAL providers.
// Anything that should exist across the whole app goes here.
// if you add new imports, package etc. add them here

export default function Providers({ children }) {
  return (
    // Enables React Query across the entire app
    <QueryClientProvider client={queryClient}>
      {/* Enables routing system */}
      <BrowserRouter>
        <NavBar />
        <div className="min-h-screen bg-muted">
          {/* Renders whatever component is passed (AppRouter) */}
          {children}
        </div>

        {/* Toast notification system */}
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

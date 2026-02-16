import { QueryClient } from "@tanstack/react-query";

// This creates the central cache manager for ALL server data.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, //Controls retry behavior, if it fails it will retry once
      refetchOnWindowFocus: false, //Prevents excessive refetching,will not refetch when tab refocuses
      staleTime: 1000 * 60 * 2, // data is "fresh" for 2 minutes
    },
  },
});

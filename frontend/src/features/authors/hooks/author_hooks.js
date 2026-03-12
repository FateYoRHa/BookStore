import { useQuery } from "@tanstack/react-query";
import { getAuthorsRequest, getAuthorRequest } from "../api/authors";

/*
Fetch authors with pagination + search
*/

export const useGetAuthors = ({ page, search, limit = 12 }) => {
  return useQuery({
    queryKey: ["authors", page, search, limit],
    queryFn: () =>
      getAuthorsRequest({
        page,
        search,
        limit,
      }),

    keepPreviousData: true, // prevents UI flicker during page change
  });
};
export const useGetAuthor = (id) => {
  return useQuery({
    queryKey: ["authors", id],
    queryFn: () => getAuthorRequest(id),
    keepPreviousData: true,
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

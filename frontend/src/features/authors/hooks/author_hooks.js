import { useQuery } from "@tanstack/react-query";
import { getAuthorsRequest } from "../api/authors";

/*
Fetch authors with pagination + search
*/

export const useGetAuthors = ({ page, search, limit = 12 }) => {
  return useQuery({
    queryKey: ["authors", page, search, limit],

    /*
    queryFn runs when queryKey changes
    (page or search change)
    */
    queryFn: () =>
      getAuthorsRequest({
        page,
        search,
        limit,
      }),

    keepPreviousData: true, // prevents UI flicker during page change
  });
};

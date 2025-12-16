import { useInfiniteQuery } from '@tanstack/react-query';
import { movieApi } from '../api/endpoints';

export const useSearchMovies = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: ({ pageParam = 1 }) => movieApi.searchMovies(query, pageParam),
    getNextPageParam: (lastPage) => {
      // If current page is less than total pages, return next page number
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!query, // Only fetch if there is a query
    staleTime: 1000 * 60 * 5,
  });
};

import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../api/endpoints';

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: ['movies', 'trending'],
        queryFn: () => movieApi.getTrending('week'),
    });
};

export const useNowPlayingMovies = () => {
    return useQuery({
        queryKey: ['movies', 'nowPlaying'],
        queryFn: () => movieApi.getNowPlaying(),
    });
};

export const useTopRatedMovies = () => {
    return useQuery({
        queryKey: ['movies', 'topRated'],
        queryFn: () => movieApi.getTopRated(),
    });
};

export const usePopularMovies = () => {
    return useQuery({
        queryKey: ['movies', 'popular'],
        queryFn: () => movieApi.getPopular(),
    });
};

export const useMovieDetails = (id: string | undefined) => {
    return useQuery({
        queryKey: ['movie', id],
        queryFn: () => movieApi.getMovieDetails(Number(id)),
        enabled: !!id, // Only fetch if id exists
    });
};

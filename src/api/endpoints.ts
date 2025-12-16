import tmdbClient from './tmdbClient';
import type { Movie, PaginatedResponse, MovieDetails } from './types';

export const movieApi = {
  getTrending: async (timeWindow: 'day' | 'week' = 'week') => {
    const response = await tmdbClient.get<PaginatedResponse<Movie>>(`/trending/movie/${timeWindow}`);
    return response.data;
  },
  getNowPlaying: async (page = 1) => {
    const response = await tmdbClient.get<PaginatedResponse<Movie>>('/movie/now_playing', { params: { page } });
    return response.data;
  },
  getTopRated: async (page = 1) => {
    const response = await tmdbClient.get<PaginatedResponse<Movie>>('/movie/top_rated', { params: { page } });
    return response.data;
  },
  getPopular: async (page = 1) => {
      const response = await tmdbClient.get<PaginatedResponse<Movie>>('/movie/popular', { params: { page }});
      return response.data;
  },
  searchMovies: async (query: string, page = 1) => {
    const response = await tmdbClient.get<PaginatedResponse<Movie>>('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },
  getMovieDetails: async (id: number) => {
    // append_to_response allows fetching videos and credits in one go
    const response = await tmdbClient.get<MovieDetails>(`/movie/${id}`, {
        params: { append_to_response: 'videos,credits,similar' }
    });
    return response.data;
  }
};

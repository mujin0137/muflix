export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string; // YouTube
    type: string; // Trailer, Teaser
}

export interface MovieDetails extends Movie {
    genres: Genre[];
    runtime: number;
    tagline: string;
    status: string;
    videos: {
        results: Video[];
    };
    credits?: {
        cast: CastMember[];
        crew: CrewMember[];
    };
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface CrewMember {
    id: number;
    name: string;
    job: string;
}

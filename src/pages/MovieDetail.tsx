import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovies';
import { Star, Clock, Calendar } from 'lucide-react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useMovieDetails(id);

  if (isLoading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (isError || !movie) return <div className="text-white text-center mt-20">Movie not found.</div>;

  // Find trailer (YouTube)
  const trailer = movie.videos?.results?.find(
    (vid) => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser')
  );

  return (
    <div className="min-h-screen text-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0">
          <img
            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full px-4 md:px-16 pb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          
          <div className="flex items-center gap-6 text-sm md:text-base text-gray-300 mb-6">
            <span className="flex items-center gap-1 text-green-500 font-bold">
              <Star className="h-4 w-4 fill-current" /> {movie.vote_average.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {movie.runtime}m
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {new Date(movie.release_date).getFullYear()}
            </span>
          </div>

          <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-8 line-clamp-3 md:line-clamp-none">
            {movie.overview}
          </p>

       
        </div>
      </div>

      {/* Genres */}
      <div className="px-4 md:px-16 mt-8">
          <div className="flex flex-wrap gap-2 mb-8">
              {movie.genres.map((g) => (
                  <span key={g.id} className="text-sm border border-gray-600 rounded-full px-3 py-1 text-gray-300">
                      {g.name}
                  </span>
              ))}
          </div>
      
        {/* Trailer Section */}
        {trailer && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4">트레일러</h3>
            <div className="aspect-video w-full max-w-4xl">
              <iframe
                title="Trailer"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

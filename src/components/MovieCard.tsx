import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Movie } from '../api/types';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <motion.div
        whileHover={{ scale: 1.05, zIndex: 10 }}
        transition={{ duration: 0.2 }}
        className="relative aspect-[2/3] overflow-hidden rounded-md bg-surface shadow-lg"
      >
        <img
          src={imageUrl}
          alt={movie.title}
          draggable={false}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
            <div className="absolute bottom-0 p-2 text-white">
                <p className="text-sm font-bold truncate">{movie.title}</p>
            </div>
        </div>
      </motion.div>
    </Link>
  );
};

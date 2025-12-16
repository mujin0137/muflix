import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchMovies } from '../hooks/useSearchMovies';
import { MovieCard } from '../components/MovieCard';
import { Search as SearchIcon } from 'lucide-react';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useSearchMovies(debouncedQuery);

  // Sync URL with query
  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  useEffect(() => {
      inputRef.current?.focus();
  }, []);

  const results = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="min-h-screen pt-24 px-4 md:px-16 pb-10">
      {/* Search Input */}
      <div className="relative mb-10 max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-surface text-white placeholder-gray-400 border border-transparent rounded-none focus:outline-none focus:border-gray-500 transition-colors text-lg"
          placeholder="Movies, shows, genres..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Results */}
      {isLoading && <div className="text-center text-gray-500 mt-20">Searching...</div>}
      
      {isError && <div className="text-center text-red-500 mt-20">Error occurred while searching.</div>}

      {!isLoading && !isError && debouncedQuery && results.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No results found for "{debouncedQuery}".
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-4">
        {results.map((movie) => (
            movie.poster_path && (
                <div key={movie.id}>
                    <MovieCard movie={movie} />
                </div>
            )
        ))}
      </div>
    </div>
  );
};

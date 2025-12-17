import { useTrendingMovies, useNowPlayingMovies, useTopRatedMovies, usePopularMovies, useUpcomingMovies } from '../hooks/useMovies';
import { MovieRow } from '../components/MovieRow';
import { HeroCarousel } from '../components/media/HeroCarousel';


export const Home = () => {
  const { data: trending, isLoading, isError } = useTrendingMovies();
  const { data: nowPlaying } = useNowPlayingMovies();
  const { data: topRated } = useTopRatedMovies();
  const { data: popular } = usePopularMovies();
  const { data: upcoming } = useUpcomingMovies();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white px-4">
        <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-primary">오류 발생</h2>
            <p className="text-gray-400">영화를 불러오는 중 문제가 발생했습니다.</p>
            <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
            >
                다시 시도
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Swipeable Hero Section */}
      {trending?.results && <HeroCarousel movies={trending.results} />}

      <div className="-mt-1 relative z-20 space-y-12 pl-4 md:pl-12 pb-12">
        <MovieRow title="현재 상영 중" movies={nowPlaying?.results || []} />
        <MovieRow title="최고 평점" movies={topRated?.results || []} />
        <MovieRow title="인기있는 영화" movies={popular?.results || []} />
        <MovieRow title="개봉 예정작" movies={upcoming?.results || []} />
      </div>
    </div>
  );
};


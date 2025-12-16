import { useTrendingMovies, useNowPlayingMovies, useTopRatedMovies, usePopularMovies } from '../hooks/useMovies';
import { MovieRow } from '../components/MovieRow';

export const Home = () => {
  const { data: trending, isLoading, isError } = useTrendingMovies();
  const { data: nowPlaying } = useNowPlayingMovies();
  const { data: topRated } = useTopRatedMovies();
  const { data: popular } = usePopularMovies();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-2xl font-bold mb-4">영화를 불러오는데 실패했습니다.</h2>
        <p className="text-gray-400 mb-4">API 키 설정을 확인하거나 서버를 재시작해주세요.</p>
        <p className="text-sm text-gray-500">(.env 파일 변경 후에는 서버 재시작이 필요합니다)</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
        {/* Placeholder for Hero Banner */}
        <div className="h-[50vh] w-full bg-gradient-to-b from-gray-900 to-background flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">김무진의 영화관</h1>
        </div>

      <div className="-mt-32 relative z-10 space-y-2">
        <MovieRow title="떠오르는 영화들" movies={trending?.results || []} />
        <MovieRow title="현재 상영 중" movies={nowPlaying?.results || []} />
        <MovieRow title="최고 평점" movies={topRated?.results || []} />
        <MovieRow title="인기있는 영화" movies={popular?.results || []} />
      </div>
    </div>
  );
};

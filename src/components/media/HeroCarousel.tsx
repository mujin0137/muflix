import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import type { Movie } from '../../api/types';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

interface HeroCarouselProps {
  movies: Movie[];
}

export const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  // Show top 5 movies only for the hero
  const heroMovies = movies.slice(0, 5);

  return (
    <div className="relative h-[80vh] w-full group">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect={'fade'}
        speed={1000}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }}
        loop={true}
        allowTouchMove={true}
        className="h-full w-full"
      >
        {heroMovies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative h-full w-full bg-black">
            {/* Background Image with Zoom Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-in-out transform scale-100 hover:scale-105"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
              }}
            >
               {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-background" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-[20%] left-4 md:left-12 max-w-3xl px-4 z-20 space-y-6">
              <h1 className="text-4xl md:text-7xl font-bold text-white drop-shadow-2xl leading-tight animate-fade-in-up">
                {movie.title}
              </h1>
              <p className="text-gray-200 text-lg md:text-xl line-clamp-2 md:line-clamp-3 max-w-2xl drop-shadow-md">
                {movie.overview}
              </p>
              
              <div className="flex items-center gap-4 pt-3">
               
                <Link to={`/movie/${movie.id}`}>
                <button className="bg-gray-500/40 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-500/60 transition backdrop-blur-md flex items-center gap-2 border border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    상세 정보
                </button></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
         {/* Custom Navigation Buttons (hidden on mobile, visible on hover) */}
         <div className="swiper-button-prev !hidden md:!flex !text-white/70 hover:!text-white !w-12 !h-12 after:!text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
         <div className="swiper-button-next !hidden md:!flex !text-white/70 hover:!text-white !w-12 !h-12 after:!text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Swiper>
    </div>
  );
};

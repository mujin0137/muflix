import { useRef, useState } from 'react';
import type { Movie } from '../api/types';
import { MovieCard } from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export const MovieRow = ({ title, movies }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // To distinguish click vs drag

  const handleClickScroll = (direction: 'left' | 'right') => {
      if (rowRef.current) {
          const { clientWidth, scrollLeft } = rowRef.current;
          const scrollTo = direction === 'left' 
              ? scrollLeft - clientWidth * 0.7 
              : scrollLeft + clientWidth * 0.7;
          
          rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    e.preventDefault(); // Stop native drag (ghost image)
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDown(false);
    if (isDragging) {
        // Prevent click if we were dragging
        e.preventDefault();
        e.stopPropagation();
    }
    setTimeout(() => setIsDragging(false), 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !rowRef.current) return;
    
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjusted scroll speed
    
    // Check if user is actually moving the mouse significantly
    if (!isDragging && Math.abs(walk) > 5) {
        setIsDragging(true);
    }
    
    if (isDragging || Math.abs(walk) > 5) {
        rowRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-8 group/row relative">
      <h2 className="mb-4 text-2xl font-bold text-text-main px-4 md:px-8 group-hover/row:text-white transition-colors">
        {title}
      </h2>
      
      <div className="relative group">
         {/* Left Arrow */}
         <button 
            className="absolute -left-3 md:-left-6 top-0 bottom-2 z-40 bg-black/50 hover:bg-black/70 w-12 hidden group-hover:flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer rounded-l-lg"
            onClick={() => handleClickScroll('left')}
         >
            <ChevronLeft className="w-8 h-8 text-white" />
         </button>

        <div
          ref={rowRef}
          className={`flex gap-4 overflow-x-auto pb-4 px-4 md:px-8 scrollbar-hide select-none ${
             isDown ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {movies.map((movie) => (
            <div 
                key={movie.id} 
                className={`w-[160px] flex-shrink-0 md:w-[200px] ${isDragging ? 'pointer-events-none' : ''}`}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
            className="absolute right-0 top-0 bottom-4 z-40 bg-black/50 hover:bg-black/70 w-12 hidden group-hover:flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer rounded-l-lg"
            onClick={() => handleClickScroll('right')}
        >
            <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </section>
  );
};

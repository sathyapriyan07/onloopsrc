import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/tmdb';
import type { TMDbMovie } from '@/types';

interface TrendingSliderProps {
  movies: TMDbMovie[];
  isLoading?: boolean;
}

export const TrendingSlider = ({ movies, isLoading }: TrendingSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = 300;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };
  
  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-8 w-48 skeleton rounded" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[180px]">
              <div className="h-[270px] skeleton rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (movies.length === 0) return null;
  
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">Trending Movies</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-secondary hover:bg-tertiary transition-colors"
          >
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-secondary hover:bg-tertiary transition-colors"
          >
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie, idx) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex-shrink-0 w-[160px] sm:w-[180px]"
          >
            <Link
              to={`/movie/${movie.id}`}
              className="block group"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                {movie.poster_path ? (
                  <img
                    src={getImageUrl(movie.poster_path, 'w342')}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-text-muted">No poster</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-sm font-medium text-text-primary truncate group-hover:text-accent transition-colors">
                {movie.title}
              </h3>
              <p className="text-xs text-text-muted">
                {movie.release_date?.split('-')[0]}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
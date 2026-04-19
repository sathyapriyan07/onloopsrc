import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/tmdb';
import type { Movie } from '@/types';

interface TrendingSliderProps {
  movies: Movie[];
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
      <div className="section-spacing">
        <h2 className="section-title">Trending Movies</h2>
        <div className="trending-slider">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="slider-item">
              <div className="h-[180px] sm:h-[210px] skeleton rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (movies.length === 0) return null;
  
  return (
    <div className="section-spacing">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0 border-0 pb-0">Trending Movies</h2>
        <button
          onClick={() => scroll('right')}
          className="p-2 rounded-full bg-secondary hover:bg-tertiary transition-colors"
        >
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div
        ref={sliderRef}
        className="trending-slider"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="slider-item">
            <Link to={`/movie/${movie.slug}`} className="block group">
              <div className="poster-card aspect-[2/3] bg-secondary mb-2">
                {movie.poster_path ? (
                  <img
                    src={getImageUrl(movie.poster_path, 'w342')}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-text-muted text-xs">No poster</span>
                  </div>
                )}
              </div>
              <h3 className="movie-title text-xs sm:text-sm truncate">{movie.title}</h3>
              <p className="year text-xs">{movie.release_date?.split('-')[0]}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
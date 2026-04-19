import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/tmdb';
import type { Movie } from '@/types';

interface MovieHeroProps {
  movie: Movie;
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
  const year = movie.release_date?.split('-')[0] || '';
  
  return (
    <div className="relative">
      <div 
        className="h-[200px] sm:h-[300px] md:h-[400px] bg-cover bg-center"
        style={{ 
          backgroundImage: movie.backdrop_path ? `url(${getImageUrl(movie.backdrop_path, 'w1280')})` : 'none',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />
      </div>
      
      <div className="relative px-3 sm:px-6 pb-6 sm:pb-8 -mt-20 sm:-mt-32">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-end">
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="w-[140px] sm:w-[180px] rounded-lg overflow-hidden shadow-card">
              {movie.poster_path ? (
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full h-auto"
                />
              ) : (
                <div className="aspect-[2/3] bg-secondary flex items-center justify-center">
                  <span className="text-text-muted text-xs">No poster</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-1 sm:mb-2">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-text-secondary mb-3 sm:mb-4">
              <span>{year}</span>
              {movie.popularity && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {Math.round(movie.popularity / 1000)}K
                  </span>
                </>
              )}
            </div>
            
            {movie.overview && (
              <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-3 max-w-2xl mb-4 sm:mb-6">
                {movie.overview}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
              <Link to={`/movie/${movie.slug}?tab=posters`} className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2">
                Posters
              </Link>
              <Link to={`/movie/${movie.slug}?tab=backdrops`} className="btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-2">
                Backdrops
              </Link>
              <Link to={`/movie/${movie.slug}?tab=logos`} className="btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-2">
                Logos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
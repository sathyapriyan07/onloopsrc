import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/tmdb';
import type { Movie } from '@/types';

interface MovieHeroProps {
  movie: Movie;
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
  const year = movie.release_date?.split('-')[0] || '';
  
  return (
    <div className="relative min-h-[60vh] md:min-h-[70vh]">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`,
          }}
        />
      )}
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="w-full px-4 md:px-8 lg:px-12 pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start max-w-6xl">
            {/* Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-[160px] sm:w-[200px] md:w-[240px] rounded-xl overflow-hidden shadow-2xl">
                {movie.poster_path ? (
                  <img
                    src={getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="aspect-[2/3] bg-secondary flex items-center justify-center">
                    <span className="text-text-muted text-sm">No poster</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1 text-center md:text-left w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
                {movie.title}
              </h1>
              
              {/* Meta */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-5 mb-4 md:mb-6 text-sm md:text-base">
                <span className="text-text-secondary">{year}</span>
                <span className="text-text-muted">•</span>
                {movie.popularity && (
                  <>
                    <span className="flex items-center gap-1.5 text-accent font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {Math.round(movie.popularity / 1000)}K
                    </span>
                    <span className="text-text-muted">•</span>
                  </>
                )}
              </div>
              
              {/* Overview */}
              {movie.overview && (
                <p className="text-text-secondary text-sm md:text-lg leading-relaxed max-w-3xl mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
                  {movie.overview}
                </p>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link 
                  to={`/movie/${movie.slug}?tab=posters`} 
                  className="px-5 py-2.5 bg-accent text-black font-semibold rounded-full hover:bg-accent-hover transition-colors text-sm md:text-base"
                >
                  Posters
                </Link>
                <Link 
                  to={`/movie/${movie.slug}?tab=backdrops`} 
                  className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-colors text-sm md:text-base"
                >
                  Backdrops
                </Link>
                <Link 
                  to={`/movie/${movie.slug}?tab=logos`} 
                  className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-colors text-sm md:text-base"
                >
                  Logos
                </Link>
                <Link 
                  to={`/movie/${movie.slug}?tab=wallpapers`} 
                  className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-colors text-sm md:text-base"
                >
                  Wallpapers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
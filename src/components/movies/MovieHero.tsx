import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/tmdb';
import type { Movie } from '@/types';

interface MovieHeroProps {
  movie: Movie;
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
  const year = movie.release_date?.split('-')[0] || '';
  
  return (
    <div className="relative h-[50vh] min-h-[400px]">
      {movie.backdrop_path && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`,
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
      
      <div className="relative h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-[180px] md:w-[220px] rounded-lg overflow-hidden shadow-card">
                {movie.poster_path ? (
                  <img
                    src={getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="aspect-[2/3] bg-secondary flex items-center justify-center">
                    <span className="text-text-muted">No poster</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-2">
                {movie.title}
              </h1>
              <div className="flex items-center gap-4 text-text-secondary mb-4">
                <span>{year}</span>
                {movie.popularity && (
                  <>
                    <span className="text-text-muted">•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {Math.round(movie.popularity / 1000)}K
                    </span>
                  </>
                )}
              </div>
              
              {movie.overview && (
                <p className="text-text-secondary max-w-2xl line-clamp-3 md:line-clamp-4 mb-6">
                  {movie.overview}
                </p>
              )}
              
              <div className="flex flex-wrap gap-3">
                <Link to={`/movie/${movie.slug}?tab=posters`} className="btn-primary">
                  Posters
                </Link>
                <Link to={`/movie/${movie.slug}?tab=backdrops`} className="btn-secondary">
                  Backdrops
                </Link>
                <Link to={`/movie/${movie.slug}?tab=logos`} className="btn-secondary">
                  Logos
                </Link>
                <Link to={`/movie/${movie.slug}?tab=wallpapers`} className="btn-secondary">
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
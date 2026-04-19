import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/tmdb';
import type { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const year = movie.release_date?.split('-')[0] || '';
  
  return (
    <div className="group">
      <Link to={`/movie/${movie.slug}`} className="block">
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
              <span className="text-text-muted text-sm">No poster</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <svg className="w-3 h-3" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
          <span className="text-sm text-text-secondary">
            {movie.popularity ? Math.round(movie.popularity / 1000 * 10) / 10 : '-'}
          </span>
        </div>
        <h3 className="movie-title text-sm mt-1">{movie.title}</h3>
        <p className="year">{year}</p>
      </Link>
    </div>
  );
};
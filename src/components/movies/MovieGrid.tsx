import { MovieCard } from './MovieCard';
import { Skeleton } from '@/components/common/Skeleton';
import type { Movie } from '@/types';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
}

export const MovieGrid = ({ movies, isLoading }: MovieGridProps) => {
  if (isLoading) {
    return (
      <div className="movie-grid">
        {[...Array(10)].map((_, i) => (
          <div key={i}>
            <Skeleton height={210} className="mb-2" />
            <Skeleton height={16} width="60%" />
            <Skeleton height={14} width="30%" />
          </div>
        ))}
      </div>
    );
  }
  
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary">No movies found</p>
      </div>
    );
  }
  
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
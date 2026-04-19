import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from '@/components/common/Skeleton';
import type { Movie } from '@/types';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export const MovieGrid = ({ movies, isLoading, emptyMessage = 'No movies found' }: MovieGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="w-16 h-16 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <p className="text-text-secondary">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie, idx) => (
        <MovieCard key={movie.id} movie={movie} index={idx} />
      ))}
    </div>
  );
};
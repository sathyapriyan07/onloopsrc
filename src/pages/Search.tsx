import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getImageUrl } from '@/lib/tmdb';
import type { Movie } from '@/types';

export const Search = () => {
  const [query, setQuery] = useState('');
  
  const { data: results, isLoading } = useQuery({
    queryKey: ['search', 'movies', query],
    queryFn: async () => {
      if (!query.trim() || query.length < 2) return [];
      const { data } = await supabase.from('movies').select('*').ilike('title', `%${query}%`).limit(20);
      return (data || []) as Movie[];
    },
    enabled: query.length >= 2,
  });
  
  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="page-container">
        <div className="mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            autoFocus
            className="input-field text-base sm:text-lg"
          />
        </div>
        
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary rounded-lg">
                <div className="w-12 h-16 sm:w-16 sm:h-24 skeleton rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 sm:h-5 w-1/3 skeleton rounded" />
                  <div className="h-3 sm:h-4 w-1/4 skeleton rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : results && results.length > 0 ? (
          <div className="space-y-2 sm:space-y-3">
            {results.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.slug}`}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary rounded-lg hover:bg-tertiary transition-colors"
              >
                {movie.poster_path ? (
                  <img
                    src={getImageUrl(movie.poster_path, 'w185')}
                    alt={movie.title}
                    className="w-12 h-16 sm:w-16 sm:h-24 object-cover rounded flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-16 sm:w-16 sm:h-24 bg-tertiary rounded flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-text-primary truncate">{movie.title}</h3>
                  <p className="text-xs sm:text-sm text-text-muted">
                    {movie.release_date?.split('-')[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div className="text-center py-8">
            <p className="text-text-secondary text-sm sm:text-base">No movies found for "{query}"</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
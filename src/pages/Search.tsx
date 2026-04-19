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
      const { data } = await supabase
        .from('movies')
        .select('*')
        .ilike('title', `%${query}%`)
        .limit(20);
      return (data || []) as Movie[];
    },
    enabled: query.length >= 2,
  });
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            autoFocus
            className="input-field w-full text-lg"
          />
        </div>
        
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 p-4 bg-secondary rounded-lg">
                <div className="w-16 h-24 skeleton rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-1/3 skeleton rounded" />
                  <div className="h-4 w-1/2 skeleton rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : results && results.length > 0 ? (
          <div className="space-y-3">
            {results.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.slug}`}
                className="flex items-start gap-4 p-4 bg-secondary rounded-lg hover:bg-tertiary transition-colors"
              >
                {movie.poster_path ? (
                  <img
                    src={getImageUrl(movie.poster_path, 'w185')}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-24 bg-tertiary rounded" />
                )}
                <div>
                  <h3 className="text-text-primary font-medium">{movie.title}</h3>
                  <p className="text-text-muted text-sm">
                    {movie.release_date?.split('-')[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div className="text-center py-8">
            <p className="text-text-secondary">No movies found for "{query}"</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { MovieFilters } from '@/components/movies/MovieFilters';
import { supabase } from '@/lib/supabase';
import type { Movie } from '@/types';

export const Movies = () => {
  const [filters, setFilters] = useState({ 
    year: undefined as number | undefined,
    sortBy: 'popularity.desc',
  });
  
  const { data: dbData, isLoading: dbLoading } = useQuery({
    queryKey: ['movies', 'db', filters],
    queryFn: async () => {
      let query = supabase
        .from('movies')
        .select('*')
        .order(filters.sortBy === 'popularity.desc' ? 'popularity' : 'release_date', { ascending: filters.sortBy === 'release_date.asc' || filters.sortBy === 'popularity.asc' })
        .limit(50);
      
      if (filters.year) {
        query = query.gte('release_date', `${filters.year}-01-01`).lte('release_date', `${filters.year}-12-31`);
      }
      
      const { data } = await query;
      return (data || []) as Movie[];
    },
    enabled: true,
  });
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Movies</h1>
          <p className="text-text-secondary">Explore and download movie assets</p>
        </div>
        
        <MovieFilters 
          onFilterChange={(newFilters) => setFilters({ 
            year: newFilters.year,
            sortBy: newFilters.sortBy || 'popularity.desc',
          })}
          defaultYear={filters.year}
          defaultSortBy={filters.sortBy}
        />
        
        <MovieGrid 
          movies={dbData || []} 
          isLoading={dbLoading}
          emptyMessage="No movies found. Import movies from admin panel."
        />
      </div>
    </div>
  );
};

export default Movies;
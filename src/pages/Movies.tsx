import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { supabase } from '@/lib/supabase';
import type { Movie } from '@/types';

export const Movies = () => {
  const [filters, setFilters] = useState({ 
    year: undefined as number | undefined,
    sortBy: 'popularity.desc',
  });
  
  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies', 'db', filters],
    queryFn: async () => {
      let query = supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (filters.year) {
        query = query.gte('release_date', `${filters.year}-01-01`).lte('release_date', `${filters.year}-12-31`);
      }
      
      const { data } = await query;
      return (data || []) as Movie[];
    },
  });
  
  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="page-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">Movies</h1>
          <p className="text-sm sm:text-base text-text-secondary">Explore and download movie assets</p>
        </div>
        
        <div className="filter-bar">
          <select
            value={filters.year || ''}
            onChange={(e) => setFilters({ ...filters, year: e.target.value ? Number(e.target.value) : undefined })}
            className="filter-dropdown"
          >
            <option value="">All Years</option>
            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="filter-dropdown"
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="release_date.desc">Newest First</option>
            <option value="title.asc">A-Z</option>
          </select>
        </div>
        
        <MovieGrid 
          movies={movies || []} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Movies;
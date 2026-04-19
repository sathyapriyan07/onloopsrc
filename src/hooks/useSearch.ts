import { useState, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { searchMovies as searchTMDb } from '@/lib/tmdb';
import type { Movie } from '@/types';

export const useSearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  }, []);
  
  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);
  
  return {
    query,
    debouncedQuery,
    handleSearch,
    clearSearch,
  };
};

export const useSearchMovies = (debouncedQuery: string) => {
  return useQuery({
    queryKey: ['search', 'db', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
        return { movies: [], total: 0 };
      }
      
      const { data, error, count } = await supabase
        .from('movies')
        .select('*', { count: 'exact' })
        .ilike('title', `%${debouncedQuery}%`)
        .limit(20);
      
      if (error) throw error;
      
      return {
        movies: (data || []) as Movie[],
        total: count || 0,
      };
    },
    enabled: debouncedQuery.length >= 2,
  });
};

export const useTMDBMovieSearch = (debouncedQuery: string) => {
  return useQuery({
    queryKey: ['search', 'tmdb', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
        return { results: [], total_pages: 0 };
      }
      
      return await searchTMDb(debouncedQuery);
    },
    enabled: debouncedQuery.length >= 2,
  });
};

export const useGlobalSearch = (debouncedQuery: string) => {
  const dbResults = useSearchMovies(debouncedQuery);
  
  return {
    movies: dbResults.data?.movies || [],
    total: dbResults.data?.total || 0,
    isLoading: dbResults.isLoading,
  };
};
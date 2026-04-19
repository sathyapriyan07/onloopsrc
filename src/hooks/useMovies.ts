import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Movie } from '@/types';

export const useMovies = (options?: { 
  page?: number; 
  limit?: number;
  year?: number;
  sortBy?: string;
}) => {
  const { page = 1, limit = 20, year, sortBy = 'popularity.desc' } = options || {};
  
  return useQuery({
    queryKey: ['movies', { page, limit, year, sortBy }],
    queryFn: async () => {
      let query = supabase
        .from('movies')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });
      
      if (year) {
        query = query.eq('release_date', `${year}%`);
      }
      
      const { data, error, count } = await query;
      
      if (error) throw error;
      
      return {
        movies: (data || []) as Movie[],
        total: count || 0,
      };
    },
  });
};

export const useMovieBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['movie', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Movie;
    },
    enabled: !!slug,
  });
};

export const useTrendingMovies = (limit = 10) => {
  return useQuery({
    queryKey: ['trending', 'movies', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('popularity', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return (data || []) as Movie[];
    },
  });
};

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['search', 'movies', query],
    queryFn: async () => {
      if (!query.trim()) return { movies: [], total: 0 };
      
      const { data, error, count } = await supabase
        .from('movies')
        .select('*', { count: 'exact' })
        .ilike('title', `%${query}%`)
        .limit(20);
      
      if (error) throw error;
      
      return {
        movies: (data || []) as Movie[],
        total: count || 0,
      };
    },
    enabled: query.length >= 2,
  });
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (movie: Omit<Movie, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('movies')
        .insert(movie)
        .select()
        .single();
      
      if (error) throw error;
      return data as Movie;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('movies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useFeaturedMovies = () => {
  return useQuery({
    queryKey: ['featured', 'movies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*, assets(*)')
        .order('popularity', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return (data || []) as Movie[];
    },
  });
};
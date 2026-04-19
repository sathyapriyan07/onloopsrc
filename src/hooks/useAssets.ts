import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Asset, AssetType } from '@/types';

export const useAssets = (options?: {
  movieId?: string;
  type?: AssetType;
  limit?: number;
  page?: number;
}) => {
  const { movieId, type, limit = 20, page = 1 } = options || {};
  
  return useQuery({
    queryKey: ['assets', { movieId, type, limit, page }],
    queryFn: async () => {
      let query = supabase
        .from('assets')
        .select('*, movie:movies(*)', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });
      
      if (movieId) {
        query = query.eq('movie_id', movieId);
      }
      if (type) {
        query = query.eq('type', type);
      }
      
      const { data, error, count } = await query;
      
      if (error) throw error;
      
      return {
        assets: (data || []) as Asset[],
        total: count || 0,
      };
    },
  });
};

export const useAssetsByMovie = (movieId: string, type?: AssetType) => {
  return useQuery({
    queryKey: ['assets', 'movie', movieId, type],
    queryFn: async () => {
      let query = supabase
        .from('assets')
        .select('*')
        .eq('movie_id', movieId);
      
      if (type) {
        query = query.eq('type', type);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return (data || []) as Asset[];
    },
    enabled: !!movieId,
  });
};

export const useWallpapers = (limit = 12) => {
  return useQuery({
    queryKey: ['wallpapers', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*, movie:movies(*)')
        .eq('type', 'wallpaper')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return (data || []) as Asset[];
    },
  });
};

export const useFeaturedAssets = () => {
  return useQuery({
    queryKey: ['featured', 'assets'],
    queryFn: async () => {
      const { data: featured } = await supabase
        .from('featured')
        .select('asset_id');
      
      if (!featured || featured.length === 0) {
        // If no featured, return recent wallpapers
        const { data, error } = await supabase
          .from('assets')
          .select('*, movie:movies(*)')
          .eq('type', 'wallpaper')
          .order('created_at', { ascending: false })
          .limit(8);
        
        if (error) throw error;
        return (data || []) as Asset[];
      }
      
      const assetIds = featured.map(f => f.asset_id);
      const { data, error } = await supabase
        .from('assets')
        .select('*, movie:movies(*)')
        .in('id', assetIds);
      
      if (error) throw error;
      return (data || []) as Asset[];
    },
  });
};

export const useExploreAssets = (options?: { limit?: number; page?: number }) => {
  const { limit = 20, page = 1 } = options || {};
  
  return useQuery({
    queryKey: ['explore', 'assets', { limit, page }],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from('assets')
        .select('*, movie:movies(*)', { count: 'exact' })
        .in('type', ['poster', 'backdrop', 'wallpaper'])
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return {
        assets: (data || []) as Asset[],
        total: count || 0,
      };
    },
  });
};

export const useCreateAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (asset: Omit<Asset, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('assets')
        .insert(asset)
        .select()
        .single();
      
      if (error) throw error;
      return data as Asset;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};

export const useBulkCreateAssets = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (assets: Omit<Asset, 'id' | 'created_at'>[]) => {
      const { data, error } = await supabase
        .from('assets')
        .insert(assets)
        .select();
      
      if (error) throw error;
      return data as Asset[];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};

export const useMarkAsFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (assetId: string) => {
      const { data, error } = await supabase
        .from('featured')
        .insert({ asset_id: assetId })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured'] });
    },
  });
};

export const useUnmarkAsFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (assetId: string) => {
      const { error } = await supabase
        .from('featured')
        .delete()
        .eq('asset_id', assetId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured'] });
    },
  });
};
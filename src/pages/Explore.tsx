import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MasonryGrid } from '@/components/explore/MasonryGrid';
import { supabase } from '@/lib/supabase';
import type { Asset } from '@/types';

export const Explore = () => {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ['explore', 'assets', page, typeFilter],
    queryFn: async () => {
      let query = supabase
        .from('assets')
        .select('*, movie:movies(*)')
        .range((page - 1) * 20, page * 20 - 1)
        .order('created_at', { ascending: false });
      
      if (typeFilter) {
        query = query.eq('type', typeFilter);
      }
      
      const { data } = await query;
      return (data || []) as Asset[];
    },
  });
  
  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="page-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">Explore</h1>
          <p className="text-sm sm:text-base text-text-secondary">Browse all movie assets</p>
        </div>
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['All', 'Poster', 'Backdrop', 'Wallpaper'].map((type) => (
            <button
              key={type}
              onClick={() => { setTypeFilter(type === 'All' ? null : type.toLowerCase()); setPage(1); }}
              className={`tab-button ${(type === 'All' && !typeFilter) || typeFilter === type.toLowerCase() ? 'active' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>
        
        <MasonryGrid 
          assets={data || []} 
          isLoading={isLoading}
          hasMore={data?.length === 20}
          onLoadMore={() => setPage(p => p + 1)}
        />
      </div>
    </div>
  );
};

export default Explore;
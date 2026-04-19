import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MovieHero } from '@/components/movies/MovieHero';
import { AssetGrid } from '@/components/assets/AssetGrid';
import { supabase } from '@/lib/supabase';
import type { Movie, Asset } from '@/types';

const tabs = [
  { id: 'poster', label: 'Posters' },
  { id: 'backdrop', label: 'Backdrops' },
  { id: 'logo', label: 'Logos' },
  { id: 'wallpaper', label: 'Wallpapers' },
];

export const MovieDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<string>('poster');
  
  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ['movie', slug],
    queryFn: async () => {
      const { data } = await supabase.from('movies').select('*').eq('slug', slug).single();
      return data as Movie;
    },
    enabled: !!slug,
  });
  
  const { data: assets } = useQuery({
    queryKey: ['assets', movie?.id, activeTab],
    queryFn: async () => {
      if (!movie?.id) return [];
      const { data } = await supabase.from('assets').select('*').eq('movie_id', movie.id).eq('type', activeTab);
      return (data || []) as Asset[];
    },
    enabled: !!movie?.id,
  });
  
  if (movieLoading) {
    return (
      <div className="min-h-screen bg-primary">
        <div className="h-[400px] skeleton" />
        <div className="page-container py-8">
          <div className="flex gap-2 mb-6">
            {[1,2,3,4].map(i => <div key={i} className="w-20 h-8 skeleton rounded" />)}
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => <div key={i} className="h-48 skeleton rounded" />)}
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Movie not found</h2>
          <p className="text-text-secondary mb-4">The movie you're looking for doesn't exist.</p>
          <Link to="/movies" className="btn-primary">Browse Movies</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-primary">
      <MovieHero movie={movie} />
      
      <div className="page-container py-8">
        <div className="flex gap-1 mb-6 border-b border-[#222]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <AssetGrid assets={assets || []} emptyMessage={`No ${activeTab}s found`} />
      </div>
    </div>
  );
};

export default MovieDetail;
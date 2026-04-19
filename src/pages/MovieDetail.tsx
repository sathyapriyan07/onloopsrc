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
        <div className="h-[60vh] skeleton" />
        <div className="px-4 md:px-8 py-8">
          <div className="flex gap-8">
            <div className="w-48 h-72 skeleton rounded-xl" />
            <div className="flex-1 space-y-4">
              <div className="h-10 w-2/3 skeleton rounded" />
              <div className="h-6 w-1/3 skeleton rounded" />
              <div className="h-20 w-full skeleton rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-white mb-2">Movie not found</h2>
          <p className="text-text-secondary mb-6">The movie you're looking for doesn't exist.</p>
          <Link to="/movies" className="px-6 py-3 bg-accent text-black font-semibold rounded-full">
            Browse Movies
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-primary">
      <MovieHero movie={movie} />
      
      {/* Tab Navigation */}
      <div className="border-b border-[#222] sticky top-14 md:top-16 bg-primary/95 backdrop-blur-sm z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium whitespace-nowrap transition-all relative ${
                  activeTab === tab.id
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Assets Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <p className="text-text-secondary text-sm mt-1">
            {assets?.length || 0} {activeTab}s available
          </p>
        </div>
        
        <AssetGrid 
          assets={assets || []} 
          emptyMessage={`No ${activeTab}s found for this movie`} 
        />
      </div>
    </div>
  );
};

export default MovieDetail;
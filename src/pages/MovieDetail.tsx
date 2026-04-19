import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MovieHero } from '@/components/movies/MovieHero';
import { AssetGrid } from '@/components/assets/AssetGrid';
import { supabase } from '@/lib/supabase';
import type { Movie, Asset } from '@/types';
import { classNames } from '@/lib/utils';

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
    queryKey: ['movie', 'slug', slug],
    queryFn: async () => {
      const { data } = await supabase
        .from('movies')
        .select('*')
        .eq('slug', slug)
        .single();
      return data as Movie;
    },
    enabled: !!slug,
  });
  
  const { data: assets, isLoading: assetsLoading } = useQuery({
    queryKey: ['assets', 'movie', movie?.id, activeTab],
    queryFn: async () => {
      if (!movie?.id) return [];
      const { data } = await supabase
        .from('assets')
        .select('*')
        .eq('movie_id', movie.id)
        .eq('type', activeTab);
      return (data || []) as Asset[];
    },
    enabled: !!movie?.id,
  });
  
  if (movieLoading) {
    return (
      <div>
        <div className="h-[50vh] skeleton" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-48 skeleton rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Movie not found</h2>
          <p className="text-text-secondary mb-4">The movie you're looking for doesn't exist.</p>
          <Link to="/movies" className="btn-primary">Browse Movies</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <MovieHero movie={movie} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={classNames(
                'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors',
                activeTab === tab.id
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-text-secondary hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <AssetGrid
          assets={assets || []}
          isLoading={assetsLoading}
          emptyMessage={`No ${activeTab} found for this movie`}
        />
      </div>
    </div>
  );
};

export default MovieDetail;
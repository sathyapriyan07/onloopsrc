import { useQuery } from '@tanstack/react-query';
import { Hero } from '@/components/home/Hero';
import { TrendingSlider } from '@/components/home/TrendingSlider';
import { FeaturedWallpapers } from '@/components/home/FeaturedWallpapers';
import { Categories } from '@/components/home/Categories';
import { supabase } from '@/lib/supabase';
import type { Movie, Asset } from '@/types';

export const Home = () => {
  const { data: moviesData, isLoading: moviesLoading } = useQuery({
    queryKey: ['movies', 'home'],
    queryFn: async () => {
      const { data } = await supabase
        .from('movies')
        .select('*')
        .order('popularity', { ascending: false })
        .limit(20);
      return (data || []) as Movie[];
    },
  });

  const { data: wallpapersData } = useQuery({
    queryKey: ['wallpapers', 'featured'],
    queryFn: async () => {
      const { data } = await supabase
        .from('assets')
        .select('*, movie:movies(*)')
        .eq('type', 'wallpaper')
        .order('created_at', { ascending: false })
        .limit(8);
      return (data || []) as Asset[];
    },
  });
  
  return (
    <div className="min-h-screen">
      <Hero movies={moviesData || []} isLoading={moviesLoading} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TrendingSlider movies={moviesData || []} isLoading={moviesLoading} />
        <FeaturedWallpapers wallpapers={wallpapersData || []} />
        <Categories />
      </div>
    </div>
  );
};

export default Home;
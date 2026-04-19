import { useQuery } from '@tanstack/react-query';
import { Hero } from '@/components/home/Hero';
import { TrendingSlider } from '@/components/home/TrendingSlider';
import { FeaturedWallpapers } from '@/components/home/FeaturedWallpapers';
import { Categories } from '@/components/home/Categories';
import { getTrendingMovies } from '@/lib/tmdb';

export const Home = () => {
  const { data: trendingData, isLoading: trendingLoading } = useQuery({
    queryKey: ['trending'],
    queryFn: () => getTrendingMovies('week', 1),
  });
  
  return (
    <div className="min-h-screen">
      <Hero movies={trendingData?.results || []} isLoading={trendingLoading} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TrendingSlider movies={trendingData?.results || []} isLoading={trendingLoading} />
        <FeaturedWallpapers wallpapers={[]} isLoading={false} />
        <Categories />
      </div>
    </div>
  );
};

export default Home;
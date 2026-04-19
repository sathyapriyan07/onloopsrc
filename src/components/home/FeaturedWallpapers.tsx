import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getResolutionLabel } from '@/lib/utils';
import type { Asset } from '@/types';

interface FeaturedWallpapersProps {
  wallpapers: Asset[];
  isLoading?: boolean;
}

export const FeaturedWallpapers = ({ wallpapers, isLoading }: FeaturedWallpapersProps) => {
  if (isLoading) {
    return (
      <div className="py-8">
        <div className="h-8 w-48 skeleton rounded mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-48 skeleton rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  if (wallpapers.length === 0) return null;
  
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">Featured Wallpapers</h2>
        <Link to="/explore?type=wallpaper" className="text-sm text-text-secondary hover:text-white transition-colors">
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wallpapers.slice(0, 8).map((wallpaper, idx) => (
          <motion.div
            key={wallpaper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link
              to={`/movie/${wallpaper.movie?.slug || ''}`}
              className="block group relative rounded-lg overflow-hidden"
            >
              <div className="aspect-video">
                <img
                  src={wallpaper.image_url}
                  alt={`Wallpaper for ${wallpaper.movie?.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-xs text-white">
                    {getResolutionLabel(wallpaper.width, wallpaper.height)}
                  </span>
                  <button className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
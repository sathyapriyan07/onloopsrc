import { Link } from 'react-router-dom';
import { getResolutionLabel } from '@/lib/utils';
import type { Asset } from '@/types';

interface FeaturedWallpapersProps {
  wallpapers: Asset[];
}

export const FeaturedWallpapers = ({ wallpapers }: FeaturedWallpapersProps) => {
  if (wallpapers.length === 0) return null;
  
  return (
    <div className="section-spacing">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0 border-0 pb-0">Featured Wallpapers</h2>
        <Link to="/explore?type=wallpaper" className="text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors">
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {wallpapers.slice(0, 8).map((wallpaper) => (
          <Link
            key={wallpaper.id}
            to={`/movie/${wallpaper.movie?.slug || ''}`}
            className="block group relative aspect-video rounded overflow-hidden"
          >
            <img
              src={wallpaper.image_url}
              alt={`Wallpaper for ${wallpaper.movie?.title}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <span className="text-xs text-white">
                  {getResolutionLabel(wallpaper.width, wallpaper.height)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
import { AssetCard } from './AssetCard';
import { AssetCardSkeleton } from '@/components/common/Skeleton';
import type { Asset } from '@/types';

interface AssetGridProps {
  assets: Asset[];
  isLoading?: boolean;
  emptyMessage?: string;
  showMovieTitle?: boolean;
}

export const AssetGrid = ({ assets, isLoading, emptyMessage = 'No assets found', showMovieTitle = false }: AssetGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <AssetCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="w-16 h-16 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-text-secondary">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {assets.map((asset, idx) => (
        <AssetCard key={asset.id} asset={asset} index={idx} showMovieTitle={showMovieTitle} />
      ))}
    </div>
  );
};
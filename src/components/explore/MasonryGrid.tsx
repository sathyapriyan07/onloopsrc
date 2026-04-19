import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getResolutionLabel } from '@/lib/utils';
import type { Asset } from '@/types';

interface MasonryGridProps {
  assets: Asset[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const MasonryGrid = ({ assets, isLoading, onLoadMore, hasMore }: MasonryGridProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!hasMore || !onLoadMore) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);
  
  if (isLoading && assets.length === 0) {
    return (
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-48 skeleton rounded-lg" />
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
        <p className="text-text-secondary">No assets found</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
        {assets.map((asset, idx) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="break-inside-avoid"
          >
            <div className="group relative rounded-lg overflow-hidden bg-secondary cursor-pointer">
              <img
                src={asset.image_url}
                alt={`${asset.type} for ${asset.movie?.title}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-xs text-white">
                    {getResolutionLabel(asset.width, asset.height)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {hasMore && (
        <div ref={loadMoreRef} className="py-8 flex justify-center">
          {isLoading && (
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
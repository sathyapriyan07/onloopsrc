import { useState } from 'react';
import { motion } from 'framer-motion';
import { getResolutionLabel } from '@/lib/utils';
import { ImageModal } from '@/components/common/Modal';
import type { Asset } from '@/types';

interface AssetCardProps {
  asset: Asset;
  index?: number;
}

export const AssetCard = ({ asset, index = 0 }: AssetCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = asset.image_url;
    link.download = `${asset.movie?.title || 'asset'}-${asset.type}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(asset.image_url);
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03 }}
        className="group relative rounded-xl overflow-hidden bg-secondary cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <div className="aspect-[2/3]">
          <img
            src={asset.image_url}
            alt={`${asset.type} for ${asset.movie?.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-white font-medium">
                {getResolutionLabel(asset.width, asset.height)}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyUrl(); }}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  title="Copy URL"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  title="Download"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={asset.image_url}
        alt={`${asset.type} for ${asset.movie?.title}`}
      />
    </>
  );
};
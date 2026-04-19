import { classNames } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) => {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };
  
  return (
    <div
      className={classNames('skeleton', variants[variant], className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

export const MovieCardSkeleton = () => (
  <div className="space-y-3">
    <Skeleton height={280} className="w-full" />
    <Skeleton height={20} width="60%" />
    <Skeleton height={16} width="40%" />
  </div>
);

export const AssetCardSkeleton = () => (
  <div className="space-y-3">
    <Skeleton height={200} className="w-full" />
    <div className="flex justify-between">
      <Skeleton height={16} width="40%" />
      <Skeleton height={16} width="30%" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="relative h-[60vh]">
    <Skeleton className="absolute inset-0" />
    <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
      <Skeleton height={48} width="40%" />
      <Skeleton height={24} width="60%" />
      <Skeleton height={20} width="80%" />
    </div>
  </div>
);
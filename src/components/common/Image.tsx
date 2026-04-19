import { ImgHTMLAttributes, useState } from 'react';
import { classNames } from '@/lib/utils';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string;
  aspectRatio?: 'auto' | '1/1' | '4/3' | '16/9' | '2/3';
  objectFit?: 'cover' | 'contain' | 'fill';
}

export const Image = ({
  src,
  alt,
  placeholder,
  aspectRatio = 'auto',
  objectFit = 'cover',
  className = '',
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const aspectRatios = {
    auto: '',
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '2/3': 'aspect-[2/3]',
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };
  
  return (
    <div className={classNames('relative overflow-hidden', aspectRatios[aspectRatio], className)}>
      <img
        src={error ? placeholder || '/placeholder.png' : src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={classNames(
          'w-full h-full transition-opacity duration-300',
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        {...props}
      />
      {isLoading && placeholder && (
        <div className="absolute inset-0 skeleton" />
      )}
    </div>
  );
};

export const PosterImage = ({ 
  src, 
  alt, 
  size = 'w342',
  className = '',
  ...props 
}: { 
  src: string | null; 
  alt: string;
  size?: 'w185' | 'w342' | 'w500' | 'original';
  className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>) => {
  const imageUrl = src ? `https://image.tmdb.org/t/p/${size}${src}` : '';
  
  return (
    <Image
      src={imageUrl}
      alt={alt}
      aspectRatio="2/3"
      className={className}
      {...props}
    />
  );
};

export const BackdropImage = ({ 
  src, 
  alt, 
  size = 'w1280',
  className = '',
  ...props 
}: { 
  src: string | null; 
  alt: string;
  size?: 'w300' | 'w780' | 'w1280' | 'original';
  className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>) => {
  const imageUrl = src ? `https://image.tmdb.org/t/p/${size}${src}` : '';
  
  return (
    <Image
      src={imageUrl}
      alt={alt}
      aspectRatio="16/9"
      className={className}
      {...props}
    />
  );
};
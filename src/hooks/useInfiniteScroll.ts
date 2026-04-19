import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = (
  onLoadMore: () => void,
  options: UseInfiniteScrollOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '100px' } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (loadMoreRef.current) {
      observerRef.current?.unobserve(loadMoreRef.current);
    }
    
    loadMoreRef.current = node;
    
    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore();
          }
        },
        { threshold, rootMargin }
      );
      
      observerRef.current.observe(node);
    }
  }, [onLoadMore, threshold, rootMargin]);
  
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
  
  return setRef;
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

import { useState } from 'react';
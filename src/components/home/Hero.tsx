import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '@/lib/tmdb';
import type { TMDbMovie } from '@/types';

interface HeroProps {
  movies: TMDbMovie[];
  isLoading?: boolean;
}

export const Hero = ({ movies, isLoading }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (movies.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [movies.length]);
  
  if (isLoading) {
    return (
      <div className="relative h-[70vh]">
        <div className="absolute inset-0 skeleton" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="h-12 w-2/3 skeleton rounded" />
            <div className="h-6 w-1/3 skeleton rounded" />
            <div className="h-20 w-1/2 skeleton rounded" />
          </div>
        </div>
      </div>
    );
  }
  
  if (movies.length === 0) return null;
  
  const currentMovie = movies[currentIndex];
  
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {currentMovie.backdrop_path && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${getImageUrl(currentMovie.backdrop_path, 'w1280')})`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMovie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
                Featured
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-2">
                {currentMovie.title}
              </h1>
              <p className="text-lg text-text-secondary mb-4">
                {currentMovie.release_date?.split('-')[0]}
              </p>
              <p className="max-w-xl text-text-secondary line-clamp-2 mb-6">
                {currentMovie.overview}
              </p>
              <Link
                to={`/movie/${currentMovie.id}`}
                className="inline-flex items-center gap-2 btn-primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Assets
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 flex gap-2">
        {movies.slice(0, 5).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'w-8 bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
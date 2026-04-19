import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '@/lib/tmdb';
import type { Movie } from '@/types';

interface HeroProps {
  movies: Movie[];
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
      <div className="relative h-[40vh] sm:h-[50vh]">
        <div className="absolute inset-0 skeleton" />
      </div>
    );
  }
  
  if (movies.length === 0) return null;
  
  const currentMovie = movies[currentIndex];
  
  return (
    <div className="hero-backdrop">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent" />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative h-full flex items-end">
        <div className="hero-content w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMovie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Featured
              </span>
              <h1 className="hero-title text-text-primary mb-2">
                {currentMovie.title}
              </h1>
              <p className="text-sm sm:text-base text-text-secondary mb-3 sm:mb-4">
                {currentMovie.release_date?.split('-')[0]}
              </p>
              <p className="hero-overview max-w-lg text-text-secondary line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6">
                {currentMovie.overview}
              </p>
              <Link
                to={`/movie/${currentMovie.slug}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                View Assets
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex gap-1.5 sm:gap-2">
        {movies.slice(0, 5).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              idx === currentIndex ? 'w-6 sm:w-8 bg-white' : 'w-1.5 sm:w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
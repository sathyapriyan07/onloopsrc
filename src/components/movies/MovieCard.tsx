import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/tmdb';
import type { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  const year = movie.release_date?.split('-')[0] || '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/movie/${movie.slug}`} className="block group">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-secondary">
          {movie.poster_path ? (
            <img
              src={getImageUrl(movie.poster_path, 'w342')}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                View Assets
              </span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary truncate group-hover:text-accent transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-text-muted mt-1">{year}</p>
        </div>
      </Link>
    </motion.div>
  );
};
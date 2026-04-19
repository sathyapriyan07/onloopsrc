import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies as searchTMDB, getMovieImages } from '@/lib/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { slugify } from '@/lib/utils';
import { Button } from '@/components/common/Button';
import { supabase } from '@/lib/supabase';
import type { TMDbMovie } from '@/types';

export const TMDbSearch = () => {
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<TMDbMovie | null>(null);
  const [images, setImages] = useState<{ backdrops: any[]; logos: any[]; posters: any[] } | null>(null);
  
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['tmdb', 'search', query],
    queryFn: () => searchTMDB(query),
    enabled: query.length >= 2,
  });
  
  const handleSelectMovie = async (movie: TMDbMovie) => {
    setSelectedMovie(movie);
    const imgs = await getMovieImages(movie.id);
    setImages(imgs);
  };
  
  const handleImport = async () => {
    if (!selectedMovie || !images) return;
    
    // Create movie in database
    const { data: movie, error: movieError } = await supabase
      .from('movies')
      .insert({
        tmdb_id: selectedMovie.id,
        title: selectedMovie.title,
        slug: slugify(selectedMovie.title),
        overview: selectedMovie.overview,
        release_date: selectedMovie.release_date,
        poster_path: selectedMovie.poster_path,
        backdrop_path: selectedMovie.backdrop_path,
        popularity: selectedMovie.popularity,
      })
      .select()
      .single();
    
    if (movieError) {
      console.error('Error creating movie:', movieError);
      return;
    }
    
    // Create assets
    const newAssets: any[] = [];
    
    // Add posters
    images.posters?.forEach((poster) => {
      newAssets.push({
        movie_id: movie.id,
        type: 'poster',
        image_url: getImageUrl(poster.file_path, 'original'),
        width: poster.width,
        height: poster.height,
        size_kb: null,
        source: 'tmdb',
      });
    });
    
    // Add backdrops
    images.backdrops?.forEach((backdrop) => {
      newAssets.push({
        movie_id: movie.id,
        type: 'backdrop',
        image_url: getImageUrl(backdrop.file_path, 'original'),
        width: backdrop.width,
        height: backdrop.height,
        size_kb: null,
        source: 'tmdb',
      });
    });
    
    // Add logos
    images.logos?.forEach((logo) => {
      newAssets.push({
        movie_id: movie.id,
        type: 'logo',
        image_url: getImageUrl(logo.file_path, 'original'),
        width: logo.width,
        height: logo.height,
        size_kb: null,
        source: 'tmdb',
      });
    });
    
    if (newAssets.length > 0) {
      await supabase.from('assets').insert(newAssets);
    }
    
    // Reset
    setSelectedMovie(null);
    setImages(null);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">Import from TMDb</h2>
        
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies on TMDb..."
            className="input-field w-full"
          />
        </div>
      </div>
      
      {isLoading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4 bg-secondary rounded-lg">
              <div className="w-16 h-24 skeleton rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-1/3 skeleton rounded" />
                <div className="h-4 w-1/2 skeleton rounded" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {searchResults?.results && searchResults.results.length > 0 && !selectedMovie && (
        <div className="space-y-3">
          {searchResults.results.slice(0, 10).map((movie: TMDbMovie) => (
            <button
              key={movie.id}
              onClick={() => handleSelectMovie(movie)}
              className="flex items-start gap-4 p-4 bg-secondary rounded-lg hover:bg-tertiary transition-colors w-full text-left"
            >
              {movie.poster_path ? (
                <img
                  src={getImageUrl(movie.poster_path, 'w185')}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-24 bg-tertiary rounded" />
              )}
              <div>
                <h3 className="text-text-primary font-medium">{movie.title}</h3>
                <p className="text-text-muted text-sm">
                  {movie.release_date?.split('-')[0]}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {selectedMovie && images && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
            {selectedMovie.poster_path && (
              <img
                src={getImageUrl(selectedMovie.poster_path, 'w185')}
                alt={selectedMovie.title}
                className="w-16 h-24 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="text-text-primary font-medium">{selectedMovie.title}</h3>
              <p className="text-text-muted text-sm">
                {images.posters?.length || 0} posters • {images.backdrops?.length || 0} backdrops • {images.logos?.length || 0} logos
              </p>
            </div>
            <Button
              onClick={() => { setSelectedMovie(null); setImages(null); }}
              variant="ghost"
            >
              Cancel
            </Button>
          </div>
          
          <Button onClick={handleImport}>
            Import Movie & Assets
          </Button>
        </div>
      )}
    </div>
  );
};
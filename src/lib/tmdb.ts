const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'demo-api-key';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string, size: 'w185' | 'w342' | 'w500' | 'w780' | 'w1280' | 'original' = 'original'): string => {
  if (!path) return '';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getConfig = () => ({
  apiKey: API_KEY,
  baseUrl: BASE_URL,
  imageBaseUrl: IMAGE_BASE_URL,
});

export const searchMovies = async (query: string, page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getMovieDetails = async (id: number) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return await res.json();
  } catch (error) {
    console.error('Error getting movie details:', error);
    return null;
  }
};

export const getMovieImages = async (id: number) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
    return await res.json();
  } catch (error) {
    console.error('Error getting movie images:', error);
    return { backdrops: [], logos: [], posters: [] };
  }
};

export const getTrendingMovies = async (timeWindow: 'day' | 'week' = 'week', page = 1) => {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&page=${page}`);
    return await res.json();
  } catch (error) {
    console.error('Error getting trending movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return await res.json();
  } catch (error) {
    console.error('Error getting popular movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getDiscoverMovies = async (params: {
  year?: number;
  sort_by?: string;
  page?: number;
}) => {
  const { year, sort_by = 'popularity.desc', page = 1 } = params;
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sort_by}&page=${page}`;
  if (year) url += `&primary_release_year=${year}`;
  
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error('Error getting discovered movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getGenreMovies = async (genreId: number, page = 1) => {
  try {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
    return await res.json();
  } catch (error) {
    console.error('Error getting genre movies:', error);
    return { results: [], total_pages: 0 };
  }
};
export interface Movie {
  id: string;
  tmdb_id: number;
  title: string;
  slug: string;
  overview: string | null;
  release_date: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  created_at: string;
}

export interface Asset {
  id: string;
  movie_id: string;
  type: 'poster' | 'backdrop' | 'logo' | 'wallpaper';
  image_url: string;
  width: number;
  height: number;
  size_kb: number | null;
  source: 'tmdb' | 'upload';
  created_at: string;
  movie?: Movie;
}

export interface FeaturedAsset {
  id: string;
  asset_id: string;
  asset?: Asset;
}

export interface TMDbMovie {
  id: number;
  title: string;
  overview: string | null;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
}

export interface TMDbImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface TMDbImages {
  id: number;
  backdrops: TMDbImage[];
  logos: TMDbImage[];
  posters: TMDbImage[];
}

export type AssetType = 'poster' | 'backdrop' | 'logo' | 'wallpaper';

export interface SearchResult {
  movies: Movie[];
  total: number;
}
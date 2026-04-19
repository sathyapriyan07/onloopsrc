-- CineAssets Database Schema
-- Run this SQL in your Supabase SQL Editor to create the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Movies table
CREATE TABLE movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tmdb_id INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  overview TEXT,
  release_date DATE,
  poster_path TEXT,
  backdrop_path TEXT,
  popularity REAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for slug lookups
CREATE INDEX idx_movies_slug ON movies(slug);
CREATE INDEX idx_movies_popularity ON movies(popularity DESC);
CREATE INDEX idx_movies_release_date ON movies(release_date DESC);

-- Assets table
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('poster', 'backdrop', 'logo', 'wallpaper')),
  image_url TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  size_kb INTEGER,
  source TEXT NOT NULL CHECK (source IN ('tmdb', 'upload')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for assets
CREATE INDEX idx_assets_movie_id ON assets(movie_id);
CREATE INDEX idx_assets_type ON assets(type);
CREATE INDEX idx_assets_created_at ON assets(created_at DESC);

-- Featured table
CREATE TABLE featured (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read movies" ON movies FOR SELECT USING (true);
CREATE POLICY "Public can read assets" ON assets FOR SELECT USING (true);
CREATE POLICY "Public can read featured" ON featured FOR SELECT USING (true);

-- Authenticated policies (for admin)
CREATE POLICY "Admin can insert movies" ON movies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update movies" ON movies FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete movies" ON movies FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can insert assets" ON assets FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update assets" ON assets FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete assets" ON assets FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can insert featured" ON featured FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete featured" ON featured FOR DELETE USING (auth.role() = 'authenticated');

-- Storage buckets (run in Storage section of Supabase dashboard)
-- Create buckets: 'wallpapers', 'custom_posters'

-- Create functions for movies
CREATE OR REPLACE FUNCTION get_movies(p_limit INTEGER DEFAULT 20, p_offset INTEGER DEFAULT 0)
RETURNS SETOF movies AS $$
BEGIN
  RETURN QUERY
    SELECT * FROM movies
    ORDER BY popularity DESC
    LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function for assets by movie
CREATE OR REPLACE FUNCTION get_assets_by_movie(p_movie_id UUID, p_type TEXT DEFAULT NULL)
RETURNS SETOF assets AS $$
BEGIN
  IF p_type IS NULL THEN
    RETURN QUERY
      SELECT * FROM assets
      WHERE movie_id = p_movie_id
      ORDER BY created_at DESC;
  ELSE
    RETURN QUERY
      SELECT * FROM assets
      WHERE movie_id = p_movie_id AND type = p_type
      ORDER BY created_at DESC;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
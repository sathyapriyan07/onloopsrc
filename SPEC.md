# CineAssets - Movie Asset Discovery & Download Platform

## 📋 Project Overview

**Project Name:** CineAssets  
**Type:** Full-stack Web Application  
**Core Functionality:** A platform where users can explore and download movie assets (posters, backdrops, logos, wallpapers). Not a streaming platform.  
**Target Users:** Movie enthusiasts, designers, content creators seeking high-quality movie imagery.

---

## 🏗 Technical Architecture

### Tech Stack

**Frontend:**
- React 18 (Vite)
- TypeScript
- Tailwind CSS
- React Router v6
- TanStack Query v5
- Framer Motion
- Supabase Client

**Backend:**
- Supabase (PostgreSQL, Storage, Auth)
- TMDb API (external)

### Folder Structure (src/)

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Image.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   └── Loader.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── Sidebar.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── TrendingSlider.tsx
│   │   ├── FeaturedWallpapers.tsx
│   │   └── Categories.tsx
│   ├── movies/
│   │   ├── MovieCard.tsx
│   │   ├── MovieGrid.tsx
│   │   ├── MovieFilters.tsx
│   │   └── MovieHero.tsx
│   ├── assets/
│   │   ├── AssetCard.tsx
│   │   ├── AssetGrid.tsx
│   │   ├── AssetModal.tsx
│   │   └── DownloadButton.tsx
│   ├── explore/
│   │   ├── MasonryGrid.tsx
│   │   └── InfiniteScroll.tsx
│   └── admin/
│       ├── AdminLayout.tsx
│       ├── TMDbSearch.tsx
│       ├── AssetUploader.tsx
│       └── AssetManager.tsx
├── pages/
│   ├── Home.tsx
│   ├── Movies.tsx
│   ├── MovieDetail.tsx
│   ├── Explore.tsx
│   ├── Search.tsx
│   └── Admin.tsx
├── hooks/
│   ├── useMovies.ts
│   ├── useAssets.ts
│   ├── useSearch.ts
│   └── useInfiniteScroll.ts
├── lib/
│   ├── supabase.ts
│   ├── tmdb.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | #0B0B0F | Main background |
| `--bg-secondary` | #121218 | Cards, sections |
| `--bg-tertiary` | #1A1A24 | Hover states |
| `--accent` | #E50914 | Primary accent (Netflix red) |
| `--accent-hover` | #FF1F2C | Accent hover |
| `--text-primary` | #FFFFFF | Headings |
| `--text-secondary` | #A1A1B3 | Body text |
| `--text-muted` | #6B6B7B | Captions |
| `--glass` | rgba(255,255,255,0.05) | Glassmorphism |
| `--border` | rgba(255,255,255,0.08) | Borders |

### Typography

- **Font Family:** Inter (Google Fonts)
- **Heading 1:** 48px, 700 weight
- **Heading 2:** 36px, 600 weight
- **Heading 3:** 24px, 600 weight
- **Body:** 16px, 400 weight
- **Caption:** 14px, 400 weight

### Spacing System

- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: 16px
- `--space-lg`: 24px
- `--space-xl`: 32px
- `--space-2xl`: 48px
- `--space-3xl`: 64px

### Border Radius

- `--radius-sm`: 6px
- `--radius-md`: 12px
- `--radius-lg`: 16px
- `--radius-xl`: 24px
- `--radius-full`: 9999px

### Effects

- **Glassmorphism:** backdrop-filter: blur(12px)
- **Card Shadow:** 0 4px 24px rgba(0,0,0,0.4)
- **Hover Scale:** transform: scale(1.05)
- **Transitions:** 200-300ms ease-out

---

## 📊 Database Schema (Supabase)

### Table: movies

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PRIMARY KEY |
| tmdb_id | integer | UNIQUE |
| title | text | NOT NULL |
| slug | text | UNIQUE, NOT NULL |
| overview | text | |
| release_date | date | |
| poster_path | text | |
| backdrop_path | text | |
| popularity | float | |
| created_at | timestamp | DEFAULT NOW() |

### Table: assets

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PRIMARY KEY |
| movie_id | uuid | FOREIGN KEY → movies.id |
| type | text | CHECK IN (poster, backdrop, logo, wallpaper) |
| image_url | text | NOT NULL |
| width | integer | NOT NULL |
| height | integer | NOT NULL |
| size_kb | integer | NULLABLE |
| source | text | CHECK IN (tmdb, upload) |
| created_at | timestamp | DEFAULT NOW() |

### Table: featured

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PRIMARY KEY |
| asset_id | uuid | FOREIGN KEY → assets.id |

### Storage Buckets

- `wallpapers/` - Admin-uploaded wallpapers
- `custom_posters/` - Custom poster uploads

---

## 🌐 Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Homepage |
| `/movies` | Movies | Movies listing with filters |
| `/movie/:slug` | MovieDetail | Movie detail + assets |
| `/explore` | Explore | Mixed assets masonry |
| `/search` | Search | Search results |
| `/admin` | Admin | Admin dashboard (protected) |

---

## 🏠 Homepage Sections

1. **Hero Carousel**
   - Auto-rotating backdrop images
   - Gradient overlay
   - Movie title + call-to-action

2. **Trending Movies**
   - Horizontal scroll slider
   - Poster cards with hover effects

3. **Featured Wallpapers**
   - 4-column grid
   - High-quality wallpaper previews

4. **Categories**
   - 4K Wallpapers
   - Minimal Posters
   - Transparent Logos
   - Click to filter assets

---

## 🎬 Movies Page

- Grid layout (responsive columns)
- Filter by year (dropdown)
- Filter by popularity (dropdown)
- Infinite scroll pagination
- Loading skeletons

---

## 🎞 Movie Detail Page

### Hero Section
- Full-width backdrop (16:9)
- Gradient overlay (bottom to top)
- Poster thumbnail (left, w185)
- Title, year, rating
- Overview text

### Content Sections (Tabs)
1. **Posters** - Grid of all poster variants
2. **Logos** - Transparent PNGs
3. **Backdrops** - 16:9 stills
4. **Wallpapers** - Admin-uploaded

### Asset Card Features
- Hover zoom effect
- Resolution label (e.g., 1920x1080)
- Copy URL button
- Download button
- Fullscreen preview modal

---

## 🔍 Search System

- Debounced search input (300ms)
- Search movies by title
- Show matching movies
- Show related asset counts
- Redirect to movie detail

---

## 🌌 Explore Page

- Pinterest-style masonry layout
- Mixed asset types
- Infinite scroll
- Lazy loading images
- Skeleton loaders

---

## 🧑‍💻 Admin Dashboard

### Protected Route
- Check for authenticated user
- Redirect to login if not authenticated

### Features

1. **TMDb Import**
   - Search movies via TMDb API
   - Display search results
   - Import selected movie to DB

2. **Asset Import**
   - Fetch images from TMDb
   - Store URLs in assets table
   - Supported types: poster, backdrop, logo

3. **Wallpaper Upload**
   - File input with drag-drop
   - Upload to Supabase Storage
   - Store metadata in DB

4. **Asset Management**
   - List all assets per movie
   - Delete assets
   - Mark as featured

---

## 🔌 TMDb API Integration

### Base URLs
- API: `https://api.themoviedb.org/3`
- Images: `https://image.tmdb.org/t/p/`

### Endpoints Used
- `GET /search/movie` - Search movies
- `GET /movie/{id}` - Movie details
- `GET /movie/{id}/images` - All images
- `GET /trending/movie/week` - Trending

### Image Sizes
- Poster: w185, w342, w500, original
- Backdrop: w300, w780, w1280, original
- Logo: original (transparent)

---

## ⚡ Performance Optimizations

- **Lazy Loading:** React lazy components
- **Image Loading:** Native lazy loading + Intersection Observer
- **Skeleton Loaders:** Show while loading
- **React Query:** Caching and deduplication
- **TMDb Sizes:** Use optimized sizes (w500 instead of original)

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Columns |
|------------|-------|---------|
| Mobile | < 640px | 2 |
| Tablet | 640-1024px | 3-4 |
| Desktop | > 1024px | 4-6 |

---

## ✅ Acceptance Criteria

1. ✅ Homepage loads with hero, trending, wallpapers, categories
2. ✅ Movies page displays grid with filters
3. ✅ Movie detail shows all asset types
4. ✅ Assets have hover effects and download
5. ✅ Search returns movie results
6. ✅ Explore shows masonry grid
7. ✅ Admin panel allows movie import
8. ✅ Admin can import assets from TMDb
9. ✅ Admin can upload wallpapers
10. ✅ Responsive on all breakpoints
11. ✅ Dark theme with glassmorphism
12. ✅ Smooth animations via Framer Motion

---

## 🚀 Implementation Order

1. Project setup (Vite + React + TS)
2. Supabase configuration
3. Design system (colors, typography, components)
4. Database schema
5. Core pages
6. Components
7. Admin features
8. Polish & optimization
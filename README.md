# CineAssets 🎬

A movie asset discovery and download platform. Browse and download high-quality movie posters, backdrops, logos, and wallpapers.

![CineAssets](https://via.placeholder.com/800x400?text=CineAssets)

## ✨ Features

- **Movie Discovery** - Browse trending movies and search by title
- **Asset Collections** - View posters, backdrops, logos, and wallpapers for each movie
- **Explore Wallpapers** - Pinterest-style masonry grid with infinite scroll
- **Admin Panel** - Import movies from TMDb and manage assets
- **Dark Theme** - Premium glassmorphism UI design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- [Supabase](https://supabase.com) account
- [TMDb API](https://www.themoviedb.org) key

### Installation

```bash
# Clone the repository
cd cineassets

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Edit `.env` with your credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_TMDB_API_KEY=your-tmdb-api-key
```

### Database Setup

1. Create a new Supabase project
2. Go to SQL Editor
3. Run the SQL from `supabase-schema.sql`
4. Create storage buckets: `wallpapers`, `custom_posters`

### Development

```bash
npm run dev
```

Open http://localhost:5173

### Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/       # Admin components
│   ├── assets/     # Asset cards and grids
│   ├── common/     # Reusable UI components
│   ├── explore/   # Explore page components
│   ├── home/      # Homepage components
│   ├── layout/    # Layout components
│   └── movies/    # Movie components
├── hooks/         # Custom React hooks
├── lib/           # Utilities and API clients
├── pages/         # Page components
├── styles/        # Global styles
└── types/        # TypeScript types
```

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Data**: TanStack Query + Supabase
- **Animations**: Framer Motion

## 📜 License

MIT License - see LICENSE for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org) for movie data and images
- [Supabase](https://supabase.com) for backend infrastructure
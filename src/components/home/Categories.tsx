import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'wallpaper',
    label: '4K Wallpapers',
    description: 'Ultra HD backgrounds',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'poster',
    label: 'Minimal Posters',
    description: 'Clean movie posters',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'logo',
    label: 'Transparent Logos',
    description: 'PNG movie logos',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'backdrop',
    label: 'Movie Stills',
    description: 'HD scenes & frames',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-500',
  },
];

export const Categories = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-text-primary mb-6">Categories</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              to={`/explore?type=${category.id}`}
              className="block group relative rounded-xl overflow-hidden p-6 bg-secondary transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative">
                <div className="text-text-secondary mb-3 group-hover:text-white transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-white transition-colors">
                  {category.label}
                </h3>
                <p className="text-sm text-text-muted">
                  {category.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
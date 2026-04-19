import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'wallpaper',
    label: '4K Wallpapers',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'poster',
    label: 'Posters',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    id: 'backdrop',
    label: 'Backdrops',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'logo',
    label: 'Logos',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export const Categories = () => {
  return (
    <div className="section-spacing">
      <h2 className="section-title">Categories</h2>
      
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/explore?type=${category.id}`}
            className="block group"
          >
            <div className="bg-secondary rounded-lg p-4 sm:p-6 text-center transition-all duration-200 hover:bg-tertiary border border-[#222] hover:border-accent">
              <div className="text-text-secondary mb-2 sm:mb-3 group-hover:text-accent transition-colors flex justify-center">
                {category.icon}
              </div>
              <h3 className="text-sm sm:text-base font-medium text-text-primary group-hover:text-accent transition-colors">
                {category.label}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
import { useState, useEffect } from 'react';

interface MovieFiltersProps {
  onFilterChange: (filters: { year?: number; sortBy?: string }) => void;
  defaultYear?: number;
  defaultSortBy?: string;
}

const sortOptions = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'release_date.asc', label: 'Oldest First' },
  { value: 'title.asc', label: 'A-Z' },
  { value: 'title.desc', label: 'Z-A' },
];

export const MovieFilters = ({ onFilterChange, defaultYear, defaultSortBy }: MovieFiltersProps) => {
  const [year, setYear] = useState<number | undefined>(defaultYear);
  const [sortBy, setSortBy] = useState(defaultSortBy || 'popularity.desc');
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  useEffect(() => {
    onFilterChange({ year, sortBy });
  }, [year, sortBy, onFilterChange]);
  
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={year || ''}
          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : undefined)}
          className="input-field min-w-[140px]"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field min-w-[160px]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
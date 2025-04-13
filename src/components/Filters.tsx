import React from 'react';
import { FilterProps } from '../types';
import { motion } from 'framer-motion';

const Filters: React.FC<FilterProps> = ({
  genres,
  selectedGenre,
  setSelectedGenre,
  languages,
  selectedLanguage,
  setSelectedLanguage,
  sortBy,
  setSortBy,
  useExactYear,
  setUseExactYear
}) => {
  return (
    <motion.div 
      className="mb-6 p-4 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Genre
            </label>
            <select
              id="genre-filter"
              value={selectedGenre || ''}
              onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : null)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="language-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Language
            </label>
            <select
              id="language-filter"
              value={selectedLanguage || ''}
              onChange={(e) => setSelectedLanguage(e.target.value || null)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Languages</option>
              {languages
                .sort((a, b) => a.english_name.localeCompare(b.english_name))
                .map((lang) => (
                  <option key={lang.iso_639_1} value={lang.iso_639_1}>
                    {lang.english_name}
                  </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="release_date">Release Date (Newest)</option>
              <option value="popularity">Popularity</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <label htmlFor="year-toggle" className="text-sm font-medium text-gray-700 mr-3">
            Show movies from:
          </label>
          <div className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="year-toggle" 
              className="sr-only peer" 
              checked={useExactYear}
              onChange={() => setUseExactYear(!useExactYear)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {useExactYear ? 'Selected Year Only' : 'All Years'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Filters; 
import React, { forwardRef } from 'react';
import { FilterProps } from '../types';
import { motion } from 'framer-motion';

const Filters = forwardRef<HTMLDivElement, FilterProps>((
  {
    genres,
    selectedGenre,
    setSelectedGenre,
    languages,
    selectedLanguage,
    setSelectedLanguage,
    sortBy,
    setSortBy
  },
  ref
) => {
  return (
    <motion.div 
      ref={ref}
      className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[#181818] dark:bg-[#181818] rounded-lg shadow-md border border-[#212121]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-end">
          <div>
            <label htmlFor="genre-filter" className="block text-xs sm:text-sm font-['Against'] text-[#FFFFFF] dark:text-[#FFFFFF] mb-1 tracking-wide">
              Filter by Genre
            </label>
            <select
              id="genre-filter"
              value={selectedGenre || ''}
              onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : null)}
              className="block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm bg-[#212121] dark:bg-[#212121] text-[#FFFFFF] dark:text-[#FFFFFF] border border-[#00BCD4] dark:border-[#00BCD4] rounded-md shadow-sm focus:outline-none focus:ring-[#29ABE2] focus:border-[#29ABE2]"
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
            <label htmlFor="language-filter" className="block text-xs sm:text-sm font-['Against'] text-[#FFFFFF] dark:text-[#FFFFFF] mb-1 tracking-wide">
              Filter by Language
            </label>
            <select
              id="language-filter"
              value={selectedLanguage || ''}
              onChange={(e) => setSelectedLanguage(e.target.value || null)}
              className="block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm bg-[#212121] dark:bg-[#212121] text-[#FFFFFF] dark:text-[#FFFFFF] border border-[#00BCD4] dark:border-[#00BCD4] rounded-md shadow-sm focus:outline-none focus:ring-[#29ABE2] focus:border-[#29ABE2]"
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
            <label htmlFor="sort-by" className="block text-xs sm:text-sm font-['Against'] text-[#FFFFFF] dark:text-[#FFFFFF] mb-1 tracking-wide">
              Sort by
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm bg-[#212121] dark:bg-[#212121] text-[#FFFFFF] dark:text-[#FFFFFF] border border-[#00BCD4] dark:border-[#00BCD4] rounded-md shadow-sm focus:outline-none focus:ring-[#29ABE2] focus:border-[#29ABE2]"
            >
              <option value="popularity">Popularity</option>
              <option value="release_date">Release Date (Newest)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default Filters; 
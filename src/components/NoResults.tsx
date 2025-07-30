import React from 'react';
import { motion } from 'framer-motion';

interface NoResultsProps {
  useExactYear: boolean;
  selectedDate: Date | null;
}

const NoResults: React.FC<NoResultsProps> = ({ useExactYear, selectedDate }) => {
  const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  }) : '';

  return (
    <motion.div 
      className="text-center py-8 sm:py-12 px-3 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 text-primary-300 dark:text-primary-600">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
          />
        </svg>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">No Movies Found</h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4 sm:mb-6">
        We couldn't find any movies released on {formattedDate}. Try selecting a different date.
      </p>
      
      <div className="flex justify-center">
        <a 
          href="https://www.themoviedb.org/movie/changes"
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-primary-500 text-white px-3 py-2 text-sm sm:text-base rounded-lg hover:bg-primary-600 transition-colors duration-200"
        >
          Browse Recent Movies on TMDB
        </a>
      </div>
    </motion.div>
  );
};

export default NoResults; 
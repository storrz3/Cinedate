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
    year: useExactYear ? 'numeric' : undefined
  }) : '';

  return (
    <motion.div 
      className="text-center py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-24 h-24 mx-auto mb-6 text-primary-300">
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
      <h3 className="text-xl font-bold text-gray-800 mb-2">No Movies Found</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        {useExactYear 
          ? `We couldn't find any movies released on ${formattedDate}. Try selecting a different date or viewing movies from all years instead.`
          : `We couldn't find any movies released on ${formattedDate} across any year. Try selecting a different date.`
        }
      </p>
      
      <div className="flex justify-center">
        <a 
          href="https://www.themoviedb.org/movie/changes"
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200"
        >
          Browse Recent Movies on TMDB
        </a>
      </div>
    </motion.div>
  );
};

export default NoResults; 
import React, { useState } from 'react';
import { MovieCardProps } from '../types';
import { getImageUrl, getTMDBMovieUrl } from '../services/api';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
  const releaseYear = new Date(movie.release_date).getFullYear();
  const movieGenres = genres.filter(genre => movie.genre_ids.includes(genre.id));
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMovieClick = () => {
    window.open(getTMDBMovieUrl(movie.id), '_blank', 'noopener,noreferrer');
  };
  
  return (
    <motion.div 
      className="card flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      layout
    >
      <div 
        className="relative pb-[150%] overflow-hidden cursor-pointer group" 
        onClick={handleMovieClick}
        title={`View ${movie.title} on TMDB`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={`${movie.title} poster`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.jpg';
          }}
        />
        <div className="absolute top-2 right-2 bg-primary-500 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center">
          {Math.round(movie.vote_average * 10) / 10}
        </div>
        
        {/* Overlay when hovering */}
        <div className={`absolute inset-0 bg-primary-700 bg-opacity-60 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-white text-center p-4">
            <span className="bg-primary-500 rounded-full px-4 py-2 inline-block">
              View on TMDB
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 
          className="text-lg font-bold mb-1 text-primary-700 cursor-pointer hover:text-primary-500 transition-colors duration-200"
          onClick={handleMovieClick}
          title={`View ${movie.title} on TMDB`}
        >
          {movie.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{releaseYear}</p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {movieGenres.slice(0, 3).map(genre => (
            <span 
              key={genre.id} 
              className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-3 mt-auto">
          {movie.overview || 'No overview available.'}
        </p>
        
        <div className="mt-3 text-xs text-right">
          <a 
            href={getTMDBMovieUrl(movie.id)}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-700 transition-colors duration-200"
          >
            View on TMDB →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard; 
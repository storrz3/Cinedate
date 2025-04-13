import React, { useState, useEffect } from 'react';
import { getPopularMovies, getImageUrl } from '../services/api';
// import { Movie } from '../types'; <-- Remove unused import
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [backdropPath, setBackdropPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBackdrop = async () => {
      setLoading(true);
      try {
        const data = await getPopularMovies();
        // Filter movies that have a backdrop path
        const moviesWithBackdrops = data.results.filter(movie => movie.backdrop_path);
        
        if (moviesWithBackdrops.length > 0) {
          // Select a random movie from the filtered list
          const randomIndex = Math.floor(Math.random() * moviesWithBackdrops.length);
          const randomMovie = moviesWithBackdrops[randomIndex];
          setBackdropPath(randomMovie.backdrop_path);
        } else {
          // Handle case where no popular movies have backdrops
          setBackdropPath(null);
        }
      } catch (err) {
        console.error("Failed to fetch backdrop image:", err);
        setBackdropPath(null); // Ensure backdrop is null on error
      } finally {
        setLoading(false);
      }
    };
    fetchBackdrop();
  }, []);

  const backgroundImageUrl = backdropPath ? getImageUrl(backdropPath, 'original') : null;

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center px-4 text-white overflow-hidden">
      
      {/* Background Image Layer (Blurred) */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{
          backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Fallback Gradient Layer (If no image or loading) */}
      {!loading && !backdropPath && (
         <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-500 z-0"></div>
      )}

      {/* Dark Overlay Layer (On top of background) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>

      {/* Text Content Layer (On top of overlay) */}
      <motion.div
        className="relative z-20 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
          Birthday Movie Finder
        </h1>
        <p className="text-lg md:text-xl text-shadow">
          Discover which movies were released on your birthday throughout cinema history
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection; 
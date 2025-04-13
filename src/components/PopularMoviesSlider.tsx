import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { getPopularMovies, getImageUrl, getTMDBMovieUrl } from '../services/api';
import { Movie } from '../types';
import { motion } from 'framer-motion';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PopularMoviesSlider: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPopularMovies();
        setPopularMovies(data.results);
      } catch (err) {
        setError('Could not load popular movies.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        }
      },
    ]
  };

  const handleMovieClick = (movieId: number) => {
    window.open(getTMDBMovieUrl(movieId), '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500">
        Loading popular movies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-48 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }
  
  if (popularMovies.length === 0) {
    return null; // Don't render anything if there are no popular movies
  }

  return (
    <motion.div 
      className="mb-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-primary-700 mb-4 text-center md:text-left">Trending Now</h2>
      <Slider {...settings}>
        {popularMovies.map((movie) => (
          <div key={movie.id} className="px-2">
            <motion.div
              className="cursor-pointer group relative overflow-hidden rounded-lg shadow-md"
              onClick={() => handleMovieClick(movie.id)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              title={movie.title}
            >
              <img 
                src={getImageUrl(movie.poster_path, 'w300')} 
                alt={movie.title}
                className="w-full h-auto object-cover aspect-[2/3]"
                onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <p className="text-white text-xs font-medium line-clamp-2">
                  {movie.title}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
};

export default PopularMoviesSlider; 
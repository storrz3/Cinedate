import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthdayDatePicker from './components/DatePicker';
import MovieCard from './components/MovieCard';
import Loading from './components/Loading';
import NoResults from './components/NoResults';
import Filters from './components/Filters';
import PopularMoviesSlider from './components/PopularMoviesSlider';
import HeroSection from './components/HeroSection';
import { useMovies } from './hooks/useMovies';

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { 
    movies, 
    genres, 
    languages,
    loading, 
    error, 
    selectedGenre,
    setSelectedGenre,
    selectedLanguage,
    setSelectedLanguage,
    sortBy,
    setSortBy,
    useExactYear,
    setUseExactYear
  } = useMovies(selectedDate);

  const resultsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate && resultsSectionRef.current) {
      resultsSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="relative">
        <HeroSection />
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 md:pb-12 transform translate-y-1/2">
          <BirthdayDatePicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
      </div>

      <div className="h-48 md:h-56"></div>

      <div className="container mx-auto">
        <PopularMoviesSlider />
      </div>

      <main className="container mx-auto px-4 flex-grow pb-12">
        {selectedDate && (
          <>
            <div ref={resultsSectionRef} className="pt-16 md:pt-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 mt-8 md:mt-12"
              >
                <h2 className="text-2xl font-bold text-center text-primary-700 mb-8">
                  Movies Released on {selectedDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: useExactYear ? 'numeric' : undefined
                  })}
                  {!useExactYear && " (All Years)"}
                </h2>
              </motion.div>
            </div>

            {(genres.length > 0 || languages.length > 0) && (
              <Filters
                genres={genres}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                languages={languages}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                sortBy={sortBy}
                setSortBy={setSortBy}
                useExactYear={useExactYear}
                setUseExactYear={setUseExactYear}
              />
            )}

            <AnimatePresence mode='wait'>
              {loading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loading />
                </motion.div>
              ) : error ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10 text-red-500">
                  <p>{error}</p>
                </motion.div>
              ) : movies.length === 0 ? (
                <motion.div key="noresults" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <NoResults useExactYear={useExactYear} selectedDate={selectedDate} />
                </motion.div>
              ) : (
                <motion.div 
                  key="results-grid"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  layout
                >
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} genres={genres} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </main>

      <footer className="w-full py-4 text-center text-gray-500 text-sm mt-auto bg-gray-100 border-t border-gray-200">
        <p>© {new Date().getFullYear()} Birthday Movie Finder</p>
      </footer>
    </div>
  );
};

export default App;

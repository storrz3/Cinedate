import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthdayDatePicker from './components/DatePicker';
import MovieCard from './components/MovieCard';
import Loading from './components/Loading';
import NoResults from './components/NoResults';
import Filters from './components/Filters';
import PopularMoviesSlider from './components/PopularMoviesSlider';
import HeroSection from './components/HeroSection';
import CustomThemeToggle from './components/CustomThemeToggle';
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
    setSortBy
  } = useMovies(selectedDate);

  const resultsSectionRef = useRef<HTMLDivElement>(null);
  const filtersSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate && resultsSectionRef.current) {
      setTimeout(() => {
        const yOffset = 160;
        const element = resultsSectionRef.current;
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset;
        
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!loading && selectedDate && filtersSectionRef.current) {
      const timer = setTimeout(() => {
        const yOffset = 20;
        const element = filtersSectionRef.current;
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset;
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedDate, loading]);

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] dark:bg-[#121212] transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <CustomThemeToggle />
      </div>

      <div className="relative">
        <HeroSection />
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 md:pb-12 flex justify-center transform translate-y-[85%] sm:translate-y-[75%] md:translate-y-[65%]">
          <BirthdayDatePicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
      </div>

      <div className="h-72 sm:h-64 md:h-64"></div>

      <div className="container mx-auto px-3 sm:px-4">
        <PopularMoviesSlider />
      </div>

      <main className="container mx-auto px-3 sm:px-4 flex-grow pb-8 sm:pb-12">
        {selectedDate && (
          <>
            <div ref={resultsSectionRef} className="pt-12 sm:pt-16 md:pt-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4 sm:mb-6 mt-4 sm:mt-8"
              >
                <h2 className="font-['Against'] text-xl sm:text-2xl text-center text-[#FFFFFF] mb-4 sm:mb-8 tracking-wider">
                  Movies Released on {selectedDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h2>
              </motion.div>
            </div>

            {!loading && (genres.length > 0 || languages.length > 0) && (
              <Filters
                ref={filtersSectionRef}
                key={selectedDate ? selectedDate.toISOString() : 'no-date'}
                genres={genres}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                languages={languages}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                sortBy={sortBy}
                setSortBy={setSortBy}
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
                  <NoResults useExactYear={true} selectedDate={selectedDate} />
                </motion.div>
              ) : (
                <motion.div 
                  key="results-grid"
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
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

      <footer className="w-full py-4 text-center text-[#AAAAAA] text-sm mt-auto bg-[#181818] border-t border-[#212121]">
        <p className="font-['Against'] tracking-wider">© {new Date().getFullYear()} Birthday Movie Finder</p>
      </footer>
    </div>
  );
};

export default App;

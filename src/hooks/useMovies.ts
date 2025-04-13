import { useState, useEffect } from 'react';
import { getMoviesByDate, getGenres, getLanguages } from '../services/api';
import { Movie, Genre, Language } from '../types';

export const useMovies = (selectedDate: Date | null) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('release_date');
  const [useExactYear, setUseExactYear] = useState<boolean>(true);

  // Fetch genres and languages on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresData, languagesData] = await Promise.all([
          getGenres(),
          getLanguages()
        ]);
        setGenres(genresData.genres);
        setLanguages(languagesData);
      } catch (err) {
        setError('Failed to fetch initial data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  // Fetch movies when date changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (!selectedDate) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Month is 0-indexed in JavaScript Date, so we add 1
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const year = useExactYear ? selectedDate.getFullYear() : undefined;
        
        const data = await getMoviesByDate(month, day, year);
        setMovies(data.results);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedDate, useExactYear]);

  // Filter movies based on selected genre and language
  const filteredMovies = movies
    .filter(movie => 
      selectedGenre ? movie.genre_ids.includes(selectedGenre) : true
    )
    .filter(movie => 
      selectedLanguage ? movie.original_language === selectedLanguage : true
    );

  // Sort movies based on sortBy value
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'release_date') {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    } else if (sortBy === 'popularity') {
      return b.vote_average - a.vote_average;
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return {
    movies: sortedMovies,
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
  };
}; 
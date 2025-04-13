import axios from 'axios';
import { MoviesResponse, GenresResponse, LanguagesResponse } from '../types';

// Use JWT token from environment variable
const API_TOKEN = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  params: {
    language: 'en-US',
  }
});

export const getMoviesByDate = async (month: number, day: number, year?: number): Promise<MoviesResponse> => {
  try {
    // Convert month and day to strings with leading zeros if needed
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    
    let params = {};
    
    if (year) {
      // If year is provided, search for movies released on that specific date
      const exactDate = `${year}-${monthStr}-${dayStr}`;
      params = {
        'primary_release_date.gte': exactDate,
        'primary_release_date.lte': exactDate,
        'sort_by': 'popularity.desc',
        'page': 1,
      };
    } else {
      // If no year is provided, search for all movies released on that month and day across years
      params = {
        'primary_release_date.gte': `1900-${monthStr}-${dayStr}`,
        'primary_release_date.lte': `2030-${monthStr}-${dayStr}`,
        'sort_by': 'primary_release_date.desc',
        'page': 1,
      };
    }
    
    const response = await api.get<MoviesResponse>('/discover/movie', { params });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getGenres = async (): Promise<GenresResponse> => {
  try {
    const response = await api.get<GenresResponse>('/genre/movie/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getTMDBMovieUrl = (movieId: number): string => {
  return `https://www.themoviedb.org/movie/${movieId}`;
};

export const getLanguages = async (): Promise<LanguagesResponse> => {
  try {
    const response = await api.get<LanguagesResponse>('/configuration/languages');
    // Filter out languages without an english_name for better display
    return response.data.filter(lang => lang.english_name);
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

export const getPopularMovies = async (): Promise<MoviesResponse> => {
  try {
    const response = await api.get<MoviesResponse>('/movie/popular', {
      params: {
        page: 1, // Fetch the first page of popular movies
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
}; 
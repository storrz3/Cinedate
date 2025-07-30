import { MoviesResponse, GenresResponse, LanguagesResponse } from '../types';

// Using API key from environment variables
const API_KEY = 'c16488af7ab2efaf5b5ce51f6ff22ee1'; 
const BASE_URL = 'https://api.themoviedb.org/3';

async function tmdbFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  // Add API key as URL parameter
  url.searchParams.set('api_key', API_KEY);
  
  // Don't set language here if it's already in the endpoint
  if (!endpoint.includes('language=')) {
    url.searchParams.set('language', 'en-US');
  }
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  try {
    const response = await fetch(url.toString(), {
      headers: { 
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export const getMoviesByDate = async (month: number, day: number, year?: number): Promise<MoviesResponse> => {
  try {
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    
    // Use the discover/movie endpoint instead of movie/popular for date filtering
    const params: Record<string, string> = year
      ? {
          'primary_release_date.gte': `${year}-${monthStr}-${dayStr}`,
          'primary_release_date.lte': `${year}-${monthStr}-${dayStr}`,
          'sort_by': 'popularity.desc',
          'page': '1'
        }
      : {
          'primary_release_date.gte': `1900-${monthStr}-${dayStr}`,
          'primary_release_date.lte': `2030-${monthStr}-${dayStr}`,
          'sort_by': 'primary_release_date.desc',
          'page': '1'
        };

    // Use the correct endpoint for date filtering
    return await tmdbFetch<MoviesResponse>('/discover/movie', params);
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getGenres = async (): Promise<GenresResponse> => {
  try {
    return await tmdbFetch<GenresResponse>('/genre/movie/list');
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder.jpg';
};

export const getTMDBMovieUrl = (movieId: number): string => {
  return `https://www.themoviedb.org/movie/${movieId}`;
};

export const getLanguages = async (): Promise<LanguagesResponse> => {
  try {
    const data = await tmdbFetch<LanguagesResponse>('/configuration/languages');
    return data.filter(lang => lang.english_name);
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

export const getPopularMovies = async (): Promise<MoviesResponse> => {
  try {
    return await tmdbFetch<MoviesResponse>('/movie/popular', {
      page: '1'
    });
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

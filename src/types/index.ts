export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  popularity: number; // Add this field
  genre_ids: number[];
  original_language: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface LanguagesResponse extends Array<Language> {}

export interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

export interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
}

export interface FilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  setSelectedGenre: (genreId: number | null) => void;
  languages: Language[];
  selectedLanguage: string | null;
  setSelectedLanguage: (languageCode: string | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  // These properties are kept for compatibility but the UI toggle has been removed
  useExactYear?: boolean;
  setUseExactYear?: (useExactYear: boolean) => void;
}
export interface CombinedCreditsResponse {
    cast: {
      id: number;
      title?: string; // Para películas
      name?: string; // Para series
      release_date?: string; // Para películas
      first_air_date?: string; // Para series
      poster_path: string | null;
    }[];
    crew: {
      id: number;
      title?: string; // Para películas
      name?: string; // Para series
      release_date?: string; // Para películas
      first_air_date?: string; // Para series
      poster_path: string | null;
    }[];
  }
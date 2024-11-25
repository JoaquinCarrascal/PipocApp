export interface MultiSearchResponse {
    page: number
    results: Result[]
    total_pages: number
    total_results: number
  }
  
  export interface Result {
    backdrop_path?: string
    id: number
    title?: string
    original_title?: string
    overview?: string
    poster_path?: string
    media_type: string
    adult: boolean
    original_language?: string
    genre_ids?: number[]
    popularity: number
    release_date?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
    name?: string
    original_name?: string
    gender?: number
    known_for_department?: string
    profile_path?: string
    known_for?: KnownFor[]
  }
  
  export interface KnownFor {
    backdrop_path?: string
    id: number
    name?: string
    original_name?: string
    overview: string
    poster_path?: string
    media_type: string
    adult: boolean
    original_language: string
    genre_ids: number[]
    popularity: number
    first_air_date?: string
    vote_average: number
    vote_count: number
    origin_country?: string[]
    title?: string
    original_title?: string
    release_date?: string
    video?: boolean
  }
  
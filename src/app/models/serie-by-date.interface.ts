export type Root = {
    adult: boolean
    backdrop_path: any
    created_by: Array<any>
    episode_run_time: Array<any>
    first_air_date: string
    genres: Array<any>
    homepage: string
    id: number
    in_production: boolean
    languages: Array<any>
    last_air_date: any
    last_episode_to_air: any
    name: string
    next_episode_to_air: {
      id: number
      name: string
      overview: string
      vote_average: number
      vote_count: number
      air_date: string
      episode_number: number
      episode_type: string
      production_code: string
      runtime: any
      season_number: number
      show_id: number
      still_path: any
    }
    networks: Array<any>
    number_of_episodes: number
    number_of_seasons: number
    origin_country: Array<string>
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: any
    production_companies: Array<any>
    production_countries: Array<any>
    seasons: Array<{
      air_date: string
      episode_count: number
      id: number
      name: string
      overview: string
      poster_path: any
      season_number: number
      vote_average: number
    }>
    spoken_languages: Array<any>
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
  }
  
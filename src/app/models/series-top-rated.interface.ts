export type TopRatedSeries = {
    page: number
    results: Array<{
      adult: boolean
      backdrop_path: string
      genre_ids: Array<number>
      id: number
      origin_country: Array<string>
      original_language: string
      original_name: string
      overview: string
      popularity: number
      poster_path: string
      first_air_date: string
      name: string
      vote_average: number
      vote_count: number
    }>
    total_pages: number
    total_results: number
  }
  
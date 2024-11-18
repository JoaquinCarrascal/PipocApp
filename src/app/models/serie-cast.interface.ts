export type SerieCast = {
    cast: Array<{
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path: string
      character: string
      credit_id: string
      order: number
    }>
    crew: Array<{
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path?: string
      credit_id: string
      department: string
      job: string
    }>
    id: number
  }
  
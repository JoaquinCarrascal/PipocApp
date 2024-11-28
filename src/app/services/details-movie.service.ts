import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDetailResponse } from '../models/movies-details-response';
import { CastResponse } from '../models/movie-cast-response';
import { ProvidersResponse } from '../models/movies-watch-providers';
import { VideoResponse } from '../models/movies-video-response';
import { Observable } from 'rxjs';
import { FavoriteMovies } from '../models/fav-movie-response';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const BASE_URL = "https://api.themoviedb.org/3/movie";

@Injectable({
  providedIn: 'root'
})
export class DetailsMovieService {

  constructor(private http: HttpClient) { }

  getMovieDetails(id: number): Observable<MovieDetailResponse> {
    return this.http.get<MovieDetailResponse>(`${BASE_URL}/${id}?api_key=${API_KEY}&language=es-ES`);
  }

  getMovieCast(id: number): Observable<CastResponse> {
    return this.http.get<CastResponse>(`${BASE_URL}/${id}/credits?api_key=${API_KEY}&language=es-ES`);
  }

  getMovieProviders(id: number): Observable<ProvidersResponse> {
    return this.http.get<ProvidersResponse>(`${BASE_URL}/${id}/watch/providers?api_key=${API_KEY}`);
  }

  getMovieTrailer(id: number): Observable<VideoResponse> {
    return this.http.get<VideoResponse>(`${BASE_URL}/${id}/videos?api_key=${API_KEY}&language=es-ES`);
  }

  addFilmToFavourite(movie: MovieDetailResponse): Observable<FavoriteMovies> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: movie.id,
      media_type: 'movie',
      watchlist: true
    };

    return this.http.post<FavoriteMovies>(
      `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    );

  }

}
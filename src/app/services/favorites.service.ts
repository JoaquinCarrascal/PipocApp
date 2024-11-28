import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetailsResponse } from '../models/account-details.interface';
import { Observable } from 'rxjs';
import { FavMovieResponse } from '../models/fav-movie-response';
import { MovieDetailResponse } from '../models/movies-details-response';
import { SerieDetails } from '../models/serie-details.interface';
import { FavSeriesResponse } from '../models/fav-tv-response';


const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const API_BASE_URL = "https://api.themoviedb.org/3";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

  addFilmToFavourites(movie: MovieDetailResponse): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id') || '';
    const body = {
      media_id: movie.id,
      media_type: 'movie',
      favorite: true
    };

    return this.http.post<any>(
      `${API_BASE_URL}/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    );

  }

  addSeriesToFavourites(serie: SerieDetails): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id') || '';
    const body = {
      media_id: serie.id,
      media_type: 'serie',
      favorite: true
    };

    return this.http.post<any>(
      `${API_BASE_URL}/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    );

  }

  getFavoriteFilms(): Observable<FavMovieResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<FavMovieResponse>(
      `${API_BASE_URL}/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
    );
  }

  getFavoriteSeries(): Observable<FavSeriesResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<FavSeriesResponse>(
      `${API_BASE_URL}/account/${accountId}/favorite/tv?api_key=${API_KEY}&session_id=${sessionId}`
    );
  }

  removeMoviesFromFavorite(movieId: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: movieId,
      media_type: 'movie',
      favourite: false
    };

    return this.http.post<any>(
      `${API_BASE_URL}/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    );
  }

  removeSeriesFromFavorite(serieId: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: serieId,
      media_type: 'tv',
      favourite: false
    };

    return this.http.post<any>(
      `${API_BASE_URL}/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    );
  }

}

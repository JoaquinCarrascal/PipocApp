import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchlistMovieResponse } from '../models/watchlist-movie.interface';
import { MovieDetailResponse } from '../models/movies-details-response';
import { WatchlistSeriesResponse } from '../models/watchlist-series.interface';
import { SerieDetails } from '../models/serie-details.interface';
import { environment } from '../../environments/environment';

const API_BASE_URL = "https://api.themoviedb.org/3";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private http: HttpClient) { }

  addMoviesToWatchlist(movie: MovieDetailResponse): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id') || '';
    const body = {
      media_id: movie.id,
      media_type: 'movie',
      watchlist: true
    };
    return this.http.post<any>(
      `${API_BASE_URL}/account/account_id/watchlist?api_key=${environment.API_KEY}&session_id=${sessionId}`,
      body
    );
  }

  addSeriesToWatchlist(series: SerieDetails): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id') || '';
    const body = {
      media_id: series.id,
      media_type: 'tv',
      watchlist: true
    };
    return this.http.post<any>(
      `${API_BASE_URL}/account/account_id/watchlist?api_key=${environment.API_KEY}&session_id=${sessionId}`,
      body
    );
  }

  getWatchlistMovies(page : string): Observable<WatchlistMovieResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<WatchlistMovieResponse>(
      `${API_BASE_URL}/account/account_id/watchlist/movies?language=${lang}&api_key=${environment.API_KEY}&session_id=${sessionId}&page=${page}`
    );
  }

  getWatchlistSeries(page : string): Observable<WatchlistSeriesResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<WatchlistSeriesResponse>(
      `${API_BASE_URL}/account/account_id/watchlist/tv?language=${lang}&api_key=${environment.API_KEY}&session_id=${sessionId}&page=${page}`
    );
  }

  removeMoviesFromWatchlist(movieId: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: movieId,
      media_type: 'movie',
      watchlist: false
    };

    return this.http.post<any>(
      `${API_BASE_URL}/account/account_id/watchlist?api_key=${environment.API_KEY}&session_id=${sessionId}`,
      body
    );
  }

  removeSeriesFromWatchlist(serieId: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: serieId,
      media_type: 'tv',
      watchlist: false
    };

    return this.http.post<any>(
      `${API_BASE_URL}/account/account_id/watchlist?api_key=${environment.API_KEY}&session_id=${sessionId}`,
      body
    );
  }

}

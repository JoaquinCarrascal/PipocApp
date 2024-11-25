import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchlistMovieResponse } from '../models/watchlist-movie.interface';
import { MovieDetailResponse } from '../models/movies-details-response';
import { WatchlistSeriesResponse } from '../models/watchlist-series.interface';
import { SerieDetails } from '../models/serie-details.interface';

const API_KEY = "ffb374c01e49cc85b8dcc4041e282dad";
const BASE_URL = "https://api.themoviedb.org/3";

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
      `${BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
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
      `${BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    );
  }

  getWatchlistMovies(): Observable<WatchlistMovieResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<WatchlistMovieResponse>(
      `${BASE_URL}/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`
    );
  }

  getWatchlistSeries(): Observable<WatchlistSeriesResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<WatchlistSeriesResponse>(
      `${BASE_URL}/account/${accountId}/watchlist/tv?api_key=${API_KEY}&session_id=${sessionId}`
    );
  }

}

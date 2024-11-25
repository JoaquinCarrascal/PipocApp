import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchlistMovieResponse } from '../models/watchlist-movie.interface';
import { WatchlistSeriesResponse } from '../models/watchlist-series.interface';
import { AuthService } from './auth.service';

const API_KEY = "ffb374c01e49cc85b8dcc4041e282dad";
const BASE_URL = "https://api.themoviedb.org/3";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getWatchlistMovies(account_id: number): Observable<WatchlistMovieResponse> {
    const session_id = this.authService.getSessionId();
    return this.http.get<WatchlistMovieResponse>(`${BASE_URL}/account/${account_id}/watchlist/movies`, {
      params: {
        api_key: API_KEY,
        session_id: session_id
      }
    });
  }

  getWatchlistSeries(account_id: number): Observable<WatchlistSeriesResponse> {
    const session_id = this.authService.getSessionId();
    return this.http.get<WatchlistSeriesResponse>(`${BASE_URL}/account/${account_id}/watchlist/tv`, {
      params: {
        api_key: API_KEY,
        session_id: session_id
      }
    });
  }

  getAccountDetails(): Observable<{ id: number }> {
    const session_id = this.authService.getSessionId();
    return this.http.get<{ id: number }>(`${BASE_URL}/account`, {
      params: {
        api_key: API_KEY,
        session_id: session_id
      }
    });
  }
}

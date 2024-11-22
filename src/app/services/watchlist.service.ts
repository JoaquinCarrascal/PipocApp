import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchlistMovieResponse } from '../models/watchlist-movie.interface';
import { WatchlistSeriesResponse } from '../models/watchlist-series.interface';

const API_KEY = "ffb374c01e49cc85b8dcc4041e282dad";
const BASE_URL = "https://api.themoviedb.org/3/";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private http: HttpClient) { }
  
  getWatchlistMovies(account_id: number): Observable<WatchlistMovieResponse> {
    return this.http.get<WatchlistMovieResponse>(`${BASE_URL}/account/${account_id}/watchlist/movies`, {
      params: {
        api_key: API_KEY
      }
    });
  }

  getWatchlistSeries(account_id: number): Observable<WatchlistSeriesResponse> {
    return this.http.get<WatchlistSeriesResponse>(`${BASE_URL}/account/${account_id}/watchlist/tv`, {
      params: {
        api_key: API_KEY
      }
    });
  }

}

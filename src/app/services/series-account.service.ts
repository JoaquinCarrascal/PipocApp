import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatedSerieResponse } from '../models/rated-serie.interface';
import { RatedMoviesResponse } from '../models/rated-movies.interface';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const API_BASE_URL = "https://api.themoviedb.org/3";
const sessionId = localStorage.getItem('session_id');

@Injectable({
  providedIn: 'root'
})
export class SeriesAccountService {

  constructor(private http: HttpClient) { }

  addRating(serieId: number, rating: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      throw new Error('Session ID is required');
    }

    const url = `${API_BASE_URL}/tv/${serieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
    return this.http.post(url, { value: rating });
  }

  getUserRatings(): Observable<RatedSerieResponse> {

  
   return this.http.get<RatedSerieResponse>(`${API_BASE_URL}/account/{account_id}/rated/tv?api_key=${API_KEY}&session_id=${sessionId}`);
    
  }

  getUserMoviesRatings(): Observable<RatedMoviesResponse> {
  
    return this.http.get<RatedMoviesResponse>(`${API_BASE_URL}/account/{account_id}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`);
    
  }

  
  deleteSerieRating(serieId: number): Observable<any> {
    const url = `${API_BASE_URL}/tv/${serieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
    return this.http.delete(url);
  }

  deleteMovieRating(movieId: number): Observable<any> {
    const url = `${API_BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
    return this.http.delete(url);
  }
}
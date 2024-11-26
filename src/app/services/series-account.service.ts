import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatedSerieResponse } from '../models/rated-serie.interface';
import { RatedMoviesResponse } from '../models/rated-movies.interface';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const API_BASE_URL = "https://api.themoviedb.org/3";
const sessionId = localStorage.getItem('session_id');
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTI4YmFiYjBiYWVlZDUzZTEyNTVjZDJiMmJkMmUxNSIsIm5iZiI6MTczMTY1Njg0Ny40NTQyMSwic3ViIjoiNjczMWJkOTU2MTYyNmFjMTA2YmU2N2Q4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yNCSOGU0edyqA7PR2On0uHmWbZlDBrBHW1YyLPYnN6o";

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

  addMovieRating(serieId: number, rating: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      throw new Error('Session ID is required');
    }

    const url = `${API_BASE_URL}/movie/${serieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
    return this.http.post(url, { value: rating });
  }

  getUserRatings(): Observable<RatedSerieResponse> {

  
   return this.http.get<RatedSerieResponse>(`https://api.themoviedb.org/3/account/account_id/rated/tv?language=en-US&page=1&session_id=${sessionId}&sort_by=created_at.asc`, 
    {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
    
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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatedSerieResponse } from '../models/rated-serie.interface';
import { RatedMoviesResponse } from '../models/rated-movies.interface';
import { environment } from '../../environments/environment';

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

    const url = `${API_BASE_URL}/tv/${serieId}/rating?api_key=${environment.API_KEY}&session_id=${sessionId}`;
    return this.http.post(url, { value: rating });
  }

  addMovieRating(serieId: number, rating: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      throw new Error('Session ID is required');
    }

    const url = `${API_BASE_URL}/movie/${serieId}/rating?api_key=${environment.API_KEY}&session_id=${sessionId}`;
    return this.http.post(url, { value: rating });
  }

  getUserRatings(pag?:number): Observable<RatedSerieResponse> {

  
   return this.http.get<RatedSerieResponse>(`https://api.themoviedb.org/3/account/account_id/rated/tv?language=en-US&page=${pag ? pag : 1}&session_id=${sessionId}&sort_by=created_at.asc`, 
    {
      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
      }
    });
    
  }

  getUserMoviesRatings(pag?:number): Observable<RatedMoviesResponse> {
  
    return this.http.get<RatedMoviesResponse>(`${API_BASE_URL}/account/{account_id}/rated/movies?language=en-US&page=${pag ? pag : 1}&api_key=${environment.API_KEY}&session_id=${sessionId}`);
    
  }

  
  deleteSerieRating(serieId: number): Observable<any> {
    const url = `${API_BASE_URL}/tv/${serieId}/rating?api_key=${environment.API_KEY}&session_id=${sessionId}`;
    return this.http.delete(url);
  }

  deleteMovieRating(movieId: number): Observable<any> {
    const url = `${API_BASE_URL}/movie/${movieId}/rating?api_key=${environment.API_KEY}&session_id=${sessionId}`;
    return this.http.delete(url);
  }
}
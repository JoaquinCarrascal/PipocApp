import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const API_BASE_URL = "https://api.themoviedb.org/3";

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

  getUserRatings(): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      throw new Error('Session ID is required');
    }
  
    const url = `${API_BASE_URL}/account/{account_id}/rated/tv?api_key=${API_KEY}&session_id=${sessionId}`;
    return this.http.get(url);
  }
}
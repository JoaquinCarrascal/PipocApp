import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetailsResponse } from '../models/account-details.interface';
import { Observable } from 'rxjs';
import { FavMovieResponse } from '../models/fav-movie-response';


const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const API_BASE_URL = "https://api.themoviedb.org/3";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }




  getFavoriteFilms(): Observable<FavMovieResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<FavMovieResponse>(
      `${API_BASE_URL}/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
    );
  }

getFullImagePath(posterPath: string): string {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  return `${baseUrl}${posterPath}`;
  }



  
}

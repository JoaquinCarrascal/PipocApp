import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetailsResponse } from '../models/account-details.interface';
import { Observable } from 'rxjs';
import { FavMovieResponse } from '../models/fav-movie-response';


const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const API_BASE_URL = "https://api.themoviedb.org/3/account/21623231/favorite";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }



  getFavoriteMovies(): Observable<FavMovieResponse> {
    let sessionId = localStorage.getItem('session_id');
    return this.http.get<FavMovieResponse>(

      `${API_BASE_URL}/movie?session_id=${sessionId}&api_key=${API_KEY}`
    );
  }



  
}

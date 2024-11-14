import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopRatedResponse } from '../models/top-rated-response';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const BASE_URL = "https://api.themoviedb.org/3/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieServService { 

  constructor(private http: HttpClient) { }

  getTopRated(): Observable<TopRatedResponse>{

    return this.http.get<TopRatedResponse>(`${BASE_URL}/top_rated?api_key=${API_KEY}`);

  }

  getPopular(): Observable<TopRatedResponse>{

    return this.http.get<TopRatedResponse>(`${BASE_URL}/popular?api_key=${API_KEY}`);



  }
}

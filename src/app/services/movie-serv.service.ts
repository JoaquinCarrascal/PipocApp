import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopRatedResponse } from '../models/top-rated-response';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";

@Injectable({
  providedIn: 'root'
})
export class MovieServService { 

  constructor(private http: HttpClient) { }

  getTopRated(): Observable<TopRatedResponse>{

    return this.http.get<TopRatedResponse>(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);

  }


}

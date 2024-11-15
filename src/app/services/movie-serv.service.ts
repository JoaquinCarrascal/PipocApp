import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopRatedResponse } from '../models/top-rated-response';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTI4YmFiYjBiYWVlZDUzZTEyNTVjZDJiMmJkMmUxNSIsIm5iZiI6MTczMTY1Njg0Ny40NTQyMSwic3ViIjoiNjczMWJkOTU2MTYyNmFjMTA2YmU2N2Q4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yNCSOGU0edyqA7PR2On0uHmWbZlDBrBHW1YyLPYnN6o";
const BASE_URL = "https://api.themoviedb.org/3/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieServService { 

  constructor(private http: HttpClient) { }

  //https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_watch_monetization_types=free

  getTopRated(): Observable<TopRatedResponse>{

    return this.http.get<TopRatedResponse>(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_watch_monetization_types=free`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });

  }

  getPopular(): Observable<TopRatedResponse>{

    return this.http.get<TopRatedResponse>(`${BASE_URL}/popular?api_key=${API_KEY}`);

  }
}

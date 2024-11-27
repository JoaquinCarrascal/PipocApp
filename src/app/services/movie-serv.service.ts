import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopRatedResponse } from '../models/top-rated-response';
import { TvTopRatedResponse } from '../models/top-rated-tv';
import { OrderTriggerPipe } from '../pipes/order-trigger.pipe';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTI4YmFiYjBiYWVlZDUzZTEyNTVjZDJiMmJkMmUxNSIsIm5iZiI6MTczMTY1Njg0Ny40NTQyMSwic3ViIjoiNjczMWJkOTU2MTYyNmFjMTA2YmU2N2Q4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yNCSOGU0edyqA7PR2On0uHmWbZlDBrBHW1YyLPYnN6o";
const BASE_URL = "https://api.themoviedb.org/3/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieServService { 

  constructor(private http: HttpClient ,  private orderTrigger: OrderTriggerPipe) { }

  getTopRated(): Observable<TopRatedResponse>{

    return this.http.get<TopRatedResponse>(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_watch_monetization_types=free`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });

  }

  getPopular(): Observable<TopRatedResponse>{

    let thisYear = new Date().getFullYear();

    return this.http.get<TopRatedResponse>(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${thisYear}&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=100&api_key=${API_KEY}`);

  }

  getPopularTv(): Observable<TvTopRatedResponse>{

    let thisYear = new Date().getFullYear();

    return this.http.get<TvTopRatedResponse>(`https://api.themoviedb.org/3/discover/tv?first_air_date_year=${thisYear}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=7&vote_count.gte=100&api_key=${API_KEY}`);
  
  }

  getPopularTvByGenre(genreId: number): Observable<TvTopRatedResponse>{

    return this.http.get<TvTopRatedResponse>(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&api_key=${API_KEY}`);

  }

  getMovieList(pag: number , free: boolean , order?: number) : Observable<TopRatedResponse>{

    let freeQuery = free ? "&watch_region=ES&with_watch_monetization_types=free" : "";

    return this.http.get<TopRatedResponse>(`https://api.themoviedb.org/3/discover/movie?page=${pag}&sort_by=${this.orderTrigger.transform(order)}${freeQuery}`, 
    {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });

  }

}

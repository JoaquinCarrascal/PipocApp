import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../evironments/environments';
import { map, Observable } from 'rxjs';
import { Serie, SerieResponse } from '../interface/serie.interface';
import { Network, SerieDetails } from '../interface/serie-details.interface';
import { Root } from '../interface/serie-by-date.interface';
import { TopRatedSeries } from '../interface/series-top-rated.interface';


const apiKey: string = '7cb3ebb77086a8a379dd38b88a23269a';
const baseUrl = 'https://api.themoviedb.org/3/discover/tv';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {



  constructor(private http: HttpClient) { }


  numRandom = Math.floor(Math.random() * 80) + 1;

  getSeries(): Observable<SerieResponse> {
    const numRandom = Math.floor(Math.random() * 80) + 1;
    return this.http.get<SerieResponse>(`${baseUrl}?api_key=${apiKey}&include_adult=false&language=es&page=${numRandom}&sort_by=popularity.desc`);
  }

 
  



  orderSeriesByDate(p0: string): Observable<SerieResponse> {
    return this.http.get<SerieResponse>(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=es&sort_by=first_air_date.desc`
    );
  }

  ordenarPorprimerasSeries(p0: string): Observable<SerieResponse> {
    return this.http.get<SerieResponse>(
      `https://api.themoviedb.org/3/discover/tv?api_key=7cb3ebb77086a8a379dd38b88a23269a&language=es&sort_by=first_air_date.asc`
    );
  }


  orderSeriesByRating(p0: string): Observable<TopRatedSeries> {
    return this.http.get<TopRatedSeries>(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`)
  }

  orderSeriesByRatingRandom(p0: string): Observable<TopRatedSeries> {
    const numRandom = Math.floor(Math.random() * 80) + 1;

    return this.http.get<TopRatedSeries>(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=${numRandom}`)

  }

  
}

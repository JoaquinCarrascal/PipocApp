import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { Serie, SerieResponse } from '../models/serie.interface';
import { Network, SerieDetails } from '../models/serie-details.interface';
import { Root } from '../models/serie-by-date.interface';
import { TopRatedSeries } from '../models/series-top-rated.interface';
import { SerieCast } from '../models/serie-cast.interface';
import { Keyword } from '../models/keyword.interface';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { TrailerResponse } from '../models/trailer.interface';
import { FavSeriesResponse } from '../models/fav-tv-response';


const apiKey: string = '7cb3ebb77086a8a379dd38b88a23269a';
const baseUrl = 'https://api.themoviedb.org/3/discover/tv';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {



  constructor(private http: HttpClient) { }


  numRandom = Math.floor(Math.random() * 80) + 1;

  getSeries(pag: number): Observable<SerieResponse> {
    return this.http.get<SerieResponse>(`${baseUrl}?api_key=${apiKey}&include_adult=false&language=es&page=${pag}&sort_by=popularity.desc`);
  }


  orderSeriesByDate(p0: string , pag: number): Observable<SerieResponse> {
    return this.http.get<SerieResponse>(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=es&sort_by=first_air_date.desc&page=${pag}`
    );
  }

  ordenarPorprimerasSeries(p0: string , pag: number): Observable<SerieResponse> {
    return this.http.get<SerieResponse>(
      `https://api.themoviedb.org/3/discover/tv?api_key=7cb3ebb77086a8a379dd38b88a23269a&language=es&sort_by=first_air_date.asc&page=${pag}`
    );
  }


  orderSeriesByRating(p0: string , pag: number): Observable<TopRatedSeries> {
    return this.http.get<TopRatedSeries>(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=${pag}`)
  }

  orderSeriesByRatingRandom(p0: string): Observable<TopRatedSeries> {
    const numRandom = Math.floor(Math.random() * 80) + 1;

    return this.http.get<TopRatedSeries>(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=${numRandom}`)

  }


  obtenerDetallesSerie(id: number): Observable<SerieDetails> {
    return this.http.get<SerieDetails>(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=es`);
  }
  
  obtenerRepartoSerie(id : number): Observable<SerieCast>{
    return this.http.get<SerieCast>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`)
  }

  getKeyWords(id : number) : Observable <Keyword>{
    return this.http.get<Keyword>(`https://api.themoviedb.org/3/tv/${id}/keywords?api_key=${apiKey}`)
  }
  
  getTrailer(id: number): Observable<TrailerResponse>{
    return this.http.get<TrailerResponse>(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`);
  }

  addSeriesToFavourite(serie: SerieDetails): Observable<FavSeriesResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: serie.id,
      media_type: 'tv',
      favorite: true
    };

    return this.http.post<FavSeriesResponse>(
      `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
      body
    );

  }

}

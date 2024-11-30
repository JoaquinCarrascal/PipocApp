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
import { WatchlistSeries } from '../models/watchlist-series.interface';
import { environment } from '../../environments/environment';
import { OrderTriggerPipe } from '../pipes/order-trigger.pipe';

const baseUrl = 'https://api.themoviedb.org/3/discover/tv';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {



  constructor(private http: HttpClient,
              private orderTrigger: OrderTriggerPipe
            ) { }


  numRandom = Math.floor(Math.random() * 80) + 1;

  getSeries2(pag: number): Observable<SerieResponse> {
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<SerieResponse>(`${baseUrl}?api_key=${environment.API_KEY}&include_adult=false&language=${lang}&page=${pag}&sort_by=popularity.desc`);
  }

  getSeries(pag: number , free: boolean , order?: number , min?:number , max?:number) : Observable<SerieResponse>{

    let freeQuery = free ? "&watch_region=ES&with_watch_monetization_types=free" : "";
    if(min){ min = min / 10; }
    if(max){ max = max / 10; }
    let minmaxQuery = min || max ? `&vote_average.gte=${min}&vote_average.lte=${max}&vote_count.gte=400` : "";
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<SerieResponse>(`${baseUrl}?language=${lang}&page=${pag}&sort_by=${this.orderTrigger.transform(order)}${freeQuery}${minmaxQuery}`, 
    {
      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
      }
    });

  }

  obtenerDetallesSerie(id: number): Observable<SerieDetails> {
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<SerieDetails>(`https://api.themoviedb.org/3/tv/${id}?api_key=${environment.API_KEY}&language=${lang}`);
  }
  
  obtenerRepartoSerie(id : number): Observable<SerieCast>{
    return this.http.get<SerieCast>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${environment.API_KEY}`)
  }

  getKeyWords(id : number) : Observable <Keyword>{
    return this.http.get<Keyword>(`https://api.themoviedb.org/3/tv/${id}/keywords?api_key=${environment.API_KEY}`)
  }
  
  getTrailer(id: number): Observable<TrailerResponse>{
    return this.http.get<TrailerResponse>(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${environment.API_KEY}`);
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
      `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${environment.API_KEY}&session_id=${sessionId}`,
      body
    );

  }

  addSeriesToWatchlist(id: number): Observable<WatchlistSeries> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: id,
      media_type: 'tv',
      watchlist: true
    };

    return this.http.post<WatchlistSeries>(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${environment.API_KEY}&session_id=${sessionId}`,
      body
    );

  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopRatedResponse } from '../models/top-rated-response';
import { TvTopRatedResponse } from '../models/top-rated-tv';
import { OrderTriggerPipe } from '../pipes/order-trigger.pipe';
import { environment } from '../../environments/environment';


const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const BASE_URL_TV = "https://api.themoviedb.org/3/discover/tv";

@Injectable({
  providedIn: 'root'
})
export class MovieServService { 

  constructor(private http: HttpClient ,  private orderTrigger: OrderTriggerPipe) { }

  getTopRated(): Observable<TopRatedResponse>{
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<TopRatedResponse>(`${BASE_URL}?include_adult=false&include_video=false&language=${lang}&page=1&sort_by=vote_count.desc&with_watch_monetization_types=free`, {
      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
      }
    });

  }

  getPopular(): Observable<TopRatedResponse>{

    let thisYear = new Date().getFullYear();
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<TopRatedResponse>(`${BASE_URL}?include_adult=false&include_video=false&language=${lang}&page=1&primary_release_year=${thisYear}&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=100&api_key=${environment.API_KEY}`);

  }

  getPopularTv(): Observable<TvTopRatedResponse>{

    let thisYear = new Date().getFullYear();
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<TvTopRatedResponse>(`${BASE_URL_TV}?first_air_date_year=${thisYear}&include_adult=false&include_null_first_air_dates=false&language=${lang}&page=1&sort_by=popularity.desc&vote_average.gte=7&vote_count.gte=100&api_key=${environment.API_KEY}`);
  
  }

  getPopularTvByGenre(genreId: number): Observable<TvTopRatedResponse>{
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<TvTopRatedResponse>(`${BASE_URL_TV}?include_adult=false&include_null_first_air_dates=false&language=${lang}&page=1&sort_by=popularity.desc&with_genres=${genreId}&api_key=${environment.API_KEY}`);

  }

  getMovieList(pag: number , free: boolean , order?: number , min?:number , max?:number) : Observable<TopRatedResponse>{

    let freeQuery = free ? "&watch_region=ES&with_watch_monetization_types=free" : "";
    if(min){ min = min / 10; }
    if(max){ max = max / 10; }
    let minmaxQuery = min || max ? `&vote_average.gte=${min}&vote_average.lte=${max}&vote_count.gte=400` : "";
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<TopRatedResponse>(`${BASE_URL}?language=${lang}&page=${pag}&sort_by=${this.orderTrigger.transform(order)}${freeQuery}${minmaxQuery}`, 
    {
      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
      }
    });

  }


}

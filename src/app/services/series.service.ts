import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../evironments/environments';
import { Observable } from 'rxjs';
import { SerieResponse } from '../interface/serie.interface';
import { Network, SerieDetails } from '../interface/serie-details.interface';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http : HttpClient) { }




  getSeries() : Observable<SerieResponse>{
    return this.http.get<SerieResponse>('https://api.themoviedb.org/3/discover/tv?api_key=7cb3ebb77086a8a379dd38b88a23269a&include_adult=false&language=en-US&page=1&sort_by=popularity.desc')
  }


  getSeriesDetails(id : number) : Observable<Network>{
    return this.http.get<Network>(`https://api.themoviedb.org/3/tv/${id}?api_key=7cb3ebb77086a8a379dd38b88a23269a&language=en-US`)
  }

}

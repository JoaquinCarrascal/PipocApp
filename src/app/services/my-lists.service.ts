import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response';
import { Observable } from 'rxjs';
import { ListItemsResponse } from '../models/list-items';
import { MovieSearchResponse } from '../models/movie-search';
import { TvSearchResponse } from '../models/tv-search';
import { AvailabilityStatusResponse } from '../models/availability-status';
import { CreatedListResponse } from '../models/created-list-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyListsService {

  constructor(private http: HttpClient) { }

  getLists(): Observable<ListResponse> {
    return this.http.get<ListResponse>(`https://api.themoviedb.org/3/account/account_id/lists?page=1&session_id=${localStorage.getItem('session_id')}&api_key=${environment.API_KEY}`);
  }

  getListItems(idList: number): Observable<ListItemsResponse> {
    let lang = localStorage.getItem('lang') || 'es-ES';
    return this.http.get<ListItemsResponse>(`https://api.themoviedb.org/3/list/${idList}?language=${lang}&page=1&api_key=${environment.API_KEY}`);
  }

  deleteList(idList: number){
    return this.http.delete(`https://api.themoviedb.org/3/list/${idList}?session_id=${localStorage.getItem('session_id')}`, {
      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
      }
    });
  }

  createList(name: string){

    const body = JSON.stringify({
      name: name,
      description: '',
      language: 'en'
      });

  return this.http.post<CreatedListResponse>(`https://api.themoviedb.org/3/list?session_id=${localStorage.getItem('session_id')}`,
  body,
  {

    headers: {
      'Authorization': `Bearer ${environment.TOKEN}`,
      'content-type': 'application/json'
    },
    
  });

  }

  deleteItemFromList(idList: number , idItem: number){

    const data = JSON.stringify({
      media_id: idItem
    })

    return this.http.post(`https://api.themoviedb.org/3/list/${idList}/remove_item?session_id=${localStorage.getItem('session_id')}`, 
    data,
    {
      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
        'content-type': 'application/json'
      }
    });

  }

  searchMovieItem(query: string , page?:number): Observable<MovieSearchResponse> {
    
    const queryFormatted = query.split(' ').join('%20');
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<MovieSearchResponse>(`https://api.themoviedb.org/3/search/movie?query=${queryFormatted}&include_adult=false&language=${lang}&page=${page ? `${page}` : '1'}`,{

      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
      }

    });

  }

  searchTvItem(query: string , page?:number): Observable<TvSearchResponse> {
    
    const queryFormatted = query.split(' ').join('%20');
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<TvSearchResponse>(`https://api.themoviedb.org/3/search/tv?query=${queryFormatted}&include_adult=false&language=${lang}&page=${page ? `${page}` : '1'}`,{

      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
      }

    });

  }

  checkIfItemExistsInList(idList: number , idItem: number): Observable<AvailabilityStatusResponse>{
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<AvailabilityStatusResponse>(`https://api.themoviedb.org/3/list/${idList}/item_status?language=${lang}&movie_id=${idItem}`,{

      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
      }

    });
  
  }

  addItemToList(idList: number , idItem: number){

    const data = JSON.stringify({
      media_id: idItem
    })

    return this.http.post(`https://api.themoviedb.org/3/list/${idList}/add_item?session_id=${localStorage.getItem('session_id')}`, 
    data,
    {
      headers: {
        'Authorization': `Bearer ${environment.TOKEN}`,
        'content-type': 'application/json'
      }
    });    

  }


}
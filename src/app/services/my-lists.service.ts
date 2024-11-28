import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response';
import { Observable } from 'rxjs';
import { ListItemsResponse } from '../models/list-items';
import { MovieSearchResponse } from '../models/movie-search';
import { TvSearchResponse } from '../models/tv-search';
import { AvailabilityStatusResponse } from '../models/availability-status';
import { CreatedListResponse } from '../models/created-list-response';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTI4YmFiYjBiYWVlZDUzZTEyNTVjZDJiMmJkMmUxNSIsIm5iZiI6MTczMjMyNTU1MS45NDIwMTksInN1YiI6IjY3MzFiZDk1NjE2MjZhYzEwNmJlNjdkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK6kybVnUfa1HZLz3UngXPtNACqyFqVKFvzPNwEmmBo";

@Injectable({
  providedIn: 'root'
})
export class MyListsService {

  constructor(private http: HttpClient) { }

  getLists(): Observable<ListResponse> {
    return this.http.get<ListResponse>(`https://api.themoviedb.org/3/account/account_id/lists?page=1&session_id=${localStorage.getItem('session_id')}&api_key=${API_KEY}`);
  }

  getListItems(idList: number): Observable<ListItemsResponse> {
    return this.http.get<ListItemsResponse>(`https://api.themoviedb.org/3/list/${idList}?language=en-US&page=1&api_key=${API_KEY}`);
  }

  deleteList(idList: number){
    return this.http.delete(`https://api.themoviedb.org/3/list/${idList}?session_id=${localStorage.getItem('session_id')}`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
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
      'Authorization': `Bearer ${TOKEN}`,
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
        'Authorization': `Bearer ${TOKEN}`,
        'content-type': 'application/json'
      }
    });

  }

  searchMovieItem(query: string , page?:number): Observable<MovieSearchResponse> {
    
    const queryFormatted = query.split(' ').join('%20');

    return this.http.get<MovieSearchResponse>(`https://api.themoviedb.org/3/search/movie?query=${queryFormatted}&include_adult=false&language=en-US&page=${page ? `${page}` : '1'}`,{

      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      }

    });

  }

  searchTvItem(query: string): Observable<TvSearchResponse> {
    
    const queryFormatted = query.split(' ').join('%20');

    return this.http.get<TvSearchResponse>(`https://api.themoviedb.org/3/search/tv?query=${queryFormatted}&include_adult=false&language=en-US&page=1`,{

      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      }

    });

  }

  checkIfItemExistsInList(idList: number , idItem: number): Observable<AvailabilityStatusResponse>{

    return this.http.get<AvailabilityStatusResponse>(`https://api.themoviedb.org/3/list/${idList}/item_status?language=en-US&movie_id=${idItem}`,{

      headers: {
        'Authorization': `Bearer ${TOKEN}`,
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
        'Authorization': `Bearer ${TOKEN}`,
        'content-type': 'application/json'
      }
    });    

  }


}
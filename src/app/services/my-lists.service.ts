import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from '../models/list-response';
import { Observable } from 'rxjs';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";

@Injectable({
  providedIn: 'root'
})
export class MyListsService {

  constructor(private http: HttpClient) { }

  getLists(): Observable<ListResponse> {
    return this.http.get<ListResponse>(`https://api.themoviedb.org/3/account/account_id/lists?page=1&session_id=${localStorage.getItem('session_id')}&api_key=${API_KEY}`);
  }


}

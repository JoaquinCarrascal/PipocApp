import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const API_BASE_URL = "https://api.themoviedb.org/3";


@Injectable({
  providedIn: 'root'
})
export class SeriesAccountService {

  constructor(private http : HttpClient) { }


  addRating(serieId: number, rating: number): Observable<any> {
    return this.http.post(
      `${API_BASE_URL}/tv/${serieId}/rating?api_key=${API_KEY}&session_id=${localStorage.getItem('session_id')}`,
      {
        value: rating,
      }
    );
  }
}

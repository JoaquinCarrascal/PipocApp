import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularPeopleResponse } from '../models/popular-people-response';
import { PersonDetailsResponse } from '../models/person-details-interface';
import { CombinedCreditsResponse } from '../models/combined-credits';
import { environment } from '../../environments/environment';

const BASE_URL = "https://api.themoviedb.org/3/person";


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  getPopularPeople(page: number = 1): Observable<PopularPeopleResponse> {
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<PopularPeopleResponse>(`${BASE_URL}/popular?language=${lang}&api_key=${environment.API_KEY}&page=${page}`);
  }
 
  getPersonDetails(id: number): Observable<PersonDetailsResponse> {
    let lang = localStorage.getItem('lang') || 'es-ES';

    return this.http.get<PersonDetailsResponse>(`${BASE_URL}/${id}?language=${lang}&api_key=${environment.API_KEY}`);
  }
  

  getPersonCombinedCredits(id: number): Observable<CombinedCreditsResponse> {
    let lang = localStorage.getItem('lang') || 'es-ES';
    
    return this.http.get<CombinedCreditsResponse>(`${BASE_URL}/${id}/combined_credits?language=${lang}&api_key=${environment.API_KEY}`);
  }

  getPersonImages(id: number): Observable<PersonDetailsResponse> {
    return this.http.get<PersonDetailsResponse>(`${BASE_URL}/${id}/images?api_key=${environment.API_KEY}`);
  }

  getPersonExternalIds(id: number): Observable<PersonDetailsResponse> {
    return this.http.get<PersonDetailsResponse>(`${BASE_URL}/${id}/external_ids?api_key=${environment.API_KEY}`);
  }
 
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularPeopleResponse } from '../models/popular-people-response';
import { PersonDetailsResponse } from '../models/person-details-interface';
import { CombinedCreditsResponse } from '../models/combined-credits';

const BASE_URL = "https://api.themoviedb.org/3/person";
const API_KEY = "13eb21937668110c8a2635cf3e82ae51";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  getPopularPeople(page: number = 1): Observable<PopularPeopleResponse> {
    return this.http.get<PopularPeopleResponse>(`${BASE_URL}/popular?api_key=${API_KEY}&page=${page}`);
  }
 
  getPersonDetails(id: number): Observable<PersonDetailsResponse> {
    return this.http.get<PersonDetailsResponse>(`${BASE_URL}/${id}?api_key=${API_KEY}`);
  }
  

  getPersonCombinedCredits(id: number): Observable<CombinedCreditsResponse> {
    return this.http.get<CombinedCreditsResponse>(`${BASE_URL}/${id}/combined_credits?api_key=${API_KEY}`);
  }

  getPersonImages(id: number): Observable<PersonDetailsResponse> {
    return this.http.get<PersonDetailsResponse>(`${BASE_URL}/${id}/images?api_key=${API_KEY}`);
  }

  getPersonExternalIds(id: number): Observable<PersonDetailsResponse> {
    return this.http.get<PersonDetailsResponse>(`${BASE_URL}/${id}/external_ids?api_key=${API_KEY}`);
  }
 
}
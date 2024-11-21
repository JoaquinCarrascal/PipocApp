import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../models/account-details.interface';

const API_KEY = "ffb374c01e49cc85b8dcc4041e282dad";
const BASE_URL = "https://api.themoviedb.org/3";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<AccountDetailsResponse> {
    let sessionId = localStorage.getItem('session_id');
    return this.http.get<AccountDetailsResponse>(
      `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../models/account-details.interface';
import { environment } from '../../environments/environment';

const API_BASE_URL = "https://api.themoviedb.org/3";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<AccountDetailsResponse> {
    let sessionId = localStorage.getItem('session_id');
    return this.http.get<AccountDetailsResponse>(
      `${API_BASE_URL}/account?api_key=${environment.API_KEY}&session_id=${sessionId}`
    );
  }

  getAccountId(): Observable<AccountDetailsResponse> {
  let sessionId = localStorage.getItem('session_id');
  return this.http.get<AccountDetailsResponse>(
    `${API_BASE_URL}/account?api_key=${environment.API_KEY}&session_id=${sessionId}`
  );
  }
}

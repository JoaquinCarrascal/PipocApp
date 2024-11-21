import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../models/account-details.interface';

const API_KEY = "13eb21937668110c8a2635cf3e82ae51";
const API_BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<AccountDetailsResponse> {
    let sessionId = localStorage.getItem('session_id');
    return this.http.get<AccountDetailsResponse>(
      `${API_BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`
    );
  }

  //getAccountLists(): Observable<any> {
  //  let sessionId = localStorage.getItem('session_id');
  //  return this.http.get<any>(
  //    `${API_BASE_URL}/account/${localStorage.getItem('account_id')}/lists?api_key=${API_KEY}&session_id=${sessionId}`
  //  );
  //}
}

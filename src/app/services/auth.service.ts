import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRequestTokenResponse } from '../models/create-request-token.interface';
import { Observable } from 'rxjs';
import { CreateSessionResponse } from '../models/create-session-response.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}


  createRequestToken(): Observable<CreateRequestTokenResponse> {
    return this.http.get<CreateRequestTokenResponse>(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${environment.API_KEY}`
    );
  }


  createSession(): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${environment.API_KEY}`,
      {
        request_token: localStorage.getItem('token'),
      }
    );
  }

  checkUserIsLogged(): boolean {
    return localStorage.getItem('session_id') ? true : false
  }
  getSessionId(): string {
    return localStorage.getItem('session_id') || '';
  }  

}


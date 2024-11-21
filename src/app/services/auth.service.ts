import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRequestTokenResponse } from '../models/create-request-token.interface';
import { Observable } from 'rxjs';
import { CreateSessionResponse } from '../models/create-session-response.interface';

const API_KEY = "de28babb0baeed53e1255cd2b2bd2e15";
const API_BASE_URL = "https://api.themoviedb.org/3/movie";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // STEP 1
  createRequestToken(): Observable<CreateRequestTokenResponse> {
    return this.http.get<CreateRequestTokenResponse>(
      `${API_BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    );
  }

  // STEP 3
  createSession(): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(
      `${API_BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
      {
        request_token: localStorage.getItem('token'),
      }
    );
  }
}


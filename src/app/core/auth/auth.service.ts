import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(contex: LoginRequest): Observable<LoginResponse> {
    const uri = 'authenticate';

    return this.http.post<LoginResponse>(uri, contex);
  }

  getData() {
    const uri = 'account';

    return this.http.get(uri);
  }
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  id_token: string;
}

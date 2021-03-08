import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/shared/interfaces/account.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(contex: ILoginRequest): Observable<ILoginResponse> {
    const uri = 'authenticate';

    return this.http.post<ILoginResponse>(uri, contex);
  }

  getData(): Observable<IAccount> {
    const uri = 'account';

    return this.http.get<IAccount>(uri);
  }
}

export interface ILoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface ILoginResponse {
  id_token: string;
}

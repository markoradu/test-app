import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/shared/interfaces/account.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getAccount(id?: any): Observable<any> {
    const uri = id ? `account/${id}` : 'account';

    return this.http.get<IAccount>(uri);
  }

  uploadImages(form: any, query: any): Observable<any> {
    const uri = `user/upload-picture?coverPosition=${query.position}&type=${query.type}`;

    return this.http.post<any>(uri, form, {
      observe: 'events',
      reportProgress: true,
    });
  }
}

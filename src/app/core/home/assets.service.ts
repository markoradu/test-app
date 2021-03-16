import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private http: HttpClient) { }

  getFilters(url: string, type?: string): Observable<any> {
    let query: any = {};

    if (type === 'game') {
      query = {
        size: '10000'
      };
    }

    return this.http.get(url, {params: query});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private http: HttpClient) {}

  getlanguages(params: any = {}) {
    const uri = 'languages';

    return this.http.get(uri, { params });
  }
}

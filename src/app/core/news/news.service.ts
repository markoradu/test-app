import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/shared/interfaces/news.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(filter: any): Observable<any> {
    const uri = 'news';
    return this.http.get<any>(uri, { params: filter, observe: 'response' });
  }

  getGames(): Observable<any> {
    const uri = 'get-games-by-external-site/' + environment.externalSite;
    return this.http.get(uri);
  }
}

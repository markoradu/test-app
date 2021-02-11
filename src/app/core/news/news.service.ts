import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/shared/interfaces/news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(filter: any): Observable<any> {
    const uri = 'news';

    return this.http.get<News[]>(uri, { params: filter, observe: 'response' });
  }
}

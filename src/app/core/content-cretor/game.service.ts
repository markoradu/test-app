import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  getGames(params: any = {}): Observable<any> {
    const uri = 'get-games-by-external-site/' + environment.externalSite;

    return this.http.get(uri, { params });
  }
}

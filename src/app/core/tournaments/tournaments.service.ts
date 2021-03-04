import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private http: HttpClient) {}

  getTournaments(filter: any): Observable<any> {
    const uri = 'tournaments';
    return this.http.get<any>(uri, { params: filter, observe: 'response' });
  }

  getGames(): Observable<any> {
    const uri = 'get-games-by-external-site/' + environment.externalSite;
    return this.http.get(uri);
  }
}

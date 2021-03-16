import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamFinderService {
  mainFilters$: Subject<any> = new Subject<any>();
  advancedFilters$: Subject<any> = new Subject<any>();
  clearFilters$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  mainFiltersChanged(filters: any) {
    this.mainFilters$.next(filters);
  }

  advancedFiltersChanged(filters: any) {
    this.advancedFilters$.next(filters);
  }

  clearFilters() {
    this.clearFilters$.next();
  }

  getTypes() {
    const uri = 'team-finder-play-types';

    return this.http.get(uri);
  }

  getGameRoles(id: number) {
    const uri = `game-roles-by-game/${id}`;

    return this.http.get(uri);
  }

  getGameRanks(id: number) {
    const uri = `game-skills-by-game/${id}`;

    return this.http.get(uri);
  }

  addUserPost(data: any) {
    const uri = 'team-finder-user-post';
    return this.http.post(uri, data);
  }

  addTeamPost(data: any) {
    const uri = 'team-finder-team-post';
    return this.http.post(uri, data);
  }

  sendInvitesToJoin(form: any) {
    const uri = `team/send-invites`;

    return this.http.post(uri, form);
  }

  requestToJoinTeam(teamId: number) {
    const body = {
      teamId,
    };
    const uri = 'team-join-request';

    return this.http.post(uri, body);
  }

  teamFinderPostsOfATeam() {
    const uri = 'team-finder-posts-of-a-team';

    return this.http.get(uri, { observe: 'response' });
  }

  teamFinderPostsOfAUser() {
    const uri = 'team-finder-posts-of-a-user';

    return this.http.get(uri, { observe: 'response' });
  }

  teamFinderDeletePost(id: number) {
    const uri = `team-finder-posts/${id}`;

    return this.http.delete(uri);
  }

  updateTeamPost(post: any) {
    const uri = 'team-finder-team-post';

    return this.http.put(uri, post);
  }

  updateUserPost(post: any) {
    const uri = 'team-finder-user-post';

    return this.http.put(uri, post);
  }
}

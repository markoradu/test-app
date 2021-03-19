import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrophy, faNewspaper, faUser, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import * as AUTH from '../auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faTrophy = faTrophy;
  faNewspaper = faNewspaper;
  faUser = faUser;
  faLogout = faSignOutAlt;
  faUsers = faUsers;

  currentUser$: Observable<any> | undefined;

  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.currentUser$ = this.store.select(fromRoot.getCurrentUser);
  }

  logout(): void {
    this.store.dispatch(new AUTH.Unauthenticate());
    this.router.navigate(['']);
  }
}

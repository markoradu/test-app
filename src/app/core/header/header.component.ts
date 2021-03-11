import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { faTrophy, faNewspaper, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
=======
import { faTrophy, faNewspaper } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 2102932ed9b7773422f1e9495015dd550d4879ff
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
<<<<<<< HEAD
  faUser = faUser;
  faLogout = faSignOutAlt;

=======

  isAuthenticated$: Observable<boolean> | undefined;
>>>>>>> 2102932ed9b7773422f1e9495015dd550d4879ff
  currentUser$: Observable<any> | undefined;

  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
<<<<<<< HEAD
    this.currentUser$ = this.store.select(fromRoot.getCurrentUser);
=======
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.currentUser$ = this.store.select(fromRoot.getCurrentUser);
  }

  logout(): void {
    this.store.dispatch(new AUTH.Unauthenticate());
    this.router.navigate(['']);
>>>>>>> 2102932ed9b7773422f1e9495015dd550d4879ff
  }

  logout(): void {
    this.store.dispatch(new AUTH.Unauthenticate());
    this.router.navigate(['']);
  }
}

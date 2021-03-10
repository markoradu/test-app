import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrophy, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import * as AUTH from '../auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faTrophy = faTrophy;
  faNewspaper = faNewspaper;

  isAuthenticated$: Observable<boolean> | undefined;
  currentUser$: Observable<any> | undefined;

  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.currentUser$ = this.store.select(fromRoot.getCurrentUser);
  }

  logout(): void {
    this.store.dispatch(new AUTH.Unauthenticate());
    this.router.navigate(['']);
  }

}

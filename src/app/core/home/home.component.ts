import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import * as AUTH from '../auth/auth.actions'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAuthenticated$: Observable<boolean> | undefined;

  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  logout(): void {
    this.store.dispatch(new AUTH.Unauthenticate());
    this.router.navigate(['']);
  }
}

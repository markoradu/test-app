import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import * as AUTH from './core/auth/auth.actions';
import * as fromRoot from './app.reducer'
import { IAccount } from './shared/interfaces/account.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean> | undefined;

  constructor(private authService: AuthService,private store: Store<fromRoot.State>) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.authService.getData().subscribe((userData: IAccount) => {
        this.store.dispatch(new AUTH.Authenticate(userData));
      });
    }

    this.getAuthStatus();
  }

  getAuthStatus() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }
}

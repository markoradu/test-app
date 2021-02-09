import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import * as AUTH from './core/auth/auth.actions';
import { IAccount } from './shared/interfaces/account.model';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private store: Store) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.auth.getData().subscribe((userData: IAccount) => {
        this.store.dispatch(new AUTH.Authenticate(userData));
      });
    }
  }
}

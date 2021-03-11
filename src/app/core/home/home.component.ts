import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
<<<<<<< HEAD
=======
  isAuthenticated$: Observable<boolean> | undefined;

>>>>>>> 2102932ed9b7773422f1e9495015dd550d4879ff

  constructor() { }

  ngOnInit(): void {
<<<<<<< HEAD
  }

=======
    this.getAuthData();
  }

  getAuthData() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  logout(): void {
    this.store.dispatch(new AUTH.Unauthenticate());
    this.router.navigate(['']);
  }
>>>>>>> 2102932ed9b7773422f1e9495015dd550d4879ff
}

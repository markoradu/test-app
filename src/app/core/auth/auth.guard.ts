import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ProtectedUrl } from './auth.actions';
import * as fromRoot from '../../app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(fromRoot.getIsAuthenticated),
      take(1),
      map((isAuth: boolean) => {
        if (!isAuth) {
          this.router.navigate([]).then();
          this.store.dispatch(new ProtectedUrl(state?.url?.split('?')[0]));
        }
        return isAuth;
      })
    );
  }
}

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAuth from './core/auth/auth.reducer';

export interface State {
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  //@ts-ignore
  auth: fromAuth.authReducer,
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated
);
export const getCurrentUser = createSelector(
  getAuthState,
  fromAuth.getCurrentUser
);
export const getProtectedRoute = createSelector(
  getAuthState,
  fromAuth.getProtectedUrl
);

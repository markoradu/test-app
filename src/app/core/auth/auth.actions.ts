import { Action } from '@ngrx/store';
import { IAccount } from 'src/app/shared/interfaces/account.model';

export const AUTHENTICATE: string = '[Auth] Authenticate';
export const UNAUTHENTICATE: string = '[Auth] Unauthenticate';
export const PROTECTED_URL: string = '[Auth] Protected url';

export class Authenticate implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload: IAccount | null = null) {}
}

export class Unauthenticate implements Action {
  readonly type = UNAUTHENTICATE;

  constructor(public payload: IAccount | null = null) {}
}

export class ProtectedUrl implements Action {
  readonly type = PROTECTED_URL;

  constructor(public payload: string | null = null) {}
}

export type AuthActions = Authenticate | Unauthenticate | ProtectedUrl;

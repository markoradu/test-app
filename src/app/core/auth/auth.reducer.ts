import { IAccount } from 'src/app/shared/interfaces/account.model';
import {
  AuthActions,
  AUTHENTICATE,
  UNAUTHENTICATE,
  PROTECTED_URL,
} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  currentUser?: IAccount | null;
  protectedUrl: string | null;
}

const initialState: State = {
  isAuthenticated: false,
  currentUser: null,
  protectedUrl: null,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions
): State {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload as IAccount,
        protectedUrl: null,
      };
    case UNAUTHENTICATE: {
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };
    }

    case PROTECTED_URL: {
      return {
        ...state,
        protectedUrl: action?.payload as string,
      };
    }

    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getCurrentUser = (state: State) => state.currentUser;
export const getProtectedUrl = (state: State) => state.protectedUrl;

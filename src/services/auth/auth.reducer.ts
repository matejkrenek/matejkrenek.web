import { User } from 'types/user.type';

export enum AuthActionTypes {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

export type AuthState = {
  user?: User;
  errors?: {};
  isLoading?: boolean;
};

type AuthAction = {
  type: AuthActionTypes;
  payload?: any;
};

const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    case AuthActionTypes.ERROR:
      return { ...state, errors: action.payload.errors };
    case AuthActionTypes.REGISTER:
      return { ...state, user: action.payload.user };
    case AuthActionTypes.LOGIN:
      return { ...state, user: action.payload.user };
    case AuthActionTypes.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default AuthReducer;

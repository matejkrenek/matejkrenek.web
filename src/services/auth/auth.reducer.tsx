import { User } from 'types/user.type';

enum AuthActionTypes {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

export type AuthState = {
  user?: User | null;
};

type AuthAction = {
  type: AuthActionTypes;
  payload: any;
};

const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.REGISTER:
      return { user: action.payload };
    case AuthActionTypes.LOGIN:
      return { user: action.payload };
    case AuthActionTypes.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export default AuthReducer;

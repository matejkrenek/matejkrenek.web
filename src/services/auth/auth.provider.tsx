import { AuthApi } from 'api/auth/auth.api';
import { AuthLoginRequest, AuthRegisterRequest } from 'api/auth/auth.types';
import { api } from 'config/api.config';
import React from 'react';
import CookieService from 'services/cookie.service';
import { ApiResponse } from 'types/api.types';
import AuthReducer, { AuthActionTypes } from './auth.reducer';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextState = {
  user: () => any;
  isLoading: () => any;
  errors: () => any;
  authorize: () => any;
  register: (request: AuthRegisterRequest) => any;
  login: (request: AuthLoginRequest) => any;
  logout: () => any;
};

export const AuthContext = React.createContext<AuthContextState>({
  user: () => false,
  isLoading: () => true,
  errors: () => false,
  authorize: () => false,
  register: () => false,
  login: () => false,
  logout: () => false,
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [store, dispatch] = React.useReducer(AuthReducer, { user: null, isLoading: false, errors: {} });

  const user = () => {
    return store.user;
  };

  const isLoading = () => {
    return store.isLoading;
  };

  const errors = () => {
    return store.errors;
  };

  const authorize = async () => {
    const access_token = CookieService.get('access_token');

    if (access_token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      dispatch({
        type: AuthActionTypes.LOADING,
        payload: {
          isLoading: true,
        },
      });

      const { status, data, errors }: ApiResponse = await AuthApi.me();

      switch (status) {
        case 422:
          dispatch({
            type: AuthActionTypes.ERROR,
            payload: {
              errors: errors,
            },
          });
          break;
        default:
          dispatch({
            type: AuthActionTypes.LOGIN,
            payload: {
              user: data.data,
            },
          });
      }

      dispatch({
        type: AuthActionTypes.LOADING,
        payload: {
          isLoading: false,
        },
      });
    }
  };

  const register = async (request: AuthRegisterRequest) => {
    dispatch({
      type: AuthActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });

    const response: ApiResponse = await AuthApi.register(request);

    console.log(response);

    dispatch({
      type: AuthActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  };

  const login = async (request: AuthLoginRequest) => {
    dispatch({
      type: AuthActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });

    const { status, data, errors }: ApiResponse = await AuthApi.login(request);

    switch (status) {
      case 422:
        dispatch({
          type: AuthActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      default:
        dispatch({
          type: AuthActionTypes.LOGIN,
          payload: {
            user: data.data,
          },
        });

        CookieService.set('access_token', data.data.token, { path: '/' });
        api.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
    }

    dispatch({
      type: AuthActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  };

  const logout = async () => {
    dispatch({
      type: AuthActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });

    const { status, errors }: ApiResponse = await AuthApi.logout();

    switch (status) {
      case 422:
        dispatch({
          type: AuthActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      default:
        dispatch({
          type: AuthActionTypes.LOGOUT,
        });

        CookieService.remove('access_token');
        delete api.defaults.headers.common['Authorization'];
    }

    dispatch({
      type: AuthActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  };

  return <AuthContext.Provider value={{ user, isLoading, errors, authorize, register, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

import { AuthApi } from 'api/auth/auth.api';
import { AuthLoginRequest, AuthRegisterRequest } from 'api/auth/auth.types';
import React from 'react';
import { ApiResponse } from 'types/api.types';
import AuthReducer, { AuthState } from './auth.reducer';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextState = {
  user: () => any;
  register: (request: AuthRegisterRequest) => any;
  login: (request: AuthLoginRequest) => any;
  logout: () => any;
};

export const AuthContext = React.createContext<AuthContextState>({
  user: () => true,
  register: () => true,
  login: () => true,
  logout: () => true,
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [store, dispatch] = React.useReducer(AuthReducer, { user: null });

  const user = () => {
    return store.user;
  };

  const register = async (request: AuthRegisterRequest) => {
    const response: ApiResponse = await AuthApi.register(request);
  };

  const login = async (request: AuthLoginRequest) => {
    const response: ApiResponse = await AuthApi.login(request);
  };

  const logout = async () => {
    const response: ApiResponse = await AuthApi.logout();
  };

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

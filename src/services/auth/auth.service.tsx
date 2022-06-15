import React from 'react';
import { Location, Navigate, useLocation } from 'react-router-dom';
import AuthProvider, { AuthContext } from './auth.provider';

export namespace AuthService {
  export const Provider = AuthProvider;

  export const useContext = () => {
    return React.useContext(AuthContext);
  };

  export const Guest: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    let auth = useContext();
    let location: Location = useLocation();
    let state = location.state as { from: Location };

    if (auth.user() && !auth.isLoading()) {
      if (!state || state.from.pathname === '/login' || state.from.pathname === '/register') return <Navigate to={'/'} state={{ from: location }} replace />;
      return <Navigate to={state.from.pathname} state={{ from: location }} replace />;
    }

    return children;
  };

  export const Authorized: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    let auth = useContext();
    let location = useLocation();

    if (!auth.user() && !auth.isLoading()) return <Navigate to={'/login'} state={{ from: location }} replace />;

    return children;
  };
}

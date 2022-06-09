import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Navbar from 'components/Navbar/Navbar';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import { AuthService } from 'services/auth/auth.service';
import { useEffect } from 'react';
import Kanban from 'pages/Kanban/Kanban';

const App: React.FC = () => {
  const auth = AuthService.useContext();

  useEffect(() => {
    const authorize = async () => await auth.authorize();
    authorize();
  }, []);

  return (
    <>
      {auth.user() && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <AuthService.Authorized>
              <Home />
            </AuthService.Authorized>
          }
        />
        <Route
          path="/:slug"
          element={
            <AuthService.Authorized>
              <Kanban />
            </AuthService.Authorized>
          }
        />
        <Route
          path="/login"
          element={
            <AuthService.Guest>
              <Login />
            </AuthService.Guest>
          }
        />
        <Route
          path="/register"
          element={
            <AuthService.Guest>
              <Register />
            </AuthService.Guest>
          }
        />
      </Routes>
    </>
  );
};

export default App;

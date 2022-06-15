import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Navbar from 'components/Navbar/Navbar';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import { AuthService } from 'services/auth/auth.service';
import { useEffect } from 'react';
import Board from 'pages/Board/Board';
import { KanbanService } from 'services/kanban/kanban.service';

const App: React.FC = () => {
  const auth = AuthService.useContext();

  useEffect(() => {
    const authorize = async () => await auth.authorize();
    authorize();
  }, []);

  useEffect(() => {
    if (auth.isAuthorizing()) {
      document.querySelector('body')?.classList.add('is-loading');
    } else {
      document.querySelector('body')?.classList.remove('is-loading');
    }
  }, [auth.isAuthorizing]);

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
          path="/:id"
          element={
            <AuthService.Authorized>
              <KanbanService.Provider>
                <Board />
              </KanbanService.Provider>
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

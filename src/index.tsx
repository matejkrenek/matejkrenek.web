import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';
import 'styles/index.scss';
import { AuthService } from 'services/auth/auth.service';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthService.Provider>
        <App />
      </AuthService.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

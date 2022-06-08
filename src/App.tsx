import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Navbar from 'components/Navbar/Navbar';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import { AuthService } from 'services/auth/auth.service';

const App: React.FC = () => {
  return (
    <AuthService.Provider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthService.Provider>
  );
};

export default App;

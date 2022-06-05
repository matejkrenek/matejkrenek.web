import { Routes, Route } from 'react-router-dom';

import Kanban from 'pages/Home/Home';
import Navbar from 'components/Navbar/Navbar';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Kanban />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;

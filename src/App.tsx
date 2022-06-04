import { Routes, Route } from 'react-router-dom';

import Kanban from 'pages/Home/Home';
import Navbar from 'components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Kanban />} />
      </Routes>
    </>
  );
};

export default App;

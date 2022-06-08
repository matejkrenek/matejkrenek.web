import React from 'react';

import { FiEdit2, FiPlus } from 'react-icons/fi';

import AvatarList from 'components/Avatar/AvatarList';
import './Home.styles.scss';
import Kanban from 'components/Kanban/Kanban';
import Button from 'components/Button/Button';
import { AuthService } from 'services/auth/auth.service';

const Home: React.FC = () => {
  const auth = AuthService.useContext();

  console.log(auth.user());

  return (
    <main className="container">
      <header className="header">
        <div className="d-flex align-center">
          <h1 className="mr-18">f</h1>
          <Button icon={<FiEdit2 />} type="purple" className="mt-4" />
        </div>
        <div className="d-flex align-center">
          <Button icon={<FiPlus />} type="purple" size="small" className="mr-12">
            Invite
          </Button>
          <AvatarList avatars={} limit={} />
        </div>
      </header>
      <Kanban columns={} setColumns={} />
    </main>
  );
};

export default Home;

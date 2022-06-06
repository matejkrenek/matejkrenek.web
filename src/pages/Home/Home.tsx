import React, { useEffect, useState } from 'react';

import { UserAvatar } from 'types/user.type';
import { IKanban, IKanbanColumn } from 'types/kanban.type';
import { FiEdit2, FiPlus } from 'react-icons/fi';

import AvatarList from 'components/Avatar/AvatarList';
import './Home.styles.scss';
import Kanban from 'components/Kanban/Kanban';
import Button from 'components/Button/Button';
import { AuthApi } from 'api/auth/auth.api';

const Home: React.FC = () => {
  const [columns, setColumns] = useState<IKanbanColumn[]>([
    {
      name: 'To Do',
      color: '#5030E5',
      order: 1,
    },
    {
      name: 'On Progress',
      color: '#FFA500',
      order: 2,
    },
    {
      name: 'Done',
      color: '#8BC48A',
      order: 3,
    },
  ]);

  const avatars: UserAvatar[] = [
    {
      inicials: 'FS',
    },
    {
      inicials: 'MK',
    },
    {
      inicials: 'VV',
      image: 'https://i.pravatar.cc/300?img=3',
    },
  ];

  const kanban: IKanban = {
    id: 1,
    name: 'Kanban name',
    columns: columns,
  };

  useEffect(() => {
    const register = async () => {
      console.log(
        await AuthApi.register({
          username: 'matejkrenek',
          email: 'mate23.krenek@gmail.com',
          password: '123456789matej',
          password_confirmation: '123456789matej',
        })
      );
    };
    register();
  }, []);

  return (
    <main className="container">
      <header className="header">
        <div className="d-flex align-center">
          <h1 className="mr-18">{kanban.name}</h1>
          <Button icon={<FiEdit2 />} type="purple" className="mt-4" />
        </div>
        <div className="d-flex align-center">
          <Button icon={<FiPlus />} type="purple" size="small" className="mr-12">
            Invite
          </Button>
          <AvatarList avatars={avatars} limit={4} />
        </div>
      </header>
      <Kanban columns={columns} setColumns={setColumns} />
    </main>
  );
};

export default Home;

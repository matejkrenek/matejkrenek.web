import { UserAvatar } from 'types/user.type';
import { IKanban } from 'types/kanban.type';

import AvatarList from 'components/Avatar/AvatarList';
import './Home.styles.scss';
import Kanban from 'components/Kanban/Kanban';

const Home: React.FC = () => {
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
    columns: [
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
    ],
  };

  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>{kanban.name}</h1>
        </div>
        <div>
          <AvatarList avatars={avatars} limit={4} />
        </div>
      </header>
      <Kanban columns={kanban.columns} />
    </main>
  );
};

export default Home;

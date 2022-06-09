import { KanbanApi } from 'api/kanban/kanban.api';
import React, { useEffect } from 'react';
import { KanbanService } from 'services/kanban/kanban.service';
import { IKanban } from 'types/kanban.types';

import './Home.styles.scss';

const Home: React.FC = () => {
  const kanban = KanbanService.useContext();

  useEffect(() => {}, []);

  return (
    <main className="container">
      <header className="header">
        <div className="d-flex align-center">
          <h1 className="mr-18">Všechny kanbany</h1>
        </div>
      </header>
      <div className="kanbanCard__list">
        <div className="kanbanCard">
          <h4 className="mb-8">Kanban for test</h4>
          <p className="text--muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet perspiciatis minus quos.</p>
        </div>
      </div>
    </main>
  );
};

export default Home;

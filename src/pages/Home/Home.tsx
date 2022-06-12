import { KanbanApi } from 'api/kanban/kanban.api';
import AvatarList from 'components/Avatar/AvatarList';
import React, { useEffect } from 'react';
import { FiCheckSquare, FiColumns } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { KanbanActionTypes } from 'services/kanban/kanban.reducer';
import { KanbanService } from 'services/kanban/kanban.service';
import { IKanban } from 'types/kanban.types';

import './Home.styles.scss';

const Home: React.FC = () => {
  const [store, dispatch] = KanbanService.useReducer();

  async function kanbans() {
    dispatch({
      type: KanbanActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });
    const { status, errors, data } = await KanbanApi.getAll();

    switch (status) {
      case 422:
        dispatch({
          type: KanbanActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanActionTypes.SETALL,
          payload: {
            kanbans: data.data,
          },
        });
    }

    dispatch({
      type: KanbanActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  }

  useEffect(() => {
    kanbans();
  }, []);

  return (
    <main className="container">
      <header className="header">
        <div className="d-flex align-center">
          <h1 className="mr-18">Všechny kanbany</h1>
        </div>
      </header>
      <div className="kanbanCard__list">
        {store.isLoading
          ? '...loading'
          : store.kanbans
          ? store.kanbans.map((kanban: IKanban, index: number) => (
              <Link key={index} to={kanban.id.toString()} className="kanbanCard">
                <h4 className="mb-8">{kanban.name}</h4>
                <p className="text--muted">{kanban.description ? kanban.description : 'Žádný popis'}</p>
                <div className="d-flex justify-between align-center mt-16">
                  <AvatarList users={kanban.members} limit={3} size="small" />
                  <div className="d-flex">
                    <div className="d-flex align-center mr-12 text--muted">
                      <FiColumns className="mr-4" />
                      <span>{kanban.columns_count} sloupců</span>
                    </div>
                    <div className="d-flex align-center text--muted">
                      <FiCheckSquare className="mr-4" />
                      <span>{kanban.tasks_count} úkolů</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : 'empty'}
      </div>
    </main>
  );
};

export default Home;

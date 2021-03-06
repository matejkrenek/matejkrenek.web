import AvatarList from 'components/Avatar/AvatarList';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Kanban from 'components/Kanban/Kanban';
import React, { createRef, useEffect, useState } from 'react';
import { FiCheck, FiEdit2 } from 'react-icons/fi';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { ColumnService } from 'services/column/column.service';
import { KanbanService } from 'services/kanban/kanban.service';
import { TaskService } from 'services/task/task.service';

const Board: React.FC = () => {
  const kanban = KanbanService.useContext();

  const { id } = useParams();
  const nameInput = createRef<HTMLInputElement>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [kanbanName, setKanbanName] = useState<string>('');
  const location = useLocation();

  async function getKanban() {
    if (id) {
      await kanban.loadKanban(parseInt(id));
    }
  }

  function startEdit() {
    setKanbanName(kanban.get().name);
    setIsEditing(true);
  }

  async function editName() {
    await kanban.edit(kanban.get().id, {
      name: kanbanName,
    });
    await setIsEditing(false);
  }

  useEffect(() => {
    getKanban();
  }, []);

  useEffect(() => {
    nameInput.current?.focus();
  }, [isEditing]);

  return (
    <main className={`container ${kanban.isLoading() ? 'is-loading' : ''}`}>
      {kanban.isLoading() ? (
        <></>
      ) : kanban.get() ? (
        <>
          <header className="header">
            <div className="d-flex align-center">
              {isEditing ? (
                <Input ref={nameInput} type="text" name="name" className="mr-18" value={kanbanName} onChange={(e) => setKanbanName(e.target.value)} />
              ) : (
                <h1 className="mr-18">{kanban.get().name}</h1>
              )}
              <Button icon={isEditing ? <FiCheck /> : <FiEdit2 />} type="purple" className="mt-4" onClick={isEditing ? editName : startEdit} />
            </div>
            <div className="d-flex align-center">
              <AvatarList users={kanban.get().members} limit={3} />
            </div>
          </header>
          <ColumnService.Provider>
            <TaskService.Provider>
              <Kanban kanban={kanban.get()} />
            </TaskService.Provider>
          </ColumnService.Provider>
        </>
      ) : (
        <Navigate to={'/'} state={{ from: location }} replace />
      )}
    </main>
  );
};

export default Board;

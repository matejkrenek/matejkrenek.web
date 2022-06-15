import { FiPlus } from 'react-icons/fi';
import { IKanban, IKanbanColumn } from 'types/kanban.types';

import KanbanColumn from './KanbanColumn';
import './Kanban.styles.scss';
import Button from 'components/Button/Button';
import React, { FormEvent, useEffect, useState } from 'react';
import { ColumnService } from 'services/column/column.service';
import Input from 'components/Input/Input';
import { TaskService } from 'services/task/task.service';

type KanbanProps = {
  kanban: IKanban;
};

const Kanban: React.FC<KanbanProps> = ({ kanban }) => {
  const column = ColumnService.useContext();
  const task = TaskService.useContext();

  const [isCreating, setIsCreating] = useState(false);
  const [columnName, setColumnName] = useState('');

  async function getColumns() {
    await column.loadColumns(kanban.id);
  }
  async function getTasks() {
    await task.loadTasks(kanban.id);
  }

  async function addColumn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await column.add(kanban.id, { name: columnName });
    setColumnName('');
    setIsCreating(false);
  }

  useEffect(() => {
    getColumns();
    getTasks();
  }, []);

  return (
    <>
      <div className="kanban">
        {column.all() && column.all().map((column: IKanbanColumn, index: number) => <KanbanColumn key={index} column={column} />)}
        {isCreating ? (
          <form onSubmit={addColumn}>
            <Input type="text" size="small" name="column_name" className="mb-8" value={columnName} onChange={(e) => setColumnName(e.target.value)} />
            <div className="d-flex">
              <Button type="regular" size="small" className="w-50 mr-4" onClick={() => setIsCreating(false)}>
                Zrušit
              </Button>
              <Button type="primary" size="small" className="w-50 ml-4">
                Vytvořit
              </Button>
            </div>
          </form>
        ) : (
          <Button icon={<FiPlus />} type="regular" onClick={() => setIsCreating(true)}>
            Add column
          </Button>
        )}
      </div>
    </>
  );
};

export default Kanban;

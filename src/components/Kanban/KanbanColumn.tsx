import { useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { IKanbanColumn, IKanbanTask } from 'types/kanban.types';

import KanbanTask from './KanbanTask';
import Button from 'components/Button/Button';
import './KanbanColumn.styles.scss';
import { ColumnService } from 'services/column/column.service';

type KanbanColumnProps = {
  column: IKanbanColumn;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  const _column = ColumnService.useContext();

  async function removeColumn() {
    await _column.remove(column.kanban_id, column.id);
  }

  return (
    <div className="kanbanColumn">
      <header className="kanbanColumn__header">
        <div className="d-flex align-center">
          <span className="bubble bubble--small mr-8" style={{ backgroundColor: column.color }}></span>
          <h5>{column.name}</h5>
          {/* {tasks && <span className="bubble ml-12">{tasks.length}</span>} */}
        </div>
        <div className="kanbanTask__add d-flex">
          <Button icon={<FiPlus />} size="medium" />
          <Button icon={<FiTrash />} size="medium" className="ml-8" onClick={removeColumn} />
        </div>
      </header>
      <hr className="mx-20" style={{ backgroundColor: column.color }} />
      <main className="kanbanColumn__content">
        {/* {tasks?.map((task: IKanbanTask, index: number) => (
          <KanbanTask key={index} task={task} />
        ))} */}
      </main>
    </div>
  );
};

export default KanbanColumn;

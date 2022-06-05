import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IKanbanColumn, IKanbanTask } from 'types/kanban.type';

import KanbanTask from './KanbanTask';
import Button from 'components/Button/Button';
import './KanbanColumn.styles.scss';

type KanbanColumnProps = {
  column: IKanbanColumn;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  const [tasks, setTasks] = useState<IKanbanTask[]>([]);

  function addTask() {
    setTasks([
      ...tasks,
      {
        name: `task #${tasks?.length + 1}`,
        priority: 'normal',
        comments: 0,
        files: 0,
        members: [
          {
            inicials: 'FS',
          },
          {
            inicials: 'MK',
          },
        ],
      },
    ]);
  }

  return (
    <div className="kanbanColumn">
      <header className="kanbanColumn__header">
        <div className="d-flex align-center">
          <span className="bubble bubble--small mr-8" style={{ backgroundColor: column.color }}></span>
          <h5>{column.name}</h5>
          {tasks && <span className="bubble ml-12">{tasks.length}</span>}
        </div>
        <div className="kanbanTask__add">
          <Button icon={<FiPlus />} size="medium" onClick={addTask} />
        </div>
      </header>
      <hr className="mx-20" style={{ backgroundColor: column.color }} />
      <main className="kanbanColumn__content">
        {tasks?.map((task: IKanbanTask, index: number) => (
          <KanbanTask key={index} task={task} />
        ))}
      </main>
    </div>
  );
};

export default KanbanColumn;

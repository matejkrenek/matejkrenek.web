import { IKanbanColumn } from 'types/kanban.type';

import './KanbanColumn.styles.scss';

type KanbanColumnProps = {
  column: IKanbanColumn;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  return (
    <div className="kanbanColumn">
      <header className="kanbanColumn__header">
        <div className="d-flex align-center">
          <span className="bubble bubble--small mr-8" style={{ backgroundColor: column.color }}></span>
          <h5>{column.name}</h5>
          <span className="bubble ml-12">4</span>
        </div>
      </header>
      <hr className="mt-20 mb-28" style={{ backgroundColor: column.color }} />
      <main></main>
    </div>
  );
};

export default KanbanColumn;

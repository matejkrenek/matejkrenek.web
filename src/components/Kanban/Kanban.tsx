import { IKanbanColumn } from 'types/kanban.type';

import KanbanColumn from './KanbanColumn';
import './Kanban.styles.scss';

type KanbanProps = {
  columns: IKanbanColumn[] | [];
};

const Kanban: React.FC<KanbanProps> = ({ columns }) => {
  return (
    <div className="kanban">
      {columns.map((column: IKanbanColumn, index: number) => (
        <KanbanColumn key={index} column={column} />
      ))}
    </div>
  );
};

export default Kanban;

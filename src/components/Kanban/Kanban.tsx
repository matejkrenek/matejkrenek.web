import { FiPlus } from 'react-icons/fi';
import { IKanbanColumn } from 'types/kanban.types';

import KanbanColumn from './KanbanColumn';
import './Kanban.styles.scss';
import Button from 'components/Button/Button';
import React from 'react';

type KanbanProps = {
  columns: IKanbanColumn[];
  setColumns: React.Dispatch<React.SetStateAction<IKanbanColumn[]>>;
};

const Kanban: React.FC<KanbanProps> = ({ columns, setColumns }) => {
  function addColumn() {
    setColumns([
      ...columns,
      {
        name: `column #${columns.length + 1}`,
        order: columns.length + 1,
      },
    ]);
  }

  return (
    <div className="kanban">
      {columns && columns.map((column: IKanbanColumn, index: number) => <KanbanColumn key={index} column={column} />)}
      <Button icon={<FiPlus />} type="regular" onClick={addColumn}>
        Add column
      </Button>
    </div>
  );
};

export default Kanban;

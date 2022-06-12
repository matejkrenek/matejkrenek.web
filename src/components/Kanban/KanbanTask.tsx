import AvatarBubble from 'components/Avatar/AvatarBubble';
import AvatarList from 'components/Avatar/AvatarList';
import { FiCalendar, FiFile, FiMessageCircle } from 'react-icons/fi';
import { IKanbanTask } from 'types/kanban.types';

import './KanbanTask.styles.scss';

type KanbanTaskProps = {
  task: IKanbanTask;
};

const KanbanTask: React.FC<KanbanTaskProps> = ({ task }) => {
  return (
    <div className="kanbanTask">
      <div className="mb-8">
        <span className={`badge`}>{task.column.name}</span>
      </div>
      <h4 className="mb-8">{task.name}</h4>
      <p>{task.description}</p>
      <div className="d-flex align-center justify-between mt-16">
        {task.executor ? <AvatarBubble user={task.executor} size="small" /> : <div></div>}
        <div className="d-flex">
          <div className="d-flex align-center text--muted">
            <FiCalendar className="mr-4" />
            <span>{task.created_at}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanTask;

import { FiFile, FiMessageCircle } from 'react-icons/fi';
import { IKanbanTask } from 'types/kanban.types';

import AvatarList from 'components/Avatar/AvatarList';
import './KanbanTask.styles.scss';

type KanbanTaskProps = {
  task: IKanbanTask;
};

const KanbanTask: React.FC<KanbanTaskProps> = ({ task }) => {
  return (
    <div className="kanbanTask">
      <div className="mb-8">
        <span className={`badge badge--${task.priority === 'high' ? 'red' : task.priority === 'low' ? 'orange' : 'green'}`}>{task.priority}</span>
      </div>
      <h4 className="mb-8">{task.name}</h4>
      <p>{task.description}</p>
      <div className="d-flex align-center justify-between mt-16">
        <AvatarList avatars={task.members} limit={4} size="small" />
        <div className="d-flex">
          <div className="d-flex align-center mr-12 text--muted">
            <FiMessageCircle className="mr-4" />
            <span>{task.comments} comments</span>
          </div>
          <div className="d-flex align-center text--muted">
            <FiFile className="mr-4" />
            <span>{task.files} files</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanTask;

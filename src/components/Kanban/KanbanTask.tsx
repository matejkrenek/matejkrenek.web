import { KanbanTaskRequest } from 'api/kanban/kanban.types';
import AvatarBubble from 'components/Avatar/AvatarBubble';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import Select from 'components/Select/Select';
import Textarea from 'components/Textarea/Textarea';
import { FormEvent, useState } from 'react';
import { FiCalendar, FiEdit2, FiTrash, FiX } from 'react-icons/fi';
import { KanbanService } from 'services/kanban/kanban.service';
import { TaskService } from 'services/task/task.service';
import { IKanbanTask } from 'types/kanban.types';
import { User } from 'types/user.type';

import './KanbanTask.styles.scss';

type KanbanTaskProps = {
  task: IKanbanTask;
};

const KanbanTask: React.FC<KanbanTaskProps> = ({ task }) => {
  const _task = TaskService.useContext();
  const kanban = KanbanService.useContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskForm, setTaskForm] = useState<KanbanTaskRequest>({
    name: task.name,
    description: task.description,
    executor_id: task.executor?.id,
    column_id: task.column.id,
  });

  async function removeTask() {
    await _task.remove(task);
    await setIsOpen(false);
  }

  async function editTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await _task.edit(task, taskForm);
    await setIsEditing(false);
  }

  function startEdit() {
    setIsOpen(false);
    setIsEditing(true);
  }

  return (
    <>
      <div className="kanbanTask" onClick={() => setIsOpen(true)}>
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
      {isOpen && (
        <Modal>
          <div className="p-16">
            <div className="d-flex align-center justify-end mb-8">
              <Button icon={<FiTrash />} size="medium" className="ml-8" onClick={removeTask} />
              <Button icon={<FiEdit2 />} size="medium" className="ml-8" onClick={startEdit} />
              <Button icon={<FiX />} size="medium" className="ml-8" onClick={(e) => setIsOpen(false)} />
            </div>
            <div>
              <h2 className="mb-12">{task.name}</h2>
              <p className="text--muted">{task.description ? task.description : 'Žádný popis'}</p>
            </div>
            <hr className="mt-24 mb-24" />
            <div>
              <div className="text--muted mb-8 d-flex align-center">
                <strong className="text--dark mr-4">Datum vytvoření:</strong>
                <div className="d-flex align-center text--muted">
                  <FiCalendar className="mr-4" />
                  <span>{task.created_at}</span>
                </div>
              </div>
              <p className="text--muted mb-8 d-flex align-center">
                <strong className="text--dark mr-4">Stav:</strong> <span className="badge badge--tiny">{task.column.name}</span>
              </p>
              <div className="text--muted mb-8 d-flex align-center">
                <strong className="text--dark mr-4">Zadavatel:</strong>{' '}
                <div className="d-flex align-center">
                  <AvatarBubble user={task.author} size="small" />
                  <span className="text--dark ml-4">{task.author?.username}</span>
                </div>
              </div>
              <div className="text--muted mb-8 d-flex align-center">
                <strong className="text--dark mr-4">Rešitel:</strong>{' '}
                {task.executor ? (
                  <span className="d-flex align-center">
                    <AvatarBubble user={task.executor} size="small" />
                    <span className="text--dark ml-4">{task.executor?.username}</span>
                  </span>
                ) : (
                  <>Žádný</>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
      {isEditing && (
        <Modal header={<h3>Upravení tasku</h3>}>
          <form onSubmit={editTask}>
            <div className="d-flex mb-16">
              <Input type="text" name="task_name" label="Název" className="mr-8" size="medium" value={taskForm.name} onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })} />
              <Select
                name="task_executor"
                label="Rešitel"
                className="ml-8"
                size="medium"
                value={taskForm.executor_id?.toString()}
                onChange={(e) => setTaskForm({ ...taskForm, executor_id: parseInt(e.target.value) })}
              >
                <option value="" disabled selected></option>
                {kanban.get().members.map((member: User, index: number) => (
                  <option key={index} value={member.id}>
                    {member.username}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mb-16">
              <Textarea name="task_executor" label="Popis" size="medium" value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} />
            </div>
            <div className="d-flex justify-between">
              <Button type="regular" size="small" onClick={() => setIsEditing(false)}>
                Zrušit
              </Button>
              <Button type="primary" size="small">
                {_task.isAdding() ? '...loading' : 'Upravit'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default KanbanTask;

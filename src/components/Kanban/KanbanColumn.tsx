import { createRef, FormEvent, useEffect, useState } from 'react';
import { FiCheck, FiX, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { IKanbanColumn, IKanbanTask } from 'types/kanban.types';

import KanbanTask from './KanbanTask';
import Button from 'components/Button/Button';
import './KanbanColumn.styles.scss';
import { ColumnService } from 'services/column/column.service';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import Textarea from 'components/Textarea/Textarea';
import Select from 'components/Select/Select';
import { KanbanService } from 'services/kanban/kanban.service';
import { User } from 'types/user.type';
import { TaskService } from 'services/task/task.service';
import { KanbanTaskRequest } from 'api/kanban/kanban.types';

type KanbanColumnProps = {
  column: IKanbanColumn;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  const _column = ColumnService.useContext();
  const kanban = KanbanService.useContext();
  const task = TaskService.useContext();

  const nameInput = createRef<HTMLInputElement>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>('');
  const [taskForm, setTaskForm] = useState<KanbanTaskRequest>({
    name: '',
    description: '',
    executor_id: undefined,
  });

  function startEdit() {
    setColumnName(column.name);
    setIsEditing(true);
  }

  async function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await task.add(column.kanban_id, {
      ...taskForm,
      column_id: column.id,
    });
    await setIsCreating(false);
    await setTaskForm({
      name: '',
      description: '',
      executor_id: undefined,
    });
  }

  async function removeColumn() {
    await _column.remove(column.kanban_id, column.id);
  }

  async function editColumn() {
    await _column.edit(column.kanban_id, column.id, { name: columnName });
    await setIsEditing(false);
  }

  useEffect(() => {
    nameInput.current?.focus();
  }, [isEditing]);

  return (
    <div className="kanbanColumn">
      <header className="kanbanColumn__header">
        <div className="d-flex align-center">
          {isEditing ? (
            <Input ref={nameInput} type="text" name="name" size="small" value={columnName} onChange={(e) => setColumnName(e.target.value)} />
          ) : (
            <>
              <span className="bubble bubble--small mr-8" style={{ backgroundColor: column.color }}></span>
              <h5>{column.name}</h5>
            </>
          )}
          {/* {tasks && <span className="bubble ml-12">{tasks.length}</span>} */}
        </div>
        <div className="kanbanTask__add d-flex">
          {isEditing ? (
            <>
              <Button icon={<FiCheck />} size="medium" className="ml-8" onClick={editColumn} />
              <Button icon={<FiX />} size="medium" className="ml-8" onClick={() => setIsEditing(false)} />
            </>
          ) : (
            <>
              <Button icon={<FiPlus />} size="medium" className="ml-8" onClick={() => setIsCreating(true)} />
              <Button icon={<FiEdit2 />} size="medium" className="ml-8" onClick={startEdit} />
              <Button icon={<FiTrash />} size="medium" className="ml-8" onClick={removeColumn} />
            </>
          )}
          {isCreating && (
            <Modal header={<h3>Vytvoření tasku</h3>}>
              <form onSubmit={addTask}>
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
                  <Button type="regular" size="small" onClick={() => setIsCreating(false)}>
                    Zrušit
                  </Button>
                  <Button type="primary" size="small">
                    {task.isAdding() ? '...loading' : 'Vytvořit'}
                  </Button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      </header>
      <hr className="mx-20" style={{ backgroundColor: column.color }} />
      <main className={`kanbanColumn__content ${task.isLoading() ? 'is-loading' : ''}`}>
        {task.whereColumn(column.id).map((task: IKanbanTask, index: number) => (
          <KanbanTask key={index} task={task} />
        ))}
      </main>
    </div>
  );
};

export default KanbanColumn;

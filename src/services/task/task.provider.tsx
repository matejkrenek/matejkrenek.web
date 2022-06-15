import { KanbanApi } from 'api/kanban/kanban.api';
import { KanbanTaskRequest } from 'api/kanban/kanban.types';
import React from 'react';
import { ApiResponse } from 'types/api.types';
import { IKanbanTask } from 'types/kanban.types';
import TaskReducer, { KanbanTaskActionTypes } from './task.reducer';

type TaskProviderProps = {
  children: React.ReactNode;
};

type TaskContextState = {
  add: (kanbanId: number, request: KanbanTaskRequest) => any;
  edit: (task: IKanbanTask, request: KanbanTaskRequest) => any;
  remove: (task: IKanbanTask) => any;
  whereColumn: (columnId: number) => any;
  isLoading: () => any;
  isAdding: () => any;
  errors: () => any;
  loadTasks: (kanbanId: number) => void;
};

export const TaskContext = React.createContext<TaskContextState>({
  add: () => false,
  edit: () => false,
  remove: () => false,
  whereColumn: () => [],
  isLoading: () => false,
  isAdding: () => false,
  errors: () => false,
  loadTasks: () => false,
});

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [store, dispatch] = React.useReducer(TaskReducer, { tasks: [], isLoading: true, errors: [] });

  const isLoading = () => store.isLoading;
  const isAdding = () => store.isAdding;
  const errors = () => store.errors;

  const whereColumn = (columnId: number) => {
    return store.tasks?.filter((task: IKanbanTask) => task.column.id === columnId);
  };

  const remove = async (task: IKanbanTask) => {
    const { status, errors }: ApiResponse = await KanbanApi.Task.remove(task.column.kanban_id, task.id);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanTaskActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanTaskActionTypes.ERROR,
          payload: {
            tasks: null,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanTaskActionTypes.REMOVE,
          payload: {
            id: task.id,
          },
        });
    }
  };

  const edit = async (task: IKanbanTask, request: KanbanTaskRequest) => {
    dispatch({
      type: KanbanTaskActionTypes.ADDING,
      payload: {
        isAdding: true,
      },
    });
    const { status, data, errors }: ApiResponse = await KanbanApi.Task.edit(task.column.kanban_id, task.id, request);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanTaskActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanTaskActionTypes.ERROR,
          payload: {
            kanban: null,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanTaskActionTypes.EDIT,
          payload: {
            task: data.data,
          },
        });
    }
    dispatch({
      type: KanbanTaskActionTypes.ADDING,
      payload: {
        isAdding: false,
      },
    });
  };

  const loadTasks = async (kanbanId: number) => {
    dispatch({
      type: KanbanTaskActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });

    const { status, data, errors }: ApiResponse = await KanbanApi.Task.getAll(kanbanId);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanTaskActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanTaskActionTypes.ERROR,
          payload: {
            tasks: null,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanTaskActionTypes.SET,
          payload: {
            tasks: data.data,
          },
        });
    }

    dispatch({
      type: KanbanTaskActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  };

  const add = async (kanbanId: number, request: KanbanTaskRequest) => {
    dispatch({
      type: KanbanTaskActionTypes.ADDING,
      payload: {
        isAdding: true,
      },
    });
    const { status, data, errors }: ApiResponse = await KanbanApi.Task.add(kanbanId, request);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanTaskActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanTaskActionTypes.ERROR,
          payload: {
            kanban: null,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanTaskActionTypes.ADD,
          payload: {
            task: data.data,
          },
        });
    }
    dispatch({
      type: KanbanTaskActionTypes.ADDING,
      payload: {
        isAdding: false,
      },
    });
  };

  return <TaskContext.Provider value={{ add, remove, edit, whereColumn, loadTasks, isLoading, isAdding, errors }}>{children}</TaskContext.Provider>;
};

export default TaskProvider;

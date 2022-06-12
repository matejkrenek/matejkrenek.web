import { IKanbanTask } from 'types/kanban.types';

export enum KanbanTaskActionTypes {
  LOADING = 'LOADING',
  ADDING = 'ADDING',
  ERROR = 'ERROR',
  ADD = 'ADD',
  SET = 'SET',
}

export type KanbanTaskState = {
  tasks?: IKanbanTask[]
  errors?: {};
  isLoading?: boolean;
  isAdding?: boolean;
};

type KanbanTaskAction = {
  type: KanbanTaskActionTypes;
  payload?: any;
};

const TaskReducer = (state: KanbanTaskState, action: KanbanTaskAction) => {
  switch (action.type) {
    case KanbanTaskActionTypes.LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    case KanbanTaskActionTypes.ADDING:
      return { ...state, isAdding: action.payload.isAdding };
    case KanbanTaskActionTypes.ADD:
      return { ...state, tasks: [...state.tasks!, action.payload.task] };
    case KanbanTaskActionTypes.SET:
      return { ...state, tasks: action.payload.tasks };
    case KanbanTaskActionTypes.ERROR:
      return { ...state, errors: action.payload.errors };
    default:
      return state;
  }
};

export default TaskReducer;
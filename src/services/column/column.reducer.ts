import { IKanbanColumn } from 'types/kanban.types';

export enum KanbanColumnActionTypes {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SETALL = 'SETALL',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export type KanbanColumnState = {
  columns?: IKanbanColumn[];
  errors?: {};
  isLoading?: boolean;
};

type KanbanColumnAction = {
  type: KanbanColumnActionTypes;
  payload?: any;
};

const ColumnReducer = (state: KanbanColumnState, action: KanbanColumnAction) => {
  switch (action.type) {
    case KanbanColumnActionTypes.LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    case KanbanColumnActionTypes.SETALL:
      return { ...state, columns: action.payload.columns };
    case KanbanColumnActionTypes.ADD:
        return { ...state, columns: [...state.columns!, action.payload.column] };
    case KanbanColumnActionTypes.REMOVE:
      return {...state, columns: state.columns?.filter(({ id }) => id !== action.payload.id)}
    case KanbanColumnActionTypes.ERROR:
      return { ...state, errors: action.payload.errors };
    default:
      return state;
  }
};

export default ColumnReducer;

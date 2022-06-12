import { IKanban } from 'types/kanban.types';

export enum KanbanActionTypes {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SETALL = 'SETALL',
  SET = 'SET',
}

export type KanbanState = {
  kanbans?: IKanban[];
  kanban?: IKanban;
  errors?: {};
  isLoading?: boolean;
};

type KanbanAction = {
  type: KanbanActionTypes;
  payload?: any;
};

const KanbanReducer = (state: KanbanState, action: KanbanAction) => {
  switch (action.type) {
    case KanbanActionTypes.LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    case KanbanActionTypes.SETALL:
      return { ...state, kanbans: action.payload.kanbans };
    case KanbanActionTypes.SET:
        return { ...state, kanban: action.payload.kanban };
    case KanbanActionTypes.ERROR:
      return { ...state, errors: action.payload.errors };
    default:
      return state;
  }
};

export default KanbanReducer;

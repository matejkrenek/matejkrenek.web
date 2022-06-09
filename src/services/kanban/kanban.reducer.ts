import { IKanban } from 'types/kanban.types';

export enum KanbanActionTypes {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export type KanbanState = {
  kanbans?: IKanban[];
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
    case KanbanActionTypes.ERROR:
      return { ...state, errors: action.payload.errors };
    default:
      return state;
  }
};

export default KanbanReducer;

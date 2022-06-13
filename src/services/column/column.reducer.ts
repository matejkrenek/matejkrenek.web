import { IKanbanColumn } from 'types/kanban.types';

export enum KanbanColumnActionTypes {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SETALL = 'SETALL',
  ADD = 'ADD',
  EDIT = 'EDIT',
  REMOVE = 'REMOVE',
  REORDER = 'REORDER',
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
    case KanbanColumnActionTypes.EDIT:
      return {...state, columns: state.columns?.map((column) => column.id === action.payload.id ? action.payload.column : column)}
    case KanbanColumnActionTypes.REORDER:
      let columns = state.columns;

      if(columns) {
        columns = Array.from(columns)
        const prevElm = columns.filter(elm => elm.order === action.payload.previous)[0]
        const currentElm = columns.filter(elm => elm.order === action.payload.current)[0]
        const [removed] = columns.splice(columns.indexOf(prevElm), 1);
        columns.splice(columns.indexOf(currentElm), 0, removed)
        columns.forEach((col: IKanbanColumn, index: number) => col.order = index + 1)

      }


      return {...state, columns: columns}
    case KanbanColumnActionTypes.ERROR:
      return { ...state, errors: action.payload.errors };
    default:
      return state;
  }
};

export default ColumnReducer;

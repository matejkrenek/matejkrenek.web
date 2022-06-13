import { KanbanApi } from 'api/kanban/kanban.api';
import { KanbanColumnRequest } from 'api/kanban/kanban.types';
import React from 'react';
import { ApiResponse } from 'types/api.types';
import { IKanbanColumn } from 'types/kanban.types';
import ColumnReducer, { KanbanColumnActionTypes } from './column.reducer';

type ColumnProviderProps = {
  children: React.ReactNode;
};

type ColumnContextState = {
  all: () => any;
  get: (id: number) => any;
  add: (kanbanId: number, request: KanbanColumnRequest) => any;
  edit: (kanbanId: number, columnId: number, request: KanbanColumnRequest) => any;
  remove: (kanbanId: number, columnId: number) => any;
  order: (column: IKanbanColumn, previous: number, current: number) => any;
  isLoading: () => any;
  errors: () => any;
  loadColumns: (kanbanId: number) => void;
};

export const ColumnContext = React.createContext<ColumnContextState>({
  all: () => false,
  get: () => false,
  add: () => false,
  remove: () => false,
  edit: () => false,
  order: () => false,
  isLoading: () => false,
  errors: () => false,
  loadColumns: () => false,
});

const ColumnProvider: React.FC<ColumnProviderProps> = ({ children }) => {
  const [store, dispatch] = React.useReducer(ColumnReducer, { columns: null, isLoading: true, errors: {} });

  const all = () => store.columns;
  const isLoading = () => store.isLoading;
  const errors = () => store.errors;
  const order = async (column: IKanbanColumn, previous: number, current: number) => {
    const prevColumns = store.columns;

    const { status, data, errors }: ApiResponse = await KanbanApi.Column.edit(column.kanban_id, column.id, {
      order: current,
    });

    switch (status) {
      case 422:
        dispatch({
          type: KanbanColumnActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanColumnActionTypes.SETALL,
          payload: {
            columns: prevColumns,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanColumnActionTypes.SETALL,
          payload: {
            columns: data.data,
          },
        });
        break;
    }
  };

  const get = (id: number) => {
    return store.columns.filter((column: IKanbanColumn) => column.id === id)[0];
  };

  const loadColumns = async (kanbanId: number) => {
    dispatch({
      type: KanbanColumnActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });

    const { status, data, errors }: ApiResponse = await KanbanApi.Column.getAll(kanbanId);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanColumnActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanColumnActionTypes.ERROR,
          payload: {
            columns: null,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanColumnActionTypes.SETALL,
          payload: {
            columns: data.data,
          },
        });
    }

    dispatch({
      type: KanbanColumnActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  };

  const add = async (kanbanId: number, request: KanbanColumnRequest) => {
    dispatch({
      type: KanbanColumnActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });

    const { status, data, errors }: ApiResponse = await KanbanApi.Column.add(kanbanId, request);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanColumnActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanColumnActionTypes.ERROR,
          payload: {
            columns: null,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanColumnActionTypes.ADD,
          payload: {
            column: data.data,
          },
        });
    }

    dispatch({
      type: KanbanColumnActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  };

  const remove = async (kanbanId: number, columnId: number) => {
    dispatch({
      type: KanbanColumnActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });

    const { status, errors }: ApiResponse = await KanbanApi.Column.remove(kanbanId, columnId);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanColumnActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanColumnActionTypes.ERROR,
          payload: {
            columns: null,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanColumnActionTypes.REMOVE,
          payload: {
            id: columnId,
          },
        });
    }

    dispatch({
      type: KanbanColumnActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  };
  const edit = async (kanbanId: number, columnId: number, request: KanbanColumnRequest) => {
    dispatch({
      type: KanbanColumnActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });

    const { status, data, errors }: ApiResponse = await KanbanApi.Column.edit(kanbanId, columnId, request);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanColumnActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanColumnActionTypes.ERROR,
          payload: {
            columns: null,
          },
        });
        break;
      default:
        console.log({
          id: columnId,
          column: data.data,
        });
        dispatch({
          type: KanbanColumnActionTypes.EDIT,
          payload: {
            id: columnId,
            column: data.data,
          },
        });
    }

    dispatch({
      type: KanbanColumnActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  };

  return <ColumnContext.Provider value={{ all, add, edit, order, get, remove, isLoading, errors, loadColumns }}>{children}</ColumnContext.Provider>;
};

export default ColumnProvider;

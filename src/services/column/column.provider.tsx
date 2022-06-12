import { KanbanApi } from 'api/kanban/kanban.api';
import { KanbanColumnRequest } from 'api/kanban/kanban.types';
import React from 'react';
import { ApiResponse } from 'types/api.types';
import ColumnReducer, { KanbanColumnActionTypes } from './column.reducer';

type ColumnProviderProps = {
  children: React.ReactNode;
};

type ColumnContextState = {
  all: () => any;
  add: (kanbanId: number, request: KanbanColumnRequest) => any;
  remove: (kanbanId: number, id: number) => any;
  isLoading: () => any;
  errors: () => any;
  loadColumns: (kanbanId: number) => void;
};

export const ColumnContext = React.createContext<ColumnContextState>({
  all: () => false,
  add: () => false,
  remove: () => false,
  isLoading: () => false,
  errors: () => false,
  loadColumns: () => false,
});

const ColumnProvider: React.FC<ColumnProviderProps> = ({ children }) => {
  const [store, dispatch] = React.useReducer(ColumnReducer, { columns: null, isLoading: true, errors: {} });

  const all = () => store.columns;
  const isLoading = () => store.isLoading;
  const errors = () => store.errors;

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

  return <ColumnContext.Provider value={{ all: all, add: add, remove: remove, isLoading: isLoading, errors: errors, loadColumns: loadColumns }}>{children}</ColumnContext.Provider>;
};

export default ColumnProvider;

import { KanbanApi } from 'api/kanban/kanban.api';
import { KanbanRequest } from 'api/kanban/kanban.types';
import React from 'react';
import { ApiResponse } from 'types/api.types';
import KanbanReducer, { KanbanActionTypes } from './kanban.reducer';

type KanbanProviderProps = {
  children: React.ReactNode;
};

type KanbanContextState = {
  get: () => any;
  edit: (id: number, request: KanbanRequest) => any;
  isLoading: () => any;
  errors: () => any;
  loadKanban: (id: number) => void;
};

export const KanbanContext = React.createContext<KanbanContextState>({
  get: () => false,
  edit: () => false,
  isLoading: () => false,
  errors: () => false,
  loadKanban: () => false,
});

const KanbanProvider: React.FC<KanbanProviderProps> = ({ children }) => {
  const [store, dispatch] = React.useReducer(KanbanReducer, { kanban: null, isLoading: true, errors: {} });

  const get = () => store.kanban;
  const isLoading = () => store.isLoading;
  const errors = () => store.errors;

  const loadKanban = async (id: number) => {
    dispatch({
      type: KanbanActionTypes.LOADING,
      payload: {
        isLoading: true,
      },
    });

    const { status, data, errors }: ApiResponse = await KanbanApi.get(id);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanActionTypes.ERROR,
          payload: {
            kanban: null,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanActionTypes.SET,
          payload: {
            kanban: data.data,
          },
        });
    }

    dispatch({
      type: KanbanActionTypes.LOADING,
      payload: {
        isLoading: false,
      },
    });
  };

  const edit = async (id: number, request: KanbanRequest) => {
    const { status, data, errors }: ApiResponse = await KanbanApi.edit(id, request);
    switch (status) {
      case 422:
        dispatch({
          type: KanbanActionTypes.ERROR,
          payload: {
            errors: errors,
          },
        });
        break;
      case 404:
        dispatch({
          type: KanbanActionTypes.ERROR,
          payload: {
            kanban: null,
          },
        });
        break;
      default:
        dispatch({
          type: KanbanActionTypes.SET,
          payload: {
            kanban: data.data,
          },
        });
    }
  };

  return <KanbanContext.Provider value={{ get: get, edit: edit, isLoading: isLoading, errors: errors, loadKanban: loadKanban }}>{children}</KanbanContext.Provider>;
};

export default KanbanProvider;

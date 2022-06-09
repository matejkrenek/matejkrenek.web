import React from 'react';
import KanbanReducer from './kanban.reducer';

type KanbanProviderProps = {
  children: React.ReactNode;
};

type KanbanContextState = {};

export const KanbanContext = React.createContext<KanbanContextState>({});

const KanbanProvider: React.FC<KanbanProviderProps> = ({ children }) => {
  const [store, dispatch] = React.useReducer(KanbanReducer, {});

  function getAll() {}
  function isLoading() {}

  return <KanbanContext.Provider value={{ getAll, isLoading }}>{children}</KanbanContext.Provider>;
};

export default KanbanProvider;

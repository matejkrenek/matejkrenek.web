import React from "react";
import KanbanProvider, { KanbanContext } from "./kanban.provider";
import KanbanReducer from "./kanban.reducer";

export namespace KanbanService {
    export const Provider = KanbanProvider;
  
    export const useContext = () => {
      return React.useContext(KanbanContext);
    };

    export const useReducer = () => {
      return React.useReducer(KanbanReducer, {});
    };
}
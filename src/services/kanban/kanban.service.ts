import React from "react";
import KanbanProvider, { KanbanContext } from "./kanban.provider";

export namespace KanbanService {
    export const Provider = KanbanProvider;
  
    export const useContext = () => {
      return React.useContext(KanbanContext);
    };
}
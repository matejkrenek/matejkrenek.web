import React from "react";
import TaskProvider, { TaskContext } from "./task.provider";
import TaskReducer from "./task.reducer";

export namespace TaskService {
    export const Provider = TaskProvider;
  
    export const useContext = () => {
      return React.useContext(TaskContext);
    };

    export const useReducer = () => {
      return React.useReducer(TaskReducer, {});
    };
}
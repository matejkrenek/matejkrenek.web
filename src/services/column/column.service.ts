import React from "react";
import ColumnProvider, { ColumnContext } from "./column.provider";
import ColumnReducer from "./column.reducer";

export namespace ColumnService {
    export const Provider = ColumnProvider;
  
    export const useContext = () => {
      return React.useContext(ColumnContext);
    };

    export const useReducer = () => {
      return React.useReducer(ColumnReducer, {});
    };
}
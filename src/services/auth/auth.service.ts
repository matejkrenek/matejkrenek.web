import React from "react";
import AuthProvider, { AuthContext } from "./auth.provider";

export namespace AuthService {
    export const Provider = AuthProvider

    export const useContext = () => {
        return React.useContext(AuthContext)
    }
}
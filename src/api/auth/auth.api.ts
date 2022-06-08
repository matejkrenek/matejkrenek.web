import { api } from "config/api.config";

import { AuthLoginRequest, AuthRegisterRequest } from "./auth.types";

export namespace AuthApi {
    export async function login(request: AuthLoginRequest) {
        try {
            return await api.post(`/auth/login`, request)
        } catch(exception) {
            return exception
        }
    }

    export async function register(request: AuthRegisterRequest) {
        try {
            return await api.post(`/auth/register`, request)
        } catch(exception) {
            return exception
        }
    }

    export async function logout() {
        try {
            return await api.post(`/auth/logout`)
        } catch(exception) {
            return exception
        }
    }
}
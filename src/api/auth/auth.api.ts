import { api, config } from "config/api.config";

import { AuthLoginRequest, AuthRegisterRequest } from "./auth.types";

export namespace AuthApi {
    export async function csrf() {
        await api.get('/sanctum/csrf-cookie')
    }


    export async function login(request: AuthLoginRequest) {
    }

    export async function register(request: AuthRegisterRequest) {
        await csrf()
        try {
            const response = await api.post(`${config.version}/auth/register`, request)
            return response
        } catch(err) {
            return err
        }
    }

    export async function logout() {
        
    }
}
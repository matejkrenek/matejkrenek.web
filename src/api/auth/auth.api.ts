import axios, { AxiosInstance, AxiosResponse } from "axios";
import apiConfig from "config/api.config";

import { AuthLoginRequest, AuthRegisterRequest } from "./auth.types";

export namespace AuthApi {
    const api: AxiosInstance = axios.create({
        baseURL: apiConfig.url,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    export async function csrf() {
        console.log(await api.get('/sanctum/csrf-cookie'))
    }


    export async function login(request: AuthLoginRequest) {
    }

    export async function register(request: AuthRegisterRequest) {
        console.log(await csrf())
        try {
            const response: AxiosResponse = await api.post(`${apiConfig.version}/auth/register`, request)
            return response
        } catch(err) {
            return err
        }
    }

    export async function logout() {
        
    }
}
import { AxiosError, AxiosResponse } from "axios";
import { api } from "config/api.config";
import { ApiResponse } from "types/api.types";

import { AuthLoginRequest, AuthRegisterRequest } from "./auth.types";

export namespace AuthApi {
    export async function login(request: AuthLoginRequest): Promise<ApiResponse> {
        try {
            const response: AxiosResponse = await api.post(`/auth/login`, request)
            
            return await {
                status: response.status,
                message: response.data.message || '',
                errors: response.data.errors || [],
                data: response.data
            };
        } catch(error: AxiosError | any) {
            return {
                status: error.response.status,
                message: error.response.data.message || error.message,
                errors: error.response.data.errors || [],
                data: error.response.data
            };
        }
    }

    export async function register(request: AuthRegisterRequest): Promise<ApiResponse> {
        try {
            const response: AxiosResponse = await api.post(`/auth/register`, request)
            
            return await {
                status: response.status,
                message: response.data.message || '',
                errors: response.data.errors || [],
                data: response.data
            };
        } catch(error: AxiosError | any) {
            return {
                status: error.response.status,
                message: error.response.data.message || error.message,
                errors: error.response.data.errors || [],
                data: error.response.data
            };
        }
    }

    export async function logout(): Promise<ApiResponse> {
        try {
            const response: AxiosResponse = await api.post(`/auth/logout`)

            return await {
                status: response.status,
                message: response.data.message || '',
                errors: response.data.errors || [],
                data: response.data
            };
        } catch(error: AxiosError | any) {
            return {
                status: error.response.status,
                message: error.response.data.message || error.message,
                errors: error.response.data.errors || [],
                data: error.response.data
            };
        }
    }
}
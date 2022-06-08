import { AxiosError, AxiosResponse } from "axios";
import { api } from "config/api.config";
import { ApiResponse } from "types/api.types";
import { KanbanColumnRequest, KanbanInviteRequest, KanbanTaskRequest } from "./kanban.types";

export namespace KanbanApi {
    export async function get(id: number): Promise<ApiResponse> {
        try {
            return await api.get(`/kanban/${id}`)
        } catch(error: AxiosError | any) {
            return exception;
        }
    }

    export namespace Invitation {
        export async function invite(kanbanId: number, request: KanbanInviteRequest): Promise<ApiResponse> {
            try {
                return await api.post(`/kanban/${kanbanId}/invite`, request)
            } catch(error: AxiosError | any) {
                return exception;
            }
        }

        export async function accept(token: string): Promise<ApiResponse> {
            try {
                return await api.post(`/kanban/invitation/${token}/accept`)
            } catch(error: AxiosError | any) {
                return exception;
            }
        }
        
        export async function reject(token: string): Promise<ApiResponse> {
            try {
                return await api.post(`/kanban/invitation/${token}/reject`)
            } catch(error: AxiosError | any) {
                return exception;
            }
        }
    }

    export namespace Column {
        export async function add(kanbanId: number, request: KanbanColumnRequest): Promise<ApiResponse> {
            try {
                return await api.post(`/kanban/${kanbanId}/column`, request)
            } catch(error: AxiosError | any) {
                return exception;
            }
        }
        
        export async function edit(kanbanId: number, columnId: number, request: KanbanColumnRequest): Promise<ApiResponse> {
            try {
                return await api.put(`/kanban/${kanbanId}/column/${columnId}`, request)
            } catch(error: AxiosError | any) {
                return exception;
            }  
        }

        export async function remove(kanbanId: number, columnId: number): Promise<ApiResponse> {
            try {
                return await api.delete(`/kanban/${kanbanId}/column/${columnId}`)
            } catch(error: AxiosError | any) {
                return exception;
            }  
        }
    }
    
    export namespace Task {
        export async function add(kanbanId: number, request: KanbanTaskRequest): Promise<ApiResponse> {
            try {
                const response: AxiosResponse =  await api.post(`/kanban/${kanbanId}/task`, request)
                
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
        
        export async function edit(kanbanId: number, taskId: number, request: KanbanTaskRequest): Promise<ApiResponse> {
            try {
                const response: AxiosResponse = await api.put(`/kanban/${kanbanId}/task/${taskId}`, request)

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

        export async function remove(kanbanId: number, taskId: number): Promise<ApiResponse> {
            try {
                const response: AxiosResponse = await api.delete(`/kanban/${kanbanId}/task/${taskId}`)

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
} 
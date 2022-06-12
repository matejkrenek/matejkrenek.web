export interface KanbanRequest {
    name?: string
    description?: string
}

export interface KanbanInviteRequest {
    user_id: number
}

export interface KanbanColumnRequest {
    name: string
    order?: number
    color?: string
}

export interface KanbanTaskRequest {
    name: string
    description?: string
    executor_id?: number
    row?: number
    is_completed?: boolean 
}
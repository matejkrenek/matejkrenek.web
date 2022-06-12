import { User } from "./user.type"

export interface IKanbanTask {
    name: string
    description?: string
    executor?: User
    author?: User
    column: IKanbanColumn
    created_at: string,
    updated_at: string
}

export interface IKanbanColumn {
    id: number
    kanban_id: number
    name: string
    color?: string
    order: number
    tasks?: IKanbanTask[]
}

export interface IKanban {
    id: number
    name: string
    description?: string
    author: User
    columns_count: number
    tasks_count: number
    members: User[]
    created_at: string
    updated_at: string
}
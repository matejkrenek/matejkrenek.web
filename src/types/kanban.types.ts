import { User, UserAvatar } from "./user.type"

export interface IKanbanTask {
    name: string
    description?: string
    priority: 'low' | 'high' | 'normal'
    comments: number
    files: number
    members: UserAvatar[]
}

export interface IKanbanColumn {
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
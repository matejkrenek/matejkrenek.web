import { User } from "./user.type"

export interface IKanbanTask {
    
}

export interface IKanbanColumn {
    name: string
    color?: string
    order: number
}

export interface IKanban {
    id: number
    name: string
    description?: string
    author?: User
    columns: IKanbanColumn[] | []
    members?: User[]
}
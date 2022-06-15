export type UserAvatar = {
    inicials: string
    image?: string | null
}

export type User = {
    id: number
    username: string
    token: string
    email: string
    avatar?: string
    created_at: string
    updated_at: string
}
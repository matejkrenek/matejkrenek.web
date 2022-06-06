export interface AuthRegisterRequest {
    username: string
    email: string
    password: string
    password_confirmation: string
}

export interface AuthLoginRequest {
    username: string
    password: string
}
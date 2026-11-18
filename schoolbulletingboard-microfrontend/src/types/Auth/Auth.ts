export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export type UserRole = 'TEACHER' | 'STUDENT';

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
    username: string;
}
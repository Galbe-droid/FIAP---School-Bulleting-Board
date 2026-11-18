import type {LoginRequest, LoginResponse} from "../types/Auth/Auth.ts";
import api from "./client.ts";
import type CreateUserDto from "../dtos/User/CreateUserDto.ts";
import type ReturnUserDto from "../dtos/User/ReturnUserDto.ts";

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    id: number;
    username: string;
    email: string;
    role: string;
}

export const getStudents = async (): Promise<ReturnUserDto[]> => {
    const response = await api.get<ReturnUserDto[]>('/users/students');
    return response.data;
};

export const getTeachers = async (): Promise<ReturnUserDto[]> => {
    const response = await api.get<ReturnUserDto[]>('/users/teachers');
    return response.data;
};

export const login = async(credentials:LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('auth/login', credentials);
    return response.data
}

export const register = async(data:CreateUserDto): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('users/register', data);
    return response.data
}

export const deleteAccount = async (): Promise<void> => {
    await api.delete('/users/me');
};
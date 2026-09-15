import api from './api.ts'

interface LoginData{
    email: string;
    password: string;
}

interface LoginResponse{
    token: string;
}

export const loginRequest = async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
}
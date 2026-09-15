import api from "./api.ts";
import type ReturnUserDto from "../types/User/ReturnUserDto.ts";

export const getUserById = async (id: string): Promise<ReturnUserDto> => {
    const response = await api.get<ReturnUserDto>(`/users/${id}`);
    return response.data;
}
import type {ReturnPostDto} from "../dtos/Posts/ReturnPostDto.ts";
import api from "./client.ts";
import type CreatePostDto from "../dtos/Posts/CreatePostDto.ts";
import type UpdatePostDto from "../dtos/Posts/UpdatePostDto.ts";

export const getPosts = async(): Promise<ReturnPostDto[]> => {
    const response = await api.get<ReturnPostDto[]>('/posts');
    return response.data;
}

export const getPostSearch = async(search: string): Promise<ReturnPostDto[]> => {
    const response = await api.get<ReturnPostDto[]>('/posts/search', {
        params: {search},
    });
    return response.data;
}

export const getPostById = async(id: string): Promise<ReturnPostDto> => {
    const response = await api.get<ReturnPostDto>(`/posts/${id}`);
    return response.data;
}

export const createPost = async(post: CreatePostDto): Promise<ReturnPostDto> => {
    const response = await api.post<ReturnPostDto>('/posts', post);
    return response.data;
}

export const updatePost = async(id: string, post: UpdatePostDto): Promise<ReturnPostDto> => {
    const response = await api.put<ReturnPostDto>(`/posts/${id}`, post);
    return response.data;
}

export const deletePost = async(id: string): Promise<boolean> => {
    const response = await api.delete<boolean>(`/posts/${id}`);
    return response.data
}
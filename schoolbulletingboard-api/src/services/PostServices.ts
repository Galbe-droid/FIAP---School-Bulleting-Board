import Post from '../models/Post';
import CreatePostDto from '../dtos/Post/CreatePostDto';
import UpdatePostDto from '../dtos/Post/UpdatePostDto';
import ReturnPostDto from '../dtos/Post/ReturnPostDto';
import PostRepository from '../repositories/PostRepository';
import { PublishedStatus } from "@prisma/client";

class PostService {
    async getAllPosts(): Promise<ReturnPostDto[]> {
        const posts = await PostRepository.findAll();
        
        const dtos: ReturnPostDto[] = posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            createdAt: post.createdAt,
            status: post.status
        }));

        return dtos;
    }

    async getAllPostsProfessors(): Promise<ReturnPostDto[]> {
        const posts = await PostRepository.findAllProfessors();
        
        const dtos: ReturnPostDto[] = posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            createdAt: post.createdAt,
            status: post.status
        }));

        return dtos;
    }

    async getPostById(id: number): Promise<ReturnPostDto | null> {
        const post = await PostRepository.findById(id);
        if (!post){
            throw new Error('Post not found');
        }

        const dto: ReturnPostDto = {
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            createdAt: post.createdAt,
            status: post.status
        };

        return dto;        
    }

    async createPost(createPost : CreatePostDto, userId: number): Promise<Post | null> {
        if(!createPost.title){
            throw new Error('Title is required');
        }

        if(!createPost.content){
            throw new Error('Content is required');
        }

        if(!createPost.status){
            throw new Error('Status is required');
        }

        if(!Object.values(PublishedStatus).includes(createPost.status)){
            throw new Error('Invalid status value');
        }

        const newPost: Post = {
            id: Date.now(),
            title: createPost.title,
            content: createPost.content,
            authorId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: createPost.status
        };

        return await PostRepository.create(newPost);
    }

    async updatePost(id: number, { updatePost }: { updatePost : Partial<UpdatePostDto> }, userId: number): Promise<Post | null> {
        const existingPost = await PostRepository.findById(id);

        if(!existingPost) {
            return null;
        }

        existingPost.updatedAt = new Date();

        const updatedPost: Post = {
            ...existingPost,
            ...updatePost,
            updatedAt: new Date()
        };

        return await PostRepository.update(id, updatedPost);
    }

    async deletePost(id: number): Promise<boolean> {
        await PostRepository.delete(id);
        return true;
    }

    async searchPosts(term: string): Promise<Post[]> {
        if(!term || term.trim() === '') {
            throw new Error('Search term is required');
        }

        return await PostRepository.search(term);
    }
}

export default new PostService();

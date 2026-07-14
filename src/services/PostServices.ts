import Post from '../models/Post';
import CreatePostDto from '../dtos/CreatePostDto';
import UpdatePostDto from '../dtos/UpdatePostDto';
import PostRepository from '../repositories/PostRepository';
import { PublishedStatus } from "@prisma/client";

class PostService {
    async getAllPosts(): Promise<Post[]> {
        return await PostRepository.findAll();
    }

    async getAllPostsProfessors(): Promise<Post[]> {
        return await PostRepository.findAllProfessors();
    }

    async getPostById(id: number): Promise<Post | null> {
        return await PostRepository.findById(id);
    }

    async createPost(createPost : CreatePostDto ): Promise<Post | null> {
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
            author: createPost.author,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: createPost.status
        };

        return await PostRepository.create(newPost);
    }

    async updatePost(id: number, { updatePost }: { updatePost : Partial<UpdatePostDto> }): Promise<Post | null> {
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

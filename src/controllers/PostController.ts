import {Request, Response} from 'express';
import PostService from '../services/PostServices';

class PostController {
    async index(req: Request, res: Response) {
        const role = req.query.role as string;

        if (role === 'teacher') {
            const posts = await PostService.getAllPostsProfessors();
            return res.json(posts);
        }

        const posts = await PostService.getAllPosts();
        return res.json(posts);
    }


    async postId(req: Request, res: Response) {
        const postId = parseInt(String(req.params.id), 10);
        const post = await PostService.getPostById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.json(post);
    }

    async create(req: Request, res: Response) {
        const newPost = await PostService.createPost(req.body);

        if(!newPost) {
            return res.status(400).json({ message: 'Failed to create post' });
        }

        return res.status(201).json(newPost);
    }

    async update(req: Request, res: Response) {
        const postId = parseInt(String(req.params.id), 10);
        const updatedPost = await PostService.updatePost(postId, { updatePost: req.body });

        if(!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.json(updatedPost);
    }

    async delete(req: Request, res: Response) {
        const postId = parseInt(String(req.params.id), 10);
        const deletedPost = await PostService.deletePost(postId);

        if(!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.json({ message: 'Post deleted successfully' });
    }

    async search(req: Request, res: Response) {
        const term = req.query.term as string;

        const posts = await PostService.searchPosts(term);

        return res.json(posts);
    }

    async show(req: Request, res: Response) {
        const postId = parseInt(String(req.params.id), 10);
        const post = await PostService.getPostById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.json(post);
    }
}

export default new PostController();
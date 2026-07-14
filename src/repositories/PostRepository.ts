import Post from '../models/Post';
import { PublishedStatus } from "@prisma/client";
import prisma from '../database/prisma';

class PostRepository {
    private posts: Post[] = [];

    async findAll(): Promise<Post[]> {
        return await prisma.post.findMany({
            where: {
                status: PublishedStatus.PUBLISHED
            }
        });
    }

    async findAllProfessors(): Promise<Post[]> {
        return await prisma.post.findMany();
    }
    

    async findById(id: number) {
        return await prisma.post.findUnique({
            where: {
                id
            }
        });
    }

    async create(post: Post) {
        return await prisma.post.create({
            data: {
                title: post.title,
                content: post.content,
                author: post.author,
                status: post.status
            }
        });
    }

    async update(id: number, post: Post) {
        return await prisma.post.update({
            where: {
                id
            },
            data: {
                title: post.title,
                content: post.content,
                author: post.author,
                status: post.status
            }
        });
    }

    async delete(id: number) {
        return await prisma.post.delete({
            where: {
                id
            }
        });
    }

    async search(term: string) {

        return await prisma.post.findMany({

            where: {
                OR: [
                    {
                        title: {
                            contains: term
                        }
                    },
                    {
                        content: {
                            contains: term
                        }
                    }
                ]
            }

        });
    }
}


export default new PostRepository();
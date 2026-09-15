import Post from '../models/Post';
import { PublishedStatus } from "@prisma/client";
import prisma from '../database/prisma';

class PostRepository {
    async findAll(): Promise<Post[]> {
        return prisma.post.findMany({
            where: {
                status: PublishedStatus.PUBLISHED
            }
        });
    }

    async findAllProfessors(): Promise<Post[]> {
        return prisma.post.findMany();
    }
    

    async findById(id: number) {
        return prisma.post.findUnique({
            where: {
                id
            }
        });
    }

    async create(post: Post) {
        return prisma.post.create({
            data: {
                title: post.title,
                content: post.content,
                authorId: post.authorId,
                status: post.status
            }
        });
    }

    async update(id: number, post: Post) {
        return prisma.post.update({
            where: {
                id
            },
            data: {
                title: post.title,
                content: post.content,
                authorId: post.authorId,
                status: post.status
            }
        });
    }

    async delete(id: number) {
        return prisma.post.delete({
            where: {
                id
            }
        });
    }

    async search(term: string) {

        return prisma.post.findMany({
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
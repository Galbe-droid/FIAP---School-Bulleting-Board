import { PublishedStatus } from "@prisma/client";

export default interface CreatePostDto {
    title: string;
    content: string;
    author: string;
    status: PublishedStatus;
}
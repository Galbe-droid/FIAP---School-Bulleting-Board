import { PublishedStatus } from "@prisma/client";

export default interface CreatePostDto {
    title: string;
    content: string;
    status: PublishedStatus;
}
import { PublishedStatus } from "@prisma/client";

export default interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    status: PublishedStatus;
}

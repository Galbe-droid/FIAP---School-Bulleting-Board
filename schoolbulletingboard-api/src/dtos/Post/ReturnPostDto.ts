import { PublishedStatus } from "@prisma/client";

export default interface ReturnPostDto {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    status: PublishedStatus;
}

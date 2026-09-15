import { PublishedStatus } from "@prisma/client";

export default interface UpdatePostDto {
    title?: string;
    content?: string;
    status?: PublishedStatus;
}
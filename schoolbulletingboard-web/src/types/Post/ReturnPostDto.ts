import type {PublishedStatus} from "../../enum/PublishedStatus.ts";

export interface ReturnPostDto {
    id: number;
    title: string;
    content: string;
    authorId: string;
    createdAt: string;
    status: PublishedStatus;
}
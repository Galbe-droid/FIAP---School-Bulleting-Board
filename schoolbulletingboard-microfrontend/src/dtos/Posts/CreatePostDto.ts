import type {PublishedStatus} from "../../enum/PublishedStatus.ts";

export default interface CreatePostDto {
    title: string;
    content: string;
    status: PublishedStatus;
}
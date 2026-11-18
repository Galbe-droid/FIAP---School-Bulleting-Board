import type {PublishedStatus} from "../../enum/PublishedStatus.ts";

export default interface UpdatePostDto {
    title?: string;
    content?: string;
    status?: PublishedStatus;
}
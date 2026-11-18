const PublishedStatus = {
    PUBLISHED: "PUBLISHED",
    DRAFT: "DRAFT",
    ARCHIVED: "ARCHIVED",
} as const;

type PublishedStatus = typeof PublishedStatus[keyof typeof PublishedStatus];

export { PublishedStatus };
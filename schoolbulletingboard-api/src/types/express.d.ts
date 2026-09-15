import UserRole from "../enum/UserRole";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number;
                role: UserRole;
            };
        }
    }
}

export {};
import { UserRole } from "@prisma/client"

export default interface User {
    id: number;
    username: string;
    email: string;
    roles: UserRole;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
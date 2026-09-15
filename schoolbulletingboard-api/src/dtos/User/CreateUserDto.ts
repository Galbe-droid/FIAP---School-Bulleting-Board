import { UserRole } from "@prisma/client"

export default interface CreateUserDto{
    username: string;
    email: string;
    password: string;
    role: UserRole;
}
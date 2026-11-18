import type {UserRole} from "../../enum/UserRole.ts";

export default interface CreateUserDto{
    username: string;
    email: string;
    password: string;
    role: UserRole | undefined;
}
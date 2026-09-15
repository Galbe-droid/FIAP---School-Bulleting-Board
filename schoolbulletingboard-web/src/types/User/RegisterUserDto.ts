import type {UserRole} from "../../enum/UserRole.ts";

export default interface RegisterUserDto{
    username: string;
    email: string;
    password: string;
    role: UserRole;
}
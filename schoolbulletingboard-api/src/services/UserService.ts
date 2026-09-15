import User from "../models/User";
import bcrypt from "bcrypt";
import CreateUserDto from "../dtos/User/CreateUserDto";
import ReturnUserDto from "../dtos/User/ReturnUserDto";
import {UserRole} from "@prisma/client";
import UserRepository from "../repositories/UserRepository";
import userRepository from "../repositories/UserRepository";

class UserService{
    async createUser(user:CreateUserDto){
        if(!Object.values(UserRole).includes(user.role)){
            throw new Error("Invalid role provided");
        }

        const existingUser = await UserRepository.findByEmail(user.email);

        if(existingUser){
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(
            user.password,
            10
        );

        return await UserRepository.create({
            ...user,
            password: hashedPassword
        });
    }

    async getUserById(id:number):Promise<ReturnUserDto | null>{
        const user = await UserRepository.findById(id);

        if(!user){
            throw new Error("User not found");
        }

        const dto: ReturnUserDto = {
            username: user?.username || "",
            email: user?.email || ""
        }

        return dto;
    }
}

export default new UserService();
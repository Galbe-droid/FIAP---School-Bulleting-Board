import User from "../models/User";
import bcrypt from "bcrypt";
import CreateUserDto from "../dtos/User/CreateUserDto";
import ReturnUserDto from "../dtos/User/ReturnUserDto";
import {UserRole} from "@prisma/client";
import UserRepository from "../repositories/UserRepository";
import userRepository from "../repositories/UserRepository";

class UserService{
    async getAllUsersStudents(): Promise<ReturnUserDto[]> {
        return await UserRepository.getAllUsersStudents()
    }

    async getAllUsersTeachers(): Promise<ReturnUserDto[]>{
        return await UserRepository.getAllUsersProfessors()
    }

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

    async registerUserByAnotherUser(user: CreateUserDto, referenceUserId:number){
        if(!Object.values(UserRole).includes(user.role)){
            throw new Error("Invalid role provided");
        }

        const existingUser = await UserRepository.findByEmail(user.email);

        if(existingUser){
            throw new Error("User already exists");
        }

        if(!await userRepository.findById(referenceUserId)){
            throw new Error("Reference user not found");
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

        return {
            id: user?.id,
            username: user?.username || "",
            email: user?.email || ""
        }
    }

    async deleteUser(id:number):Promise<boolean> {
        const user = await UserRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        await UserRepository.deleteUser(id);

        return true;
    }
}

export default new UserService();
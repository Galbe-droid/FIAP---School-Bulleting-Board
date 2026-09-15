import { PrismaClient } from "@prisma/client";
import User from "../models/User";
import CreateUserDto from "../dtos/User/CreateUserDto";

const prisma = new PrismaClient();

class UserRepository {
    async create(user: CreateUserDto) {
        return prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role,
            }
        })
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email: email,
            }
        })
    }

    async findById(id: number) {
        return prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }
}

export default new UserRepository();


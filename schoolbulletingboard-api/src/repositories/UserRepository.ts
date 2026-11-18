import { PrismaClient } from "@prisma/client";
import User from "../models/User";
import CreateUserDto from "../dtos/User/CreateUserDto";

const prisma = new PrismaClient();

class UserRepository {
    async getAllUsersStudents(){
        return prisma.user.findMany({
            where: {
                role: 'STUDENT'
            },
            select: {
                id: true,
                username: true,
                email: true
            },
            orderBy: {
                username: 'asc'
            }
        })
    }

    async getAllUsersProfessors(){
        return prisma.user.findMany({
            where: {
                role: 'TEACHER'
            },
            select: {
                id: true,
                username: true,
                email: true
            },
            orderBy: {
                username: 'asc'
            }
        })
    }

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

    async deleteUser(id: number){
        return prisma.user.delete({
            where: {
                id: id
            }
        })
    }
}

export default new UserRepository();


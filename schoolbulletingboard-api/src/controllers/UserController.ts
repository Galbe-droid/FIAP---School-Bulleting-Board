import {Request, Response} from 'express';
import UserService from "../services/UserService";
import {AuthRequest} from "../types/AuthRequest";
import CreateUserDto from "../dtos/User/CreateUserDto";

class UserController{
    async getAllUsersStudents(req: AuthRequest, res: Response){
        try {
            const result = await UserService.getAllUsersStudents();
            return res.status(200).json(result);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                message: 'Error retrieving students'
            });
        }
    }

    async getAllUsersTeachers(req: AuthRequest, res: Response){
        try {
            const result = await UserService.getAllUsersTeachers();
            return res.status(200).json(result);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                message: 'Error retrieving teachers'
            });
        }
    }

    async create(req:Request, res:Response){
        try{
            const user = await UserService.createUser(req.body);

            return res.status(201).json(user);
        }catch(err: any){
            return res.status(400).json({message: err.message} + "UserController.ts: Error creating user");
        }
    }

    async createByReference(req:AuthRequest, res:Response){
        try{
            const newUser = req.body as CreateUserDto
            const user = await UserService.registerUserByAnotherUser(newUser, req.user?.userId as number);

            return res.status(201).json(user);
        }catch(err: any){
            console.error("Error creating user: ", err);
            return res.status(400).json({message: err.message || "UserController.ts: Error creating user"});
        }
    }

    async getById(req:Request, res:Response) {
        try {
            const id = Number(req.params.id);
            const user = await UserService.getUserById(id);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(404).json({
                message: error.message
            });
        }
    }

    async deleteAccount(req: AuthRequest, res: Response) {
        try {
            const userId = req.user!.userId;

            await UserService.deleteUser(userId);

            return res.status(200).json({
                message: 'Account deleted successfully'
            });

        } catch (err: any) {
            return res.status(400).json({
                message: err.message || 'Error deleting account'
            });
        }
    }
}

export default new UserController();
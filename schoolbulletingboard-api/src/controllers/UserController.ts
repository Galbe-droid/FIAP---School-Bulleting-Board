import {Request, Response} from 'express';
import UserService from "../services/UserService";
import CreateUserDto from "../dtos/User/CreateUserDto";

class UserController{
    async create(req:Request, res:Response){
        try{
            const user = await UserService.createUser(req.body);

            return res.status(201).json(user);
        }catch(err){
            return res.status(400).json({error:err} + "UserController.ts: Error creating user");
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
}

export default new UserController();
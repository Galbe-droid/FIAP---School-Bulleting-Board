import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
    async login(req: Request, res: Response) {
        try{
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).send({
                    error: "email and password",
                })
            }
            const result = await AuthService.login(email, password);
            return res.status(200).send(result);
        }catch(err:any){
            return res.status(401).json({
                message: err.message
            });
        }
    }
}

export default new AuthController();
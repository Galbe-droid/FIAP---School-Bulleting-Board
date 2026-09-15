import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/AuthRequest";

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const [type, token] = authHeader.split(" ");

    if(type !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; role: string };

        req.user = decoded;

        next();
    }
    catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default authMiddleware;
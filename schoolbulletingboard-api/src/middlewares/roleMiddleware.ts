import { Response, NextFunction } from "express";
import {UserRole} from "@prisma/client";
import { AuthRequest } from "../types/AuthRequest";

const roleMiddleware = (role: UserRole) => {

    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        next();
    };
};

export default roleMiddleware ;
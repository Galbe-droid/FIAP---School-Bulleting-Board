import {Router} from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";
import {UserRole} from "@prisma/client";

const router = Router();

router.get('/users/students', authMiddleware, UserController.getAllUsersStudents);

router.get('/users/teachers', authMiddleware, roleMiddleware(UserRole.TEACHER), UserController.getAllUsersTeachers);

router.post("/users", (req, res) => {
    UserController.create(req, res);
})

router.post("/users/register", authMiddleware, (req, res) => {
    UserController.createByReference(req, res);
})

router.get('/users/:id', (req, res) => {
    UserController.getById(req, res);
})

router.delete('/users/me', authMiddleware, UserController.deleteAccount);

export default router;
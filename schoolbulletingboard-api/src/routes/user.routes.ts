import {Router} from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/users", (req, res) => {
    UserController.create(req, res);
})

router.get('/users/:id', (req, res) => {
    UserController.getById(req, res);
})

export default router;
import {Router} from 'express';
import PostController from '../controllers/PostController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import {UserRole} from '@prisma/client';

const router = Router();

router.get('/posts', (req, res) => {
    PostController.index(req, res);
});

router.get('/posts/search', (req, res) => {
    PostController.search(req, res);
});

router.get('/posts/:id', (req, res) => {
    PostController.postId(req, res);
});

router.post('/posts', authMiddleware, roleMiddleware(UserRole.TEACHER), PostController.create);

router.put('/posts/:id', authMiddleware, roleMiddleware(UserRole.TEACHER), PostController.update);

router.delete('/posts/:id', authMiddleware, roleMiddleware(UserRole.TEACHER), PostController.delete);

export default router;
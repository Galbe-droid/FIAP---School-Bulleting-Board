import {Router} from 'express';
import PostController from '../controllers/PostController';

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

router.post('/posts', (req, res) => {
    PostController.create(req, res);
});

router.put('/posts/:id', (req, res) => {
    PostController.update(req, res);
});

router.delete('/posts/:id', (req, res) => {
    PostController.delete(req, res);
});

export default router;
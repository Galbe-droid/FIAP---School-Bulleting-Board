import express from 'express';
import cors from 'cors';
import postRoutes from './routes/post.routes';
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}))

app.use(express.json());

app.use(authRoutes);

app.use(postRoutes);

app.use(userRoutes)

export default app;
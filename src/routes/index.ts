import { Application, Router } from "express";
import { productRoutes } from "./product";
import { authRoutes } from "./auth";
import { authMiddleware } from "../middleware/auth";


export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/products', authMiddleware, productRoutes);
    apiRouter.use('/auth', authRoutes);

    app.use('/api/v1', apiRouter);
}
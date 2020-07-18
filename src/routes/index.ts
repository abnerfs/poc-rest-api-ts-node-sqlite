import { Application, Router } from "express";
import { productRoutes } from "./product";


export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/products', productRoutes);

    app.use('/api/v1', apiRouter);
}
import Router from 'express';
import { authController } from '../controllers/auth';


const authRoutes = Router();
authRoutes.post('/login', authController.login);

export {
    authRoutes
}

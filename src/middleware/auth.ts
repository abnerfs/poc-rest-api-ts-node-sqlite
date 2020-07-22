import { Request, Response, NextFunction } from 'express';
import { unauthorized } from '../services/util';
import { jwtService } from '../services/jwtservice';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if(!token?.startsWith('Bearer')) {
        return unauthorized(res);
    }

    return jwtService.verify(token.replace('Bearer ', ''))
        .then(decoded => {
            res.locals['token'] = decoded;
            next();    
        })
        .catch(() => unauthorized(res));
}
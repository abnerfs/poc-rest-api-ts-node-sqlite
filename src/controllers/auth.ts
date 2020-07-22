import { Request, Response } from "express";
import { badRequest, internalServerError } from "../services/util";
import { jwtService } from "../services/jwtservice";




const login = (req: Request, res: Response) => {

    const { login, pass } = req.body;

    if(login == "batata" && pass == "123") {
        return jwtService.sign({
            login
        })
        .then(token => {
            res.json({
                token
            });
        })
        .catch(err => internalServerError(res, err));
    }
    else
        return badRequest(res, "Login inválido");
}

export const authController = {
    login
}
const { JWT_KEY } = process.env;
if(!JWT_KEY)
    throw new Error("Parâmetro JWT_KEY não informado");

import jwt from 'jsonwebtoken';


const sign = (payload: object) => 
    new Promise<string>((resolve, reject) => {
        jwt.sign(payload, JWT_KEY, {
            algorithm: "HS256",
            expiresIn: '5 minutes'
        }, (err, token) => {
            if(err)            
                reject(err);
            else
                resolve(token);
        });
    });

const verify = (token: string) =>
    new Promise<object>((resolve, reject) => {
        jwt.verify(token, JWT_KEY, (err, decoded) => {
            if(err)
                reject(err);
            else
                resolve(decoded);
        });
    });


export const jwtService = {
    sign,
    verify
}
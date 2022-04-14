import jwt from 'jsonwebtoken';
import { config } from '../config/default.js';


export const JWBmethods = {
    generateToken: (user) => {
        return jwt.sign({
            user: user   //vainas para que sea mas seguro
        },
        config.jwt.secret, //palabra secreta que sera una variable de entorno
        {
            expiresIn: '3h' //tiempo para que el token caduque
        });
    },
    verifyToken: (token) => {
        return jwt.verify(token, config.jwt.secret);
    },
    decodeToken: (token) => {
        return jwt.decode(token, {complete: true});
    }
}
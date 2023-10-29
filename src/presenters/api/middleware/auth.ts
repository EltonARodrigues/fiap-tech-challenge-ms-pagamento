import { NextFunction, Request, Response } from "express";

import Authenticatior from "~datasources/authentication/authentication";
import { TipoUsuario } from "~domain/repositories/authenticationRepository";


export default function authenticate(type: TipoUsuario) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req?.headers?.authorization?.split(' ')[1] as string;
            const authenticatior = new Authenticatior();
            console.log(type)
            const clienteId = await authenticatior.authUser(token, type);

            req.tipoUsuario = type;
            req.clienteId = clienteId;
            return next();
        } catch (error: any) {
            res.status(401).json({
                error: error.message,
            });
        }
    };
}

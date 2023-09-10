const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user";

interface AuthRequest extends Request {
    user?: IUser;
}

const authUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: Error, user: IUser) => {
            if (err) {
                const error = err as Error;
                return res.status(400).json({ msg: error.message });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        const error = err as Error;
        return res.status(500).json({ msg: error.message });
    }
}

export default authUser;
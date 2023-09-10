import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user";
import userModel from "../models/user.model";

interface AuthRequest extends Request {
    user?: IUser;
}

const authAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const user = await userModel.findOne({
            _id: req.user._id
        });

        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }

        if (!user.isAdmin) {
            return res.status(400).json({ msg: "Admin resources access denied." });
        }

        next();
    } catch (err) {
        const error = err as Error;
        return res.status(500).json({ msg: error.message });
    }
}

export default authAdmin;
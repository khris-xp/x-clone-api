import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user';

export const createAccessToken = (user: IUser) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '11m' });
};

export const createRefreshToken = (user: IUser) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
};
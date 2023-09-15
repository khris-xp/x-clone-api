import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user';
import { default as User, default as userModel } from '../models/user.model';
import { handleError } from '../utils/error';
import { createAccessToken, createRefreshToken } from '../utils/jwtUtils';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

const userController = {
    register: async (req: Request, res: Response) => {
        try {
            const { fullName, username, email, password } = req.body;

            const user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ message: 'Email already exists.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                fullName,
                username,
                email,
                password: hashedPassword
            });

            const accessToken = createAccessToken({
                id: newUser._id,
                _id: undefined,
                fullName: '',
                username: '',
                email: '',
                password: '',
                profilePicture: '',
                coverPicture: '',
                followers: [],
                followings: [],
                isAdmin: false,
                desc: '',
                city: '',
                from: '',
                relationship: 0,
                createdAt: undefined,
                updatedAt: undefined
            });
            const refreshToken = createRefreshToken({
                id: newUser._id,
                _id: undefined,
                fullName: '',
                username: '',
                email: '',
                password: '',
                profilePicture: '',
                coverPicture: '',
                followers: [],
                followings: [],
                isAdmin: false,
                desc: '',
                city: '',
                from: '',
                relationship: 0,
                createdAt: undefined,
                updatedAt: undefined
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.json({ accessToken });
        } catch (err) {
            handleError(res, err)
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: "User does not exist." });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

            const accessToken = createAccessToken({
                id: user._id,
                _id: undefined,
                fullName: '',
                username: '',
                email: '',
                password: '',
                profilePicture: '',
                coverPicture: '',
                followers: [],
                followings: [],
                isAdmin: false,
                desc: '',
                city: '',
                from: '',
                relationship: 0,
                createdAt: undefined,
                updatedAt: undefined
            });

            const refreshToken = createRefreshToken({
                id: user._id,
                _id: undefined,
                fullName: '',
                username: '',
                email: '',
                password: '',
                profilePicture: '',
                coverPicture: '',
                followers: [],
                followings: [],
                isAdmin: false,
                desc: '',
                city: '',
                from: '',
                relationship: 0,
                createdAt: undefined,
                updatedAt: undefined
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.json({ accessToken });
        }
        catch (err) {
            handleError(res, err)
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refreshToken;
            if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

            const decoded = await jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET as string) as IUser;
            if (!decoded) return res.status(400).json({ msg: "Please login now!" });

            const user = await User.findById(decoded.id).select('-password');
            if (!user) return res.status(400).json({ msg: "This account does not exist." });

            const accessToken = createAccessToken({
                id: user._id,
                _id: undefined,
                fullName: '',
                username: '',
                email: '',
                password: '',
                profilePicture: '',
                coverPicture: '',
                followers: [],
                followings: [],
                isAdmin: false,
                desc: '',
                city: '',
                from: '',
                relationship: 0,
                createdAt: undefined,
                updatedAt: undefined
            });

            res.json({ accessToken });
        } catch (err) {
            handleError(res, err)
        }
    },
    getUserProfile: async (req: Request, res: Response) => {
        try {
            const user = await userModel.findById(req.user?.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.json(user);
        } catch (err) {
            handleError(res, err)
        }
    },
    getUser: async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const user = await userModel.findById(userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.json(user);

        } catch (err) {
            handleError(res, err)
        }
    },
    editUserProfile: async (req: Request, res: Response) => {
        try {
            const { username, desc, city, from, relationship } = req.body;

            const user = await userModel.findById(req.user?.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            user.username = username || user.username;
            user.desc = desc || user.desc;
            user.city = city || user.city;
            user.from = from || user.from;
            user.relationship = relationship || user.relationship;

            await user.save();

            res.json({ message: 'User updated successfully.' });
        } catch (err) {
            handleError(res, err)
        }
    },
    editUserAvatar: async (req: Request, res: Response) => {
        try {
            const { avatar } = req.body;

            const user = await userModel.findById(req.user?.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            user.profilePicture = avatar || user.profilePicture;

            await user.save();

            res.json({ message: 'User avatar updated successfully.' });
        } catch (err) {
            handleError(res, err)
        }
    },
    updateFollowings: async (req: Request, res: Response) => {
        try {
            const { userId } = req.body;

            if (userId === req.user?.id) {
                return res.status(400).json({ message: 'You cannot follow yourself.' });
            }

            const user = await userModel.findById(req.user?.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const userToFollow = await userModel.findById(userId);
            if (!userToFollow) {
                return res.status(404).json({ message: 'User to follow not found.' });
            }

            if (user.followings.includes(userId)) {
                return res.status(400).json({ message: 'You already follow this user.' });
            }

            await user.updateOne({ $push: { followings: userId } });
            await userToFollow.updateOne({ $push: { followers: req.user?.id } });

            res.json({ message: 'User followed successfully.' });
        } catch (err) {
            handleError(res, err)
        }
    },
    getFollowings: async (req: Request, res: Response) => {
        try {
            const user = await userModel.findById(req.user?.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const followings = await Promise.all(
                user.followings.map((followingId) => {
                    return userModel.findById(followingId);
                })
            );

            let followingList: IUser[] = [];
            followings.map((following) => {
                const { _id, username, profilePicture } = following as IUser;
                followingList.push({
                    _id, username, profilePicture,
                    id: undefined,
                    fullName: '',
                    email: '',
                    password: '',
                    coverPicture: '',
                    followers: [],
                    followings: [],
                    isAdmin: false,
                    desc: '',
                    city: '',
                    from: '',
                    relationship: 0
                });
            });

            res.json(followingList);
        } catch (err) {
            handleError(res, err)
        }
    },
    getFollowers: async (req: Request, res: Response) => {
        try {
            const user = await userModel.findById(req.user?.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const followers = await Promise.all(
                user.followers.map((followerId) => {
                    return userModel.findById(followerId);
                })
            );

            let followerList: IUser[] = [];
            followers.map((follower) => {
                const { _id, username, profilePicture } = follower as IUser;
                followerList.push({
                    _id, username, profilePicture,
                    id: undefined,
                    fullName: '',
                    email: '',
                    password: '',
                    coverPicture: '',
                    followers: [],
                    followings: [],
                    isAdmin: false,
                    desc: '',
                    city: '',
                    from: '',
                    relationship: 0
                });
            });

            res.json(followerList);
        } catch (err) {
            handleError(res, err)
        }
    }
}

export default userController;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const error_1 = require("../utils/error");
const jwtUtils_1 = require("../utils/jwtUtils");
const userController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullName, username, email, password } = req.body;
            const user = yield user_model_1.default.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'Email already exists.' });
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = yield user_model_1.default.create({
                fullName,
                username,
                email,
                password: hashedPassword
            });
            const accessToken = (0, jwtUtils_1.createAccessToken)({
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
            const refreshToken = (0, jwtUtils_1.createRefreshToken)({
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
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "User does not exist." });
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Incorrect password." });
            const accessToken = (0, jwtUtils_1.createAccessToken)({
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
            const refreshToken = (0, jwtUtils_1.createRefreshToken)({
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
            (0, error_1.handleError)(res, err);
        }
    }),
    refreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rf_token = req.cookies.refreshToken;
            if (!rf_token)
                return res.status(400).json({ msg: "Please login now!" });
            const decoded = yield jsonwebtoken_1.default.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
            if (!decoded)
                return res.status(400).json({ msg: "Please login now!" });
            const user = yield user_model_1.default.findById(decoded.id).select('-password');
            if (!user)
                return res.status(400).json({ msg: "This account does not exist." });
            const accessToken = (0, jwtUtils_1.createAccessToken)({
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
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    getUserProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.json(user);
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const user = yield user_model_1.default.findById(userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.json(user);
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    editUserProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const { username, desc, city, from, relationship } = req.body;
            const user = yield user_model_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            user.username = username || user.username;
            user.desc = desc || user.desc;
            user.city = city || user.city;
            user.from = from || user.from;
            user.relationship = relationship || user.relationship;
            yield user.save();
            res.json({ message: 'User updated successfully.' });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    editUserAvatar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const { avatar } = req.body;
            const user = yield user_model_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            user.profilePicture = avatar || user.profilePicture;
            yield user.save();
            res.json({ message: 'User avatar updated successfully.' });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    updateFollowings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e, _f;
        try {
            const { userId } = req.body;
            if (userId === ((_d = req.user) === null || _d === void 0 ? void 0 : _d.id)) {
                return res.status(400).json({ message: 'You cannot follow yourself.' });
            }
            const user = yield user_model_1.default.findById((_e = req.user) === null || _e === void 0 ? void 0 : _e.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const userToFollow = yield user_model_1.default.findById(userId);
            if (!userToFollow) {
                return res.status(404).json({ message: 'User to follow not found.' });
            }
            if (user.followings.includes(userId)) {
                return res.status(400).json({ message: 'You already follow this user.' });
            }
            yield user.updateOne({ $push: { followings: userId } });
            yield userToFollow.updateOne({ $push: { followers: (_f = req.user) === null || _f === void 0 ? void 0 : _f.id } });
            res.json({ message: 'User followed successfully.' });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    getFollowings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g;
        try {
            const user = yield user_model_1.default.findById((_g = req.user) === null || _g === void 0 ? void 0 : _g.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const followings = yield Promise.all(user.followings.map((followingId) => {
                return user_model_1.default.findById(followingId);
            }));
            let followingList = [];
            followings.map((following) => {
                const { _id, username, profilePicture } = following;
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
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    getFollowers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _h;
        try {
            const user = yield user_model_1.default.findById((_h = req.user) === null || _h === void 0 ? void 0 : _h.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const followers = yield Promise.all(user.followers.map((followerId) => {
                return user_model_1.default.findById(followerId);
            }));
            let followerList = [];
            followers.map((follower) => {
                const { _id, username, profilePicture } = follower;
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
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.default.find().select('-password');
            res.json(users);
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    })
};
exports.default = userController;

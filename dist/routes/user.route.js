"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter = require('express').Router();
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
userRouter.post('/register', user_controller_1.default.register);
userRouter.post('/login', user_controller_1.default.login);
userRouter.get('/refresh_token', auth_middleware_1.default, user_controller_1.default.refreshToken);
userRouter.get('/profile', auth_middleware_1.default, user_controller_1.default.getUserProfile);
userRouter.get('/users/:id', auth_middleware_1.default, user_controller_1.default.getUser);
userRouter.post('/follow', auth_middleware_1.default, user_controller_1.default.updateFollowings);
userRouter.put('/profile', auth_middleware_1.default, user_controller_1.default.editUserProfile);
userRouter.put('/edit-avatar', auth_middleware_1.default, user_controller_1.default.editUserAvatar);
userRouter.get('/all-followings', auth_middleware_1.default, user_controller_1.default.getFollowings);
userRouter.get('/all-followers', auth_middleware_1.default, user_controller_1.default.getFollowers);
exports.default = userRouter;

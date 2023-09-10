const userRouter = require('express').Router();
import userController from "../controllers/user.controller";
import authUser from "../middlewares/auth.middleware";

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/profile', authUser, userController.getUserProfile);
userRouter.get('/users/:id', authUser, userController.getUser);
userRouter.post('/follow', authUser, userController.updateFollowings);
userRouter.put('/profile', authUser, userController.editUserProfile);
userRouter.get('/all-followings', authUser, userController.getFollowings);
userRouter.get('/all-followers', authUser, userController.getFollowers);

export default userRouter;
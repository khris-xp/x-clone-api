const userRouter = require('express').Router();
import userController from "../controllers/user.controller";
import authUser from "../middlewares/auth.middleware";

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/refresh_token', authUser, userController.refreshToken);
userRouter.get('/profile', authUser, userController.getUserProfile);
userRouter.get('/users/:id', authUser, userController.getUser);
userRouter.post('/follow/:id', authUser, userController.updateFollowings);
userRouter.post('/unfollow/:id', authUser, userController.updateUnFollowings);
userRouter.put('/profile', authUser, userController.editUserProfile);
userRouter.put('/edit-avatar', authUser, userController.editUserAvatar);
userRouter.get('/all-followings', authUser, userController.getFollowings);
userRouter.get('/all-followers', authUser, userController.getFollowers);
userRouter.get('/', authUser, userController.getAllUsers);

export default userRouter;
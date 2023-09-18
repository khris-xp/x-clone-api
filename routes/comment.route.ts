const commentRouter = require('express').Router();
import commentController from "../controllers/comment.controller";
import authUser from "../middlewares/auth.middleware";

commentRouter.get('/:id', commentController.getComments);
commentRouter.post('/', authUser, commentController.createComments);
commentRouter.patch('/:id', authUser, commentController.updateComments);
commentRouter.delete('/:id', authUser, commentController.deleteComments);

export default commentRouter;
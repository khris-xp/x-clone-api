const uploadRouter = require('express').Router();
import uploadController from "../controllers/upload.controller";
import authUser from "../middlewares/auth.middleware";

uploadRouter.post('/upload', authUser, uploadController.uploadImage);
uploadRouter.post('/destroy', authUser, uploadController.deleteImage);

export default uploadRouter;
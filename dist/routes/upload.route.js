"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadRouter = require('express').Router();
const upload_controller_1 = __importDefault(require("../controllers/upload.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
uploadRouter.post('/upload', auth_middleware_1.default, upload_controller_1.default.uploadImage);
uploadRouter.post('/destroy', auth_middleware_1.default, upload_controller_1.default.deleteImage);
exports.default = uploadRouter;

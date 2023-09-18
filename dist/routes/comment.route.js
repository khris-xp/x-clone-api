"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentRouter = require('express').Router();
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
commentRouter.get('/:id', comment_controller_1.default.getComments);
commentRouter.post('/', auth_middleware_1.default, comment_controller_1.default.createComments);
commentRouter.patch('/:id', auth_middleware_1.default, comment_controller_1.default.updateComments);
commentRouter.delete('/:id', auth_middleware_1.default, comment_controller_1.default.deleteComments);
exports.default = commentRouter;

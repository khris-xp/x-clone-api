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
const comment_model_1 = __importDefault(require("../models/comment.model"));
const tweet_model_1 = __importDefault(require("../models/tweet.model"));
const error_1 = require("../utils/error");
const commentController = {
    getComments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comments = yield comment_model_1.default.find({ tweetId: req.params.id }).sort('-createdAt');
            res.json(comments);
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    createComments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { content, tweetId } = req.body;
            const _id = req.user;
            const tweet = yield tweet_model_1.default.findById(tweetId);
            if (!tweet)
                return res.status(404).json({ message: 'Tweet not found' });
            const comment = yield comment_model_1.default.create({
                content,
                tweetId,
                userId: _id
            });
            res.json(comment);
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    updateComments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { content, tweetId } = req.body;
            const comment = yield comment_model_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.user }, {
                content,
                tweetId
            }, { new: true });
            if (!comment)
                return res.status(404).json({ message: 'Comment not found' });
            res.json(comment);
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    deleteComments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comment = yield comment_model_1.default.findOneAndDelete({ _id: req.params.id, userId: req.user });
            if (!comment)
                return res.status(404).json({ message: 'Comment not found' });
            res.json(comment);
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    })
};
exports.default = commentController;

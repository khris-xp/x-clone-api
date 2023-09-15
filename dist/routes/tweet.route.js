"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweetRouter = require('express').Router();
const tweet_controller_1 = __importDefault(require("../controllers/tweet.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
tweetRouter.post('/', auth_middleware_1.default, tweet_controller_1.default.createTweet);
tweetRouter.get('/', auth_middleware_1.default, tweet_controller_1.default.getTweets);
tweetRouter.get('/:id', auth_middleware_1.default, tweet_controller_1.default.getTweet);
tweetRouter.get('/user/:id', auth_middleware_1.default, tweet_controller_1.default.getTweetByUser);
tweetRouter.post('/:id/like', auth_middleware_1.default, tweet_controller_1.default.likeTweet);
tweetRouter.post('/:id/retweet', auth_middleware_1.default, tweet_controller_1.default.reTweet);
exports.default = tweetRouter;

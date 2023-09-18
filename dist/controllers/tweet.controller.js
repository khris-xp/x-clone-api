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
const tweet_model_1 = __importDefault(require("../models/tweet.model"));
const error_1 = require("../utils/error");
const tweetController = {
    createTweet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { desc, img } = req.body;
            const createdBy = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!desc)
                return res.status(400).json({ msg: "Please add your tweet." });
            const newTweet = new tweet_model_1.default({
                desc, img, createdBy
            });
            yield newTweet.save();
            return res.json({ msg: "Created tweet!" });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    getTweets: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tweets = yield tweet_model_1.default.find({});
            return res.json({ tweets });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    getTweet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tweet = yield tweet_model_1.default.findById(req.params.id);
            if (!tweet)
                return res.status(400).json({ msg: "Tweet not found." });
            return res.json({ tweet });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    updateTweet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const { desc, img } = req.body;
            const createdBy = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id;
            if (!desc)
                return res.status(400).json({ msg: "Please add your tweet." });
            yield tweet_model_1.default.findOneAndUpdate({ _id: req.params.id }, {
                desc, img, createdBy
            });
            return res.json({ msg: "Updated tweet!" });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    deleteTweet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield tweet_model_1.default.findByIdAndDelete(req.params.id);
            return res.json({ msg: "Deleted tweet!" });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    likeTweet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const tweet = yield tweet_model_1.default.findById(req.params.id);
            if (!tweet)
                return res.status(400).json({ msg: "Tweet not found." });
            if (tweet.likes.find(like => { var _a; return like === ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id); }))
                return res.status(400).json({ msg: "You already liked this tweet." });
            yield tweet_model_1.default.findOneAndUpdate({ _id: req.params.id }, {
                $push: { likes: (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id }
            }, { new: true });
            return res.json({ msg: "Liked tweet!" });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    dislikeTweet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        try {
            const tweetId = req.params.id;
            const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
            const tweet = yield tweet_model_1.default.findById(tweetId);
            if (!tweet) {
                return res.status(404).json({ message: "Tweet not found." });
            }
            const userLiked = tweet.likes.includes(userId);
            if (!userLiked) {
                return res.status(400).json({ message: "You already unliked this tweet." });
            }
            yield tweet_model_1.default.findByIdAndUpdate(tweetId, {
                $pull: { likes: userId },
            }, { new: true });
            res.json({ message: "Tweet disliked successfully." });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    getTweetByUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tweets = yield tweet_model_1.default.find({ createdBy: req.params.id });
            return res.json({ tweets });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    reTweet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        try {
            const tweet = yield tweet_model_1.default.findById(req.params.id);
            if (!tweet)
                return res.status(400).json({ msg: "Tweet not found." });
            if (tweet.retweets.find(retweet => { var _a; return retweet === ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id); }))
                return res.status(400).json({ msg: "You already retweeted this tweet." });
            yield tweet_model_1.default.findOneAndUpdate({ _id: req.params.id }, {
                $push: { retweets: (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.id }
            }, { new: true });
            return res.json({ msg: "Retweeted tweet!" });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    unRetweet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        try {
            const tweetId = req.params.id;
            const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.id;
            const tweet = yield tweet_model_1.default.findById(tweetId);
            if (!tweet) {
                return res.status(404).json({ message: "Tweet not found." });
            }
            const userRetweeted = tweet.retweets.includes(userId);
            if (!userRetweeted) {
                return res.status(400).json({ message: "You already un-retweeted this tweet." });
            }
            yield tweet_model_1.default.findByIdAndUpdate(tweetId, {
                $pull: { retweets: userId },
            }, { new: true });
            return res.json({ message: "Un-retweeted tweet!" });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
};
exports.default = tweetController;

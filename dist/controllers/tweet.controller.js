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
        var _d;
        try {
            const tweet = yield tweet_model_1.default.findById(req.params.id);
            if (!tweet)
                return res.status(400).json({ msg: "Tweet not found." });
            if (tweet.retweets.find(retweet => { var _a; return retweet === ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id); }))
                return res.status(400).json({ msg: "You already retweeted this tweet." });
            yield tweet_model_1.default.findOneAndUpdate({ _id: req.params.id }, {
                $push: { retweets: (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.id }
            }, { new: true });
            return res.json({ msg: "Retweeted tweet!" });
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    })
};
exports.default = tweetController;

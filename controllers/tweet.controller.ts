import { Request, Response } from "express";
import tweetModel from "../models/tweet.model";
import { handleError } from "../utils/error";

const tweetController = {
    createTweet: async (req: Request, res: Response) => {
        try {
            const { desc, img } = req.body;

            const createdBy = req?.user?.id;

            if (!desc) return res.status(400).json({ msg: "Please add your tweet." });

            const newTweet = new tweetModel({
                desc, img, createdBy
            });

            await newTweet.save();

            return res.json({ msg: "Created tweet!" });
        } catch (err) {
            handleError(res, err);
        }
    },
    getTweets: async (req: Request, res: Response) => {
        try {
            const tweets = await tweetModel.find({});

            return res.json({ tweets });
        } catch (err) {
            handleError(res, err);
        }
    },
    getTweet: async (req: Request, res: Response) => {
        try {
            const tweet = await tweetModel.findById(req.params.id);

            if (!tweet) return res.status(400).json({ msg: "Tweet not found." });

            return res.json({ tweet });
        }
        catch (err) {
            handleError(res, err);
        }
    },
    updateTweet: async (req: Request, res: Response) => {
        try {
            const { desc, img } = req.body;

            const createdBy = req?.user?.id;

            if (!desc) return res.status(400).json({ msg: "Please add your tweet." });

            await tweetModel.findOneAndUpdate({ _id: req.params.id }, {
                desc, img, createdBy
            });

            return res.json({ msg: "Updated tweet!" });
        } catch (err) {
            handleError(res, err);
        }
    },
    deleteTweet: async (req: Request, res: Response) => {
        try {
            await tweetModel.findByIdAndDelete(req.params.id);

            return res.json({ msg: "Deleted tweet!" });
        } catch (err) {
            handleError(res, err);
        }
    },
    likeTweet: async (req: Request, res: Response) => {
        try {
            const tweet = await tweetModel.findById(req.params.id);

            if (!tweet) return res.status(400).json({ msg: "Tweet not found." });

            if (tweet.likes.find(like => like === req?.user?.id)) return res.status(400).json({ msg: "You already liked this tweet." });

            await tweetModel.findOneAndUpdate({ _id: req.params.id }, {
                $push: { likes: req?.user?.id }
            }, { new: true });

            return res.json({ msg: "Liked tweet!" });
        } catch (err) {
            handleError(res, err);
        }
    },
    dislikeTweet: async (req: Request, res: Response) => {
        try {
            const tweetId = req.params.id;
            const userId = req.user?.id;

            const tweet = await tweetModel.findById(tweetId);

            if (!tweet) {
                return res.status(404).json({ message: "Tweet not found." });
            }

            const userLiked = tweet.likes.includes(userId);

            if (!userLiked) {
                return res.status(400).json({ message: "You already unliked this tweet." });
            }

            await tweetModel.findByIdAndUpdate(tweetId, {
                $pull: { likes: userId },
            }, { new: true });

            res.json({ message: "Tweet disliked successfully." });
        } catch (err) {
            handleError(res, err);
        }
    },
    getTweetByUser: async (req: Request, res: Response) => {
        try {
            const tweets = await tweetModel.find({ createdBy: req.params.id });

            return res.json({ tweets });
        } catch (err) {
            handleError(res, err);
        }
    },
    reTweet: async (req: Request, res: Response) => {
        try {
            const tweet = await tweetModel.findById(req.params.id);

            if (!tweet) return res.status(400).json({ msg: "Tweet not found." });

            if (tweet.retweets.find(retweet => retweet === req?.user?.id)) return res.status(400).json({ msg: "You already retweeted this tweet." });

            await tweetModel.findOneAndUpdate({ _id: req.params.id }, {
                $push: { retweets: req?.user?.id }
            }, { new: true });

            return res.json({ msg: "Retweeted tweet!" });
        } catch (err) {
            handleError(res, err);
        }
    },
    unRetweet: async (req: Request, res: Response) => {
        try {
            const tweetId = req.params.id;
            const userId = req.user?.id;

            const tweet = await tweetModel.findById(tweetId);

            if (!tweet) {
                return res.status(404).json({ message: "Tweet not found." });
            }

            const userRetweeted = tweet.retweets.includes(userId);

            if (!userRetweeted) {
                return res.status(400).json({ message: "You already un-retweeted this tweet." });
            }

            await tweetModel.findByIdAndUpdate(tweetId, {
                $pull: { retweets: userId },
            }, { new: true });

            return res.json({ message: "Un-retweeted tweet!" });
        } catch (err) {
            handleError(res, err);
        }
    },
}

export default tweetController;
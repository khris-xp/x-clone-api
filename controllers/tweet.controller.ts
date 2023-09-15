import { Request, Response } from "express";
import tweetModel from "../models/tweet.model";


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
            return res.status(500).json({ msg: (err as Error).message });
        }
    },
    getTweets: async (req: Request, res: Response) => {
        try {
            const tweets = await tweetModel.find({});

            return res.json({ tweets });
        } catch (err) {
            return res.status(500).json({ msg: (err as Error).message });
        }
    },
    getTweet: async (req: Request, res: Response) => {
        try {
            const tweet = await tweetModel.findById(req.params.id);

            if (!tweet) return res.status(400).json({ msg: "Tweet not found." });

            return res.json({ tweet });
        }
        catch (err) {
            return res.status(500).json({ msg: (err as Error).message });
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
            return res.status(500).json({ msg: (err as Error).message });
        }
    },
    deleteTweet: async (req: Request, res: Response) => {
        try {
            await tweetModel.findByIdAndDelete(req.params.id);

            return res.json({ msg: "Deleted tweet!" });
        } catch (err) {
            return res.status(500).json({ msg: (err as Error).message });
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
            return res.status(500).json({ msg: (err as Error).message });
        }
    },
    getTweetByUser: async (req: Request, res: Response) => {
        try {
            const tweets = await tweetModel.find({ createdBy: req.params.id });

            return res.json({ tweets });
        } catch (err) {
            return res.status(500).json({ msg: (err as Error).message });
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
            return res.status(500).json({ msg: (err as Error).message });
        }
    }
}

export default tweetController;
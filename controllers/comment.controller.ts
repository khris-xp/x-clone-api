import { Request, Response } from "express";
import commentModel from "../models/comment.model";
import tweetModel from "../models/tweet.model";
import { handleError } from '../utils/error';

const commentController = {
    getComments: async (req: Request, res: Response) => {
        try {
            const comments = await commentModel.find({ tweetId: req.params.id }).sort('-createdAt');
            res.json(comments);
        } catch (err) {
            handleError(res, err);
        }
    },
    createComments: async (req: Request, res: Response) => {
        try {
            const { content, tweetId } = req.body;
            const _id = req.user;

            const tweet = await tweetModel.findById(tweetId);
            if (!tweet) return res.status(404).json({ message: 'Tweet not found' });

            const comment = await commentModel.create({
                content,
                tweetId,
                userId: _id
            });

            res.json(comment);
        } catch (err) {
            handleError(res, err);
        }
    },
    updateComments: async (req: Request, res: Response) => {
        try {
            const { content, tweetId } = req.body;

            const comment = await commentModel.findOneAndUpdate({ _id: req.params.id, userId: req.user }, {
                content,
                tweetId
            }, { new: true });
            if (!comment) return res.status(404).json({ message: 'Comment not found' });
            res.json(comment);
        } catch (err) {
            handleError(res, err);
        }
    },
    deleteComments: async (req: Request, res: Response) => {
        try {
            const comment = await commentModel.findOneAndDelete({ _id: req.params.id, userId: req.user });
            if (!comment) return res.status(404).json({ message: 'Comment not found' });
            res.json(comment);
        } catch (err) {
            handleError(res, err);
        }
    }
};

export default commentController;
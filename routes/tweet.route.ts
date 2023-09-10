const tweetRouter = require('express').Router();
import tweetController from "../controllers/tweet.controller";
import authUser from "../middlewares/auth.middleware";

tweetRouter.post('/', authUser, tweetController.createTweet);
tweetRouter.get('/', authUser, tweetController.getTweets);
tweetRouter.get('/:id', authUser, tweetController.getTweet);

export default tweetRouter;
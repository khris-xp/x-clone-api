import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    retweets: {
        type: Array,
        default: []
    },
    createdBy: {
        type: String,
        ref: "User"
    }
}, { timestamps: true });

export default mongoose.model('Tweet', tweetSchema);
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    desc: {
        type: String,
        max: 500
    },
    createdBy: {
        type: String,
        ref: "User"
    },
    tweetId: {
        type: String,
        ref: "Tweet"
    }
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
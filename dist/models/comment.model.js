"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("Comment", commentSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tweetSchema = new mongoose_1.default.Schema({
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
    comments: {
        type: Array,
        default: []
    },
    createdBy: {
        type: String,
        ref: "User"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Tweet', tweetSchema);

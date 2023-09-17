"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, 'Please enter a full name.'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please enter a username.'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        trim: true
    },
    profilePicture: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    coverPicture: {
        type: String,
        default: 'https://images.unsplash.com/photo-1596387451750-f7bfb51461ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', userSchema);

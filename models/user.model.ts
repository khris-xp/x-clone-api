import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        default: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
    },
    coverPicture: {
        type: String,
        default: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000'
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

export default mongoose.model('User', userSchema);
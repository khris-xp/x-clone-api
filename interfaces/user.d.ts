export interface IUser {
    _id: mongoose.Schema.Types.ObjectId;
    id: mongoose.Schema.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    coverPicture: string;
    followers: string[];
    followings: string[];
    isAdmin: boolean;
    desc: string;
    city: string;
    from: string;
    relationship: number;
    createdAt?: Date;
    updatedAt?: Date;
}
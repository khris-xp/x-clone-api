import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import tweetRouter from '../routes/tweet.route';
import uploadRouter from '../routes/upload.route';
import userRouter from '../routes/user.route';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

const port = process.env.PORT || 8081;
const URL = process.env.MONGODB_URI;

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World, from X CLone API.' });
});

app.use('/user', userRouter);
app.use('/api', uploadRouter);
app.use('/api/tweet', tweetRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running`);
});

mongoose.connect(URL as string).then(() => console.log('MongoDB connected')).catch(err => console.log(err));
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
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

const port = process.env.PORT;
const URL = process.env.MONGODB_URI;

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World, from X CLone API.' });
});

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

mongoose.connect(URL as string).then(() => console.log('MongoDB connected')).catch(err => console.log(err));
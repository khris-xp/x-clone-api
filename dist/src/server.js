"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const mongoose_1 = __importDefault(require("mongoose"));
const comment_route_1 = __importDefault(require("../routes/comment.route"));
const tweet_route_1 = __importDefault(require("../routes/tweet.route"));
const upload_route_1 = __importDefault(require("../routes/upload.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    useTempFiles: true
}));
const port = process.env.PORT || 8081;
const URL = process.env.MONGODB_URI;
app.get('/', (req, res) => {
    res.json({ message: 'Hello World, from X CLone API.' });
});
app.use('/user', user_route_1.default);
app.use('/api', upload_route_1.default);
app.use('/api/tweet', tweet_route_1.default);
app.use('/api/comment', comment_route_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running`);
});
mongoose_1.default.connect(URL).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

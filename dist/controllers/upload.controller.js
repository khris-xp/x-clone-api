"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const error_1 = require("../utils/error");
const cloudinary = require('cloudinary').v2;
dotenv_1.default.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const uploadController = {
    uploadImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ msg: "No files were uploaded." });
            }
            const file = Array.isArray(req.files.file) ? req.files.file[0] : req.files.file;
            if (file.size > 1024 * 1024) {
                removeTmp(file.tempFilePath);
                return res.status(400).json({ msg: "Size too large." });
            }
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath);
                return res.status(400).json({ msg: "File format is incorrect." });
            }
            cloudinary.uploader.upload(file.tempFilePath, { folder: "X-Clone" }, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    throw err;
                removeTmp(file.tempFilePath);
                res.json({ public_id: result === null || result === void 0 ? void 0 : result.public_id, url: result === null || result === void 0 ? void 0 : result.secure_url });
            }));
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    }),
    deleteImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { public_id } = req.body;
            if (!public_id)
                return res.status(400).json({ msg: "No images selected." });
            cloudinary.uploader.destroy(public_id, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    throw err;
                res.json({ msg: "Deleted image" });
            }));
        }
        catch (err) {
            (0, error_1.handleError)(res, err);
        }
    })
};
function removeTmp(tempFilePath) {
    fs_1.default.unlink(tempFilePath, (err) => {
        if (err instanceof Error) {
            return err;
        }
    });
}
exports.default = uploadController;

import cloudinaryResult from 'cloudinary';
import dotenv from 'dotenv';
import { Request, Response } from "express";
import fs from 'fs';
const cloudinary = require('cloudinary').v2;

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const uploadController = {
    uploadImage: async (req: Request, res: Response) => {
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

            cloudinary.uploader.upload(file.tempFilePath, { folder: "X-Clone" }, async (err: cloudinaryResult.UploadApiErrorResponse | null, result: cloudinaryResult.UploadApiResponse | undefined) => {
                if (err) throw err;
                removeTmp(file.tempFilePath);
                res.json({ public_id: result?.public_id, url: result?.secure_url });
            })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ msg: err.message });
            } else {
                return res.status(500).json({ msg: "An error occurred." });
            }
        }
    },
    deleteImage: async (req: Request, res: Response) => {
        try {
            const { public_id } = req.body;
            if (!public_id) return res.status(400).json({ msg: "No images selected." });

            cloudinary.uploader.destroy(public_id, async (err: cloudinaryResult.UploadApiErrorResponse | null, result: cloudinaryResult.UploadApiResponse | undefined) => {
                if (err) throw err;

                res.json({ msg: "Deleted image" });
            })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ msg: err.message });
            } else {
                return res.status(500).json({ msg: "An error occurred." });
            }
        }
    }
}

function removeTmp(tempFilePath: string) {
    fs.unlink(tempFilePath, (err) => {
        if (err instanceof Error) {
            return err;
        }
    })
}

export default uploadController;
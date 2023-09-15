"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const authUser = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(400).json({ msg: "Invalid Authentication." });
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                const error = err;
                return res.status(400).json({ msg: error.message });
            }
            req.user = user;
            next();
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({ msg: error.message });
    }
};
exports.default = authUser;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, err) => {
    if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
    }
    else {
        return res.status(500).json({ message: 'An unknown error occurred.' });
    }
};
exports.handleError = handleError;

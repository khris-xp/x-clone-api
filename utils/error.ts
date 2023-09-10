import { Response } from 'express';

export const handleError = (res: Response, err: Error | unknown) => {
    if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
    } else {
        return res.status(500).json({ message: 'An unknown error occurred.' });
    }
};
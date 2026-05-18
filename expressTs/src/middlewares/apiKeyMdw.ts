import { Request, Response, NextFunction } from "express";

export const apikeygMid = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === 'PW123') {
        next();
    } else {
        res.status(403).json({ message: 'tidak memiliki akses' })
    }

}
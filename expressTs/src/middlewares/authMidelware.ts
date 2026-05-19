import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: "akses di tolak, tidak menemukan token"});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decode;
        next();
    } catch (error) {
        next(error)
    }
}
import { Request, Response, NextFunction } from "express";

export const authorizationRole = (allowedRols: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user;
            if (!user) {
                return res.status(400).json({message:"anda belum terautentikasi"})
            }

            if (!allowedRols.includes(user.role)) {
                return res.status(403).json({
                    message: `akses di tolak anda harus memiliki role ${allowedRols.join(', ')}`
                })
            }

            next();
        } catch (error) {
            next(error)
        }
    }
}
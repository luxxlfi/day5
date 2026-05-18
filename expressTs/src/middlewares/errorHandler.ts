import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const statusCod = err.statusCod || 500;
    const message = err.message || "internal server Error"

    res.status(statusCod).json({
        status: "error",
        message: message
    })
} 
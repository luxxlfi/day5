import { Request, Response, NextFunction } from "express";

export const logMid = (req:Request, res:Response, next: NextFunction) => {
    console.log("logMd");
    next();
}
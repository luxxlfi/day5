import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);

        const hashedPw = await bcrypt.hash(password, salt);

        const image = req.file ? req.file.filename : null;
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPw,
                image
            }
        });

        return res.status(200).json({
            message: "registrasi berhasil",
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                image: newUser.image
            }
        })
    } catch (error) {
        next()
    }
}

export const Userlogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        const isMatch = user ? await bcrypt.compare(password, user.password) : false;

        if (!user || !isMatch) {
            return res.status(401).json({ message: "email atau password salah" })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "login berhasil",
            token,
        })

    } catch (error) {
        next()
    }
}
import { NextFunction, Request, Response, } from "express";
import prisma from "../lib/prisma";
import { use } from "react";
import { error } from "node:console";
import { json } from "zod";

export const hallo = (req: Request, res: Response) => {
    return res.send("haloo")
};

export const profile = (req: Request, res: Response) => {
    const { name } = req.params;

    return res.json({
        massage: `halloo ${name}`
    });
};

export const allUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany();

        return res.status(200).json({
            message: "show all user",
            data: users
        });
    } catch (error) {
        next(error);
    }
}

export const login = (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    return res.status(666).json({
        massage: "login berhasil",
        data: {
            name,
            email,
            password
        }
    });
};

export const transfer = async (req: Request, res: Response, next:NextFunction) => {

    const { Idpengirim, Idpenerima, jumlah } = req.body;

    const pengirim = await prisma.user.findUnique({
        where: {
            id: Number(Idpengirim)
        }
    });
    
    if (!pengirim) {
        return res.status(404).json({
            message: "id pengirim salah"
        })
    }

    if (pengirim.cash < Number(jumlah)) {
        return res.status(404).json({
            message: "saldo tidak cukup"
        })
    }

    try {
        await prisma.$transaction([
            prisma.user.update({
                where: { id: Number(Idpengirim) },
                data: { cash: { decrement: Number(jumlah) } }
            }),
            prisma.user.update({
                where: { id: Number(Idpenerima) },
                data: { cash: { increment: Number(jumlah) } }
            })
        ])

        return res.status(200).json({ message: "transaksi berhasil" })

    } catch (error) {
        next (error);
    }
}


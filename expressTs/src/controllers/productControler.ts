import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import { use } from "react";
import { error } from "node:console";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, description, stock } = req.body;
        const userId = (req as any).user.id;
        const image = req.file ? req.file.filename: null;
        const newProduct = await prisma.product.create({
            data: {
                name: name,
                price: Number(price),
                stock: Number(stock),
                description: description,
                userId: userId,
                image
            }
        });

        return res.status(200).json({
            massage: "production created!",
            data: newProduct
        });

    } catch (error) {
        next(error);
    }
};

export const getAllproduct = async (req: Request, res: Response) => {
    try {
        const { search, minP, sortBy, owName } = req.query;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: search as string,
                    mode: 'insensitive'
                },
                price: {
                    gte: minP ? Number(minP) : 0
                },
                author: {
                    name: {
                        contains: owName as string,
                        mode: 'insensitive'
                    }
                }
            },
            take: limit,
            skip: skip,
            orderBy: {
                createdAt: sortBy === 'old' ? 'asc' : 'desc'
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        const totalData = await prisma.product.count();
        return res.status(200).json({
            massage: "production fetched!",
            meta: {
                current_paage: page,
                limit: limit,
                total_data: totalData,
                total_page: Math.ceil(totalData / limit)
            },
            data: products
        });

    } catch (error) {
        return res.status(500).json({
            massage: "failed fetch!",
            error: error
        });
    }
}

export const getProductbyId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!product) {
            return res.status(404).json({ masssage: "product not found" });
        }
        return res.status(200).json({
            massage: "product fatched",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            massage: "failed fetch product",
            error: error
        });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, description, stock } = req.body;

        const updatedProduct = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                price: Number(price),
                stock: Number(stock),
                description
            }
        });

        return res.status(200).json({
            masssage: "product updated",
            data: updatedProduct
        })
    } catch (error) {
        return res.status(500).json({
            massage: "failed updated product",
            error: error
        });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({
            massage: "product deleted"
        });

    } catch (error) {
        return res.status(500).json({
            massage: "failed deledete product",
            error: error
        });
    }
}

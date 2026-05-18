import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(1, "Minimal 1 karakter"),
    price: z.coerce.number().positive("harga tidak boleh minus"),
    stock: z.number().min(5, "stock minimal 5"),
    description: z.string().optional(),
    userId: z.coerce.number().int("User id harus angka bulat")
})
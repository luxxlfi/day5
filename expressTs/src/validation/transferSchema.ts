import { z } from 'zod';

export const transferSchema = z.object({
    Idpengirim: z.coerce.number().int("pastikan id yang di masukan benar"),
    Idpenerima: z.coerce.number().int("pastikan iad yang di masukan benar"),
    jumlah: z.coerce.number().positive("masukan nominal yang benar")
}).refine(
    (data) => data.Idpengirim !== data.Idpenerima,
    {
        message:"tidak bisa kirim ke diri sendiri",
        path: ["Idpenerima"]
    }
);

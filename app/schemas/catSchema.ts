import { z } from "zod";

export const CatSchema = z.object({
    id: z.number(),
    microchip: z.string().nullable(),
    name: z.string(),
    description: z.string().nullable(),
    dateOfBirth: z.string().nullable(),
    sex: z.enum(['Male', 'Female']).nullable(),
    breed: z.string().nullable(),
    image: z.string().nullable()
});

export type Cat = z.infer<typeof CatSchema>;
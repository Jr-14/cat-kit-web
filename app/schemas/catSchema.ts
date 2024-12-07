import { z } from "zod";

export const CatSchema = z.object({
  id: z.number(),
  microchip: z.string().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  sex: z.enum(["Male", "Female"]).nullable(),
  breed: z.string().nullable(),
  weight: z.coerce.number(),
  image: z.string().nullable(),
});

export const CatDetailSchema = CatSchema.pick({
  id: true,
  name: true,
  dateOfBirth: true,
  weight: true,
  image: true,
});

export const CatDetailsSchema = z.array(CatDetailSchema);

export const CreateNewCatSchema = CatSchema.omit({ id: true, image: true });

export type Cat = z.infer<typeof CatSchema>;

export type NewCat = z.infer<typeof CreateNewCatSchema>;

export type CatDetail = z.infer<typeof CatDetailSchema>;

export type CatDetails = z.infer<typeof CatDetailsSchema>;

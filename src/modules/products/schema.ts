import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3).max(50),
  price: z.number(),
  description: z.string().optional()
});

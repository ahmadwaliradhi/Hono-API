import z from "zod";

export const createReviewSchema = z.object({
  name: z.string().min(3).max(50),
  rating: z.number().min(1).max(5),
  comment: z.string().optional()
});

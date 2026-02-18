import z from "zod";

export const createToDoSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  completed: z.boolean()
});

export const updateToDoSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  completed: z.boolean().optional()
});

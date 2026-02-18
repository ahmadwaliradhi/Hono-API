import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createReviewSchema } from "./schema";

export const reviewsRouter = new Hono()
  .get("/", (c) => {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    return c.json({ message: "Get all reviews", authorization });
  })
  .get("/:id", (c) => {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const { id } = c.req.param();
    return c.json({ message: `Get single review ${id}`, authorization });
  })
  .post("/", zValidator("json", createReviewSchema), (c) => {
    const body = c.req.valid("json");
    return c.json({ message: "Create a new review is successful", body });
  });

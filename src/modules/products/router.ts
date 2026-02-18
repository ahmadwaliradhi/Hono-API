import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createProductSchema } from "./schema";

export const productsRouter = new Hono()
  .get("/", (c) => {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    return c.json({ message: "Get all products", authorization });
  })
  .get("/:id", (c) => {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const { id } = c.req.param();
    return c.json({ message: `Get single product ${id}`, authorization });
  })
  .post("/", zValidator("json", createProductSchema), (c) => {
    const body = c.req.valid("json");
    return c.json({ message: "Create a new product is successful", body });
  });

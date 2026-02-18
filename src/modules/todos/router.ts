import { Hono } from "hono";
import { prisma } from "../../utils/prisma";
import { zValidator } from "@hono/zod-validator";
import { createToDoSchema, updateToDoSchema } from "./schema";

export const todosRouter = new Hono()
  .get("/", async (c) => {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const todos = await prisma.toDo.findMany();
    return c.json({ message: "Get all todos", todos, authorization });
  })
  .get("/:id", async (c) => {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const { id } = c.req.param();
    const todo = await prisma.toDo.findUnique({
      where: { id: Number(id) }
    });
    if (!todo) {
      return c.json({ error: "Todo not found" }, 404);
    }
    return c.json({ message: `Get single todo ${id}`, todo, authorization });
  })
  .post("/", zValidator("json", createToDoSchema), async (c) => {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const { title, content, completed } = await c.req.json<{
      title: string;
      content: string;
      completed: boolean;
    }>();
    const todo = await prisma.toDo.create({
      data: { title, content, completed }
    });
    return c.json({ message: "Todo created", todo }, 201);
  })
  .put("/:id", zValidator("json", updateToDoSchema), async (c) => {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const { id } = c.req.param();
    const { title, content, completed } = await c.req.json<{
      title?: string;
      content?: string;
      completed?: boolean;
    }>();
    const existing = await prisma.toDo.findUnique({
      where: { id: Number(id) }
    });
    if (!existing) {
      return c.json({ error: "Todo not found" }, 404);
    }
    const todo = await prisma.toDo.update({
      where: { id: Number(id) },
      data: { title, content, completed }
    });
    return c.json({ message: "Todo updated", todo });
  })
  .delete("/:id", async (c) => {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const { id } = c.req.param();
    const existing = await prisma.toDo.findUnique({
      where: { id: Number(id) }
    });
    if (!existing) {
      return c.json({ error: "Todo not found" }, 404);
    }
    await prisma.toDo.delete({
      where: { id: Number(id) }
    });
    return c.json({ message: "Todo deleted" });
  });

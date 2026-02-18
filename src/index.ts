import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { productsRouter } from "./modules/products/router";
import { reviewsRouter } from "./modules/reviews/router";
import { todosRouter } from "./modules/todos/router";
import "dotenv/config";

const app = new Hono()
  .route("/products", productsRouter)
  .route("/reviews", reviewsRouter)
  .route("/todos", todosRouter);

serve(
  {
    fetch: app.fetch,
    port: 8000
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

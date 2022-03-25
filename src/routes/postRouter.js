import { Router } from "express";
import { getPosts, createPost, handleLike } from "../controllers/postController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import postSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.get("/posts", validateTokenMiddleware, getPosts);
postRouter.post(
  "/posts",
  validateTokenMiddleware,
  validateSchemaMiddleware(postSchema),
  createPost
);
postRouter.post("/posts/:id/:type", validateTokenMiddleware, handleLike)

export default postRouter;

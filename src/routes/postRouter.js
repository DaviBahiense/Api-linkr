import { Router } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { postSchema, updatePostSchema } from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.get("/posts", validateTokenMiddleware, getPosts);
postRouter.post(
  "/posts",
  validateTokenMiddleware,
  validateSchemaMiddleware(postSchema),
  createPost
);
postRouter.put(
  "/posts",
  validateTokenMiddleware,
  validateSchemaMiddleware(updatePostSchema),
  updatePost
);
postRouter.delete("/post/:id", validateTokenMiddleware, deletePost);

export default postRouter;

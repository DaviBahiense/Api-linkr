import { Router } from "express";
import { getPosts, createPost } from "../controllers/postController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import postSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.get("/home", validateTokenMiddleware, getPosts);
postRouter.post(
  "/home",
  validateSchemaMiddleware(postSchema),
  validateTokenMiddleware,
  createPost
);

export default postRouter;

import { Router } from "express";
import { getPosts } from "../controllers/postController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const postRouter = Router();
postRouter.get("/home", validateTokenMiddleware, getPosts);
export default postRouter;

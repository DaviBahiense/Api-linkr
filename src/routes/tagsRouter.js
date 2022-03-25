import { Router } from "express";
import { getPostsFromATag } from "../controllers/tagsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const tagsRouter = Router();

tagsRouter.get("/hashtags/:hashtag", validateTokenMiddleware, getPostsFromATag);

export default tagsRouter;
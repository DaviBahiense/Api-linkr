import { Router } from "express";
import { getPostsFromATag, getTrendingTags } from "../controllers/tagsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const tagsRouter = Router();

tagsRouter.get("/hashtags/:hashtag", validateTokenMiddleware, getPostsFromATag);
tagsRouter.get("/hashtags", validateTokenMiddleware, getTrendingTags);

export default tagsRouter;
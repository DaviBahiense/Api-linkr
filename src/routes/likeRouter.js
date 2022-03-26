import { Router } from "express";
import { getLikes, handleLike } from "../controllers/likeController.js";
import { checkPostExistence } from "../middlewares/checkPostExistence.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const likeRouter = Router();
likeRouter.post("/likes/:id/:type", validateTokenMiddleware, checkPostExistence, handleLike);
likeRouter.get("/likes/:id", validateTokenMiddleware, checkPostExistence, getLikes)

export default likeRouter;
import { Router } from "express";
import { getReposts, handleRepost } from "../controllers/repostController.js";
import { checkPostExistence } from "../middlewares/checkPostExistence.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const repostRouter = Router()
repostRouter.post('/reposts/:id/:type', validateTokenMiddleware, checkPostExistence, handleRepost);
repostRouter.get('/reposts/:id', validateTokenMiddleware, checkPostExistence, getReposts)

export default repostRouter;
import { Router } from "express";
import { handleFollow, getFollow } from "../controllers/followController.js";
import { checkUserExistence } from "../middlewares/checkUserExistence.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const followRouter = Router()
followRouter.post('/follows/:id/:type', validateTokenMiddleware, checkUserExistence, handleFollow)
followRouter.get('/follows/:id', validateTokenMiddleware, checkUserExistence, getFollow)

export default followRouter;
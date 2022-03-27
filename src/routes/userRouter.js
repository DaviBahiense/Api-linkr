import { Router } from "express";
import { getUser, getUserId } from "../controllers/userController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const userRouter = Router();
userRouter.get('/home', validateTokenMiddleware, getUser);
userRouter.get('/users/:id', validateTokenMiddleware, getUserId)
export default userRouter;
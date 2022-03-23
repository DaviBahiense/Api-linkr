import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const userRouter = Router();
userRouter.get('/home', validateTokenMiddleware, getUser);
export default userRouter;
import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import tagsRouter from "./tagsRouter.js";

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(postRouter);
router.use(tagsRouter);

export default router;

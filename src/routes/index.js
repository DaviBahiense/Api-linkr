import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import tagsRouter from "./tagsRouter.js";
import likeRouter from "./likeRouter.js";
import searchBarRouter from "./searchBarRouter.js";

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(postRouter);
router.use(likeRouter);
router.use(tagsRouter);
router.use(searchBarRouter)

export default router;

import { Router } from "express";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";

const commentRouter = Router();
commentRouter.post("/comment", createComment);
commentRouter.get("/comment/:postId", getComments);

export default commentRouter;

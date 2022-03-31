import { Router } from "express";
import {
  handleFollow,
  getFollow,
  getUserFollow,
} from "../controllers/followController.js";
import { checkUserExistence } from "../middlewares/checkUserExistence.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const followRouter = Router();
followRouter.post(
  "/follows/:id/:type",
  validateTokenMiddleware,
  checkUserExistence,
  handleFollow
);
followRouter.get(
  "/follows/:id",
  validateTokenMiddleware,
  checkUserExistence,
  getFollow
);
followRouter.get("/follows", validateTokenMiddleware, getUserFollow);

export default followRouter;

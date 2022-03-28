import { Router } from "express";
import { searchUsers } from "../controllers/searchBarController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const searchBarRouter = Router();

searchBarRouter.get("/search/:name", validateTokenMiddleware, searchUsers);

export default searchBarRouter;
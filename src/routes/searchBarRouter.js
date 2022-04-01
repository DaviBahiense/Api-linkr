import { Router } from "express";
import { searchUsers, verifyFollow } from "../controllers/searchBarController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const searchBarRouter = Router();

searchBarRouter.get("/search/:name", validateTokenMiddleware, searchUsers);
searchBarRouter.post("/search/verifyFollow/:userId", validateTokenMiddleware, verifyFollow)

export default searchBarRouter;
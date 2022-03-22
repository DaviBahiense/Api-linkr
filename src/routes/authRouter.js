import { Router } from "express";
import { login, singUp } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { singUpSchema, loginSchema } from "../schemas/authSchema.js"

const authRouter = Router();
authRouter.post('/', validateSchemaMiddleware(loginSchema), login);
authRouter.post('/sign-up', validateSchemaMiddleware(singUpSchema), singUp);
export default authRouter;
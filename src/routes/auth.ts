import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

// login route => localhost:3000/auth/login (POST REQUEST)
router.post("/login", AuthController.login);

// change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;
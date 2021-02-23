import { Router } from "express";
import CustomerController from "../controllers/CustomerController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], CustomerController.listAll);

router.get("/:id", [checkJwt, checkRole(["ADMIN"])], CustomerController.getOneById);

export default router;
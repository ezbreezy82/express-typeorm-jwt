import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", EmployeeController.listAll);

router.get("/:id", EmployeeController.getOneById);

export default router;
import { Router } from "express";
import StoreController from "../controllers/StoreController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt, checkRole(['ADMIN'])], StoreController.listAll);

router.get("/:id", [checkJwt, checkRole(['ADMIN'])], StoreController.getOneById)

export default router;
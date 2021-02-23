import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", ProductController.listAll);

router.get("/:id", ProductController.getOneById)

router.delete(
  "/:id",
  ProductController.deleteProduct
);

export default router;
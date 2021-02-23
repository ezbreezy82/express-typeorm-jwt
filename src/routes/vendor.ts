import { Router } from "express";
import VendorController from "../controllers/VendorController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", VendorController.listAll);

router.get("/:id", VendorController.getOnById);

router.delete(
  "/:id([0-9]+)",
  VendorController.deleteVendor
);

export default router;
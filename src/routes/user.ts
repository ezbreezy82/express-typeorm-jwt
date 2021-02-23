import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
// router.get("/", UserController.listAll);

// router.get("/:id", UserController.getOneById);

// get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.getOneById
);

// create a new user
// router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);
router.post("/", UserController.newUser);

// edit one user
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.editUser
);
// router.patch("/:id", UserController.editUser);

// delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.deleteUser
);

export default router;
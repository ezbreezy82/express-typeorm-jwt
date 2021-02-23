import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // get the user id from previous middleware
    const id = res.locals.jwtPayload.userId;

    // ensure all roles are lowercase
    roles = roles.map((r) => r.toLowerCase());

    // get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"],
        relations: ["role"]
      });
    } catch (err) {
      res.status(401).send();
    }
    //check if array off authroized roles includes the user's role
    if (roles.indexOf(user.role.roleName.toLowerCase()) > -1) next();
    else res.status(401).send();
  };
}
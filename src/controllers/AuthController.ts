import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entities/User";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    console.log('login!');
    // Check if username and password are set
    let { username, password } = req.body;
    console.log(req.body);
    if (!(username && password)) {
      res.status = 400;
      res.send('username or password are missing from body');
      return;
    }

    // get user from database
    
    try {
      const userRepository = getRepository(User);
      let user: User;
      user = await userRepository.findOneOrFail({ where: { username } });

      // check if encrypted password match
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send();
        return;
      }

      // sign jwt, valid for 1 hour
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        config.jwtSecret,
        { expiresIn: "1hr" }
      );

      // send the jwt in the response
      console.log(token);
      res.send(token);

    } catch (err) {
      console.log('hit the catch');
      res.status = 401;
      res.send(err);
      // res.status(401).send();
      return;
    }
  };

  static changePassword = async (req: Request, res: Response) => {
    // get id from jwt
    const id = res.locals.jwtPayload.userId;

    // get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    // get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (err) {
      res.status(401).send();
    }

    // check if old password matches
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    // validate the model (password length)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
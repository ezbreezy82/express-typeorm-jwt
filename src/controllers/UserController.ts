import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator"

import { User } from "../entities/User";

class UserController {
    static listAll = async (req: Request, res: Response) => {
        // get users from database
        const userRepository = getRepository(User);
        let users: User[];
        try {
            users = await userRepository.find({
                select: ["id", "username", "roleId", "role"],
                relations: ["role"]
            });
        } catch (err) {
            console.log(err);
        }
        res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {
        // get the id from the url
        const id: number = +req.params.id;

        // get the user from database
        const userRepository = getRepository(User);
        const user = await userRepository.findOneOrFail(id, {
            select: ["id", "username", "role"],
            relations: ["role"]
        });

        res.send(user);
    };

    static newUser = async (req: Request, res: Response) => {
        // get parameters from the body
        let { username, password, role } = req.body;
        let user = new User();
        user.username = username;
        user.password = password;
        user.role = role;
        user.createdAt = new Date();
        user.updatedAt = new Date();

        // validate if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
        }
        
        // hash the password
        user.hashPassword();

        // try to save
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (err) {
            console.log(err);
            res.status(400).send("username already exists");
            return;
        }

        res.status(201).send("User created");
    };

    static editUser = async (req: Request, res: Response) => {
        // get id from url
        const id = req.params.id;

        // get values from the body
        const { username, role } = req.body;
        
        // try to find on db
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (err) {
            // if not found, 404
            res.status(404).send("User not found");
            return;
        }

        // validate new values
        user.username = username;
        user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // try to save
        try {
            await userRepository.save(user);
        } catch (err) {
            res.status(400).send("username already exists");
        }
        res.status = 204;
        res.send("User updated");
    };

    static deleteUser = async (req: Request, res: Response) => {
        // get the id from the url
        const id = req.params.id;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (err) {
            res.status(404).send("User not found");
            return;
        }

        userRepository.delete(user);
        res.status(204).send();
    };
};
export default UserController;
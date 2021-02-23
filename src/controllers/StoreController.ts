import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Store } from "../entities/Store";

class StoreController {
  static listAll = async (req: Request, res: Response) => {
    const sRep = getRepository(Store);
    let stores: Store[];
    try {
      stores = await sRep
        .createQueryBuilder("s")
        .innerJoinAndSelect("s.address", "a")
        .innerJoinAndSelect("s.status", "ss")
        .getMany();
    } catch (err) {
      console.log(err);
    }
    res.send(stores);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    console.log(id);
    const sRep = getRepository(Store);
    let store: Store;
    try {
      store = await sRep
        .createQueryBuilder("s")
        .innerJoinAndSelect("s.address", "a")
        .innerJoinAndSelect("s.status", "ss")
        .andWhere("s.id = :id")
        .setParameter("id", id)
        .getOne();
    } catch (err) {
      res.status = 400
      res.send(err);
      return;
    }

    res.send(store);
  };
}

export default StoreController;
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Customer } from "../entities/Customer";

class CustomerController {
  static listAll = async (req: Request, res: Response) => {
    // get all customers from db
    const customerRepository = getRepository(Customer);
    let customers: Customer[];
    try {
      customers = await customerRepository.find({
        select: ["id", "firstName", "lastName", "address", "email", "birthDate", "memberStartDate", "memberEndDate"],
        relations: ["address"]
      });
    } catch (err) {
      console.log(err);
    }

    res.send(customers);
  };

  static getOneById = async (req: Request, res: Response) => {
    // get id from url
    const id = +req.params.id;

    let customer: Customer;
    let custRep = getRepository(Customer);

    try {
      customer = await custRep
        .findOneOrFail(id, {
          select: ["id", "firstName", "lastName", "address", "email", "birthDate", "memberStartDate", "memberEndDate"],
          relations: ["address"]
        });
    } catch (err) {
      console.log(err);
    }
    res.send([customer]);
  }
};

export default CustomerController;
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator"

import { Employee } from  "../entities/Employee";

class EmployeeController {
  static listAll = async (req: Request, res: Response) => {
    const employeeRepository = getRepository(Employee);
    let employees: Employee[]
    try {
      // employees = await employeeRepository.find({
      //   select: ["id", "ssn", "employeeStartDate", "employeeEndDate", "customer"],
      //   relations: ["customer"]
      // });

      employees = await employeeRepository
        .createQueryBuilder("e")
        .innerJoinAndSelect("e.customer", "c")
        .innerJoinAndSelect("c.address", "a")
        .getMany();
    } catch (err) {
      console.log(err);
    }

    res.send(employees);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = +req.params.id;

    const employeeRepository = getRepository(Employee);
    const employee = await employeeRepository.findOneOrFail(id, {
      select: ["id", "ssn", "employeeStartDate", "employeeEndDate", "customer"],
      relations: ["customer"]
    });

    res.send(employee);
  };
}

export default EmployeeController;
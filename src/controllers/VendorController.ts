import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Vendor } from "../entities/Vendor";

class VendorController {
  static listAll = async (req: Request, res: Response) => {
    const vRep = getRepository(Vendor);
    let vendors: Vendor[];
    try {
      vendors = await vRep.find({
        select: ["id", "name"]
      });
    } catch (err) {
      console.log(err);
    }
    res.send(vendors);
  }; 

  static getOnById = async (req: Request, res: Response) => {
    // get the id from the url
    const id: number = +req.params.id;

    // get the vendor from db
    const vRep = getRepository(Vendor);
    const vendor = await vRep.findOneOrFail(id, {
      select: ["id", "name"]
    });

    res.send(vendor);
  };

  static newVendor = async (req: Request, res: Response) => {
    // get parameters from body
    let { name } = req.body;
    let vendor = new Vendor();
    vendor.name = name;
    
    // validate if the parameters are ok
    const errors = await validate(vendor);
    if (errors.length > 0) {
      res.status(400).send(errors);
    }

    const vRep = getRepository(Vendor);
    try {
      await vRep.save(vendor);
    } catch(err) {
      console.log(err);
      res.status(400).send("vendor already exists");
    }

    res.status(201).send("Vendor created");
  };

  static deleteVendor = async (req: Request, res: Response) => {
    // get the id ffrom the url
    const id: number = +req.params.id;
    const vRep = getRepository(Vendor);
    let vendor: Vendor;
    try {
      vendor = await vRep.findOneOrFail(id, {
        select: ["id", "name"]
      });
    } catch (err) {
      res.status(404).send("Vendor not found");
    }

    vRep.delete(vendor);
    res.status(204).send();
  }
}

export default VendorController;
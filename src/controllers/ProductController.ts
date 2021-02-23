import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Product } from "../entities/Product";

class ProductController {
  static listAll = async (req: Request, res: Response) => {
    // get products from db
    const pRep = getRepository(Product);
    let products: Product[];
    try {
      products = await pRep.find({
        select: ["id", "name", "description", "vendorId", "vendor"],
        relations: ["vendor"]
      });
    } catch (err) {
      console.log(err);
    }
    res.send(products);
  };

  static getOneById = async (req: Request, res: Response) => {
    // get the id from the url
    const id: number = +req.params.id;

    // get the product from db
    const pRep = getRepository(Product);
    const product = await pRep.findOneOrFail(id, {
      select: ["id", "name", "description", "vendorId", "vendor"]
    });
    res.send(product);
  };

  static deleteProduct = async (req: Request, res: Response) => {
    // get the id from the url
    const id = +req.params.id;
    const pRep = getRepository(Product);
    let product: Product;
    try {
      product = await pRep.findOneOrFail(id);
    } catch (err) {
      res.status(404).send("product not found");
    }

    pRep.delete(product);
    res.status(204).send();
  };
}

export default ProductController;
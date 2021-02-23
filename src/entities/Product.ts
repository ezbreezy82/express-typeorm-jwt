import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Vendor } from "./Vendor";

@Entity({
  name: "products"
})
export class Product {

  @PrimaryGeneratedColumn({ name: "ProductID" })
  id: number;

  @Column({ name: "VendorID" })
  vendorId: number;

  @OneToOne(type => Vendor)
  @JoinColumn({ name: "VendorID" })
  vendor: Vendor;

  @Column({ name: "Name" })
  name: string;

  @Column({ name: "Description" })
  description: string;
};
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { Address } from "./Address";

@Entity({
  name: "customers"
})
export class Customer {
  @PrimaryGeneratedColumn({ name: "CustomerID" })
  id: number;

  @Column({ name: "AddressID" })
  addressId: number;

  @OneToOne(type => Address)
  @JoinColumn({ name: "AddressID" })
  address: Address;

  @Column({ name: "FirstName" })
  firstName: string;

  @Column({ name: "LastName" })
  lastName: string;

  @Column({ name: "Email" })
  email: string;

  @Column({ name: "Birthdate" })
  birthDate: Date;

  @Column({ name: "MemberStartDate" })
  memberStartDate: Date;

  @Column({ name: "MemberEndDate" })
  memberEndDate: Date;
}
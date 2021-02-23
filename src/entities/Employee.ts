import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./Customer";

@Entity({
  name: "employees"
})
export class Employee {

  @PrimaryGeneratedColumn({ name: "EmployeeID" })
  id: number;

  @Column({ name: "CustomerID" })
  customerId: number;

  @OneToOne(type => Customer)
  @JoinColumn({ name: "CustomerID" })
  customer: Customer;

  @Column({ name: "SSN" })
  ssn: string;

  @Column({ name: "EmployeeStartDate" })
  employeeStartDate: Date;

  @Column({ name: "EmployeeEndDate" })
  employeeEndDate: Date;
}
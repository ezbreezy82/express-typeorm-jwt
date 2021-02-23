import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm";

@Entity({
  name: "addresses"
})
export class Address extends BaseEntity {
  
  @PrimaryGeneratedColumn({ name: "AddressID" })
  public id: number;

  @Column({ name: "Line1" })
  line1: string;

  @Column({ name: "Line2" })
  line2: string;

  @Column({ name: "City" })
  city: string;

  @Column({ name: "State" })
  state: string;

  @Column({ name: "ZipCode" })
  zipCode: string;
}
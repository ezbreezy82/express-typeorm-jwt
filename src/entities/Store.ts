import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column
} from "typeorm";

import { StoreStatus } from "./StoreStatus";
import { Address } from "./Address";

@Entity({
  name: "stores"
})
export class Store {
  
  @PrimaryGeneratedColumn({ name: "StoreID" })
  id: number;

  @Column({ name: "AddressID" })
  addressId: number;

  @OneToOne(() => Address)
  @JoinColumn({ name: "AddressID" })
  address: Address;

  @Column({ name: "StoreStatusID" })
  statusId: number;

  @OneToOne(() => StoreStatus)
  @JoinColumn({ name: "StoreStatusID" })
  status: StoreStatus;
}
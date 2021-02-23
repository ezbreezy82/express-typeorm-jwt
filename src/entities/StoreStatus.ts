import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity({
  name: "StoreStatusCodes"
})
export class StoreStatus {

  @PrimaryGeneratedColumn({ name: "StoreStatusID" })
  id: number;

  @Column({ name: "StatusCode" })
  code: string;

  @Column({ name: "StatusDescription" })
  desc: string;
}
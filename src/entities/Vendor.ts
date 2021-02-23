import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity({
  name: "vendors"
})
export class Vendor {
  @PrimaryGeneratedColumn({ name: "VendorID" })
  public id: number;

  @Column({ name: "VendorName" })
  public name: string;
};
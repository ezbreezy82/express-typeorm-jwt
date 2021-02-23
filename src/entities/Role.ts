import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
} from "typeorm";

@Entity({
  name: "applicationroles"
})
export class Role {

  @PrimaryGeneratedColumn({ name: "ApplicationRoleID"})
  public id: number;

  @Column({name: "RoleName"})
  public roleName: string;

  @Column({name: "RoleDescription"})
  public roleDesc: string;
}
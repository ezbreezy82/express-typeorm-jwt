import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Role } from "./Role";

@Entity({
    name: "applicationusers"
})
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn({ name: "ApplicationUserID" })
    id: number;

    @Column({ name: "ApplicationRoleID" })
    roleId: number;

    @OneToOne(type => Role)
    @JoinColumn({name: "ApplicationRoleID"})
    role: Role;

    @Column({ name: "Username" })
    @Length(4, 20)
    username: string;

    @Column()
    @Length(4, 45)
    password: string;

    @Column({ name: "CreatedAt"})
    createdAt: Date;

    @Column({name: "UpdatedAt"})
    updatedAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPasword: string) {
        return bcrypt.compareSync(unencryptedPasword, this.password);
    }
}
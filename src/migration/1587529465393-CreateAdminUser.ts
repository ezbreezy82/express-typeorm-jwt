import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entities/User";

export class CreateAdminUser1587529465393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "admin";
        user.password = "admin";
        // user.roleId = 1;
        user.hashPassword();
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }
}

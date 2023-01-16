import { MigrationInterface, QueryRunner } from "typeorm";

export class devices1673828555268 implements MigrationInterface {
    name = 'devices1673828555268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "devices_info" ("id" SERIAL NOT NULL, "virtual_id" character varying NOT NULL, "ip_address" character varying NOT NULL, "mac_address" character varying NOT NULL, "signal" character varying NOT NULL, CONSTRAINT "PK_93ecd8ac0a3e858399d8a25c5df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "devices" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "manufacturer" character varying NOT NULL, "photoUrl" character varying NOT NULL, "info_id" integer, CONSTRAINT "REL_93ecd8ac0a3e858399d8a25c5d" UNIQUE ("info_id"), CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_devices" ("id" SERIAL NOT NULL, "local" character varying NOT NULL, "is_on" boolean NOT NULL, "room" character varying NOT NULL, "userId" integer, "deviceId" integer, CONSTRAINT "PK_c9e7e648903a9e537347aba4371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_93ecd8ac0a3e858399d8a25c5df" FOREIGN KEY ("info_id") REFERENCES "devices_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_e12ac4f8016243ac71fd2e415af" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_e81c41e04269a2d2152f0d60b5c" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_e81c41e04269a2d2152f0d60b5c"`);
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_e12ac4f8016243ac71fd2e415af"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_93ecd8ac0a3e858399d8a25c5df"`);
        await queryRunner.query(`DROP TABLE "user_devices"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TABLE "devices_info"`);
    }

}

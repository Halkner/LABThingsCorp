import { MigrationInterface, QueryRunner } from "typeorm";

export class adaptingToFront1677635813081 implements MigrationInterface {
    name = 'adaptingToFront1677635813081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device_info" ("deviceInfoId" SERIAL NOT NULL, "virtual_id" character varying NOT NULL, "ip_address" character varying NOT NULL, "mac_address" character varying NOT NULL, "signal" character varying NOT NULL, CONSTRAINT "PK_1c61b684253de47a1ee82c17739" PRIMARY KEY ("deviceInfoId"))`);
        await queryRunner.query(`CREATE TABLE "devices" ("deviceId" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "manufacturer" character varying NOT NULL, "photoUrl" character varying NOT NULL, "deviceInfoId" integer, CONSTRAINT "REL_20255a4b93c37c347acc472253" UNIQUE ("deviceInfoId"), CONSTRAINT "PK_666c9b59efda8ca85b29157152c" PRIMARY KEY ("deviceId"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("addressId" SERIAL NOT NULL, "zipCode" character varying NOT NULL, "street" character varying NOT NULL, "houseNumber" integer NOT NULL, "neighborhood" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "complement" character varying, CONSTRAINT "PK_ff59275f5928941ce06f1d8890c" PRIMARY KEY ("addressId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "photo_url" character varying DEFAULT 'https://res.cloudinary.com/dqd4u48y1/image/upload/v1673561527/llama_xx3coq.webp', "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "phone" character varying, "address_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_1b05689f6b6456680d538c3d2e" UNIQUE ("address_id"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "user_devices" ("user_device_id" SERIAL NOT NULL, "is_on" boolean NOT NULL DEFAULT false, "room" character varying NOT NULL, "user_id" integer, "device_id" integer, "location_id" integer, CONSTRAINT "PK_6717b97117db32f918f0f72c64e" PRIMARY KEY ("user_device_id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("locationId" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_e7122a1a349c83acc7286028df7" PRIMARY KEY ("locationId"))`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_20255a4b93c37c347acc4722533" FOREIGN KEY ("deviceInfoId") REFERENCES "device_info"("deviceInfoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "addresses"("addressId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_28bd79e1b3f7c1168f0904ce241" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_7c0755b2e06094d9dfb353a3772" FOREIGN KEY ("device_id") REFERENCES "devices"("deviceId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_34fe9059c52c90b17a63c410e9e" FOREIGN KEY ("location_id") REFERENCES "locations"("locationId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_34fe9059c52c90b17a63c410e9e"`);
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_7c0755b2e06094d9dfb353a3772"`);
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_28bd79e1b3f7c1168f0904ce241"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_20255a4b93c37c347acc4722533"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "user_devices"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TABLE "device_info"`);
    }

}

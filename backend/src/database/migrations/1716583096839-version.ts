import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1716583096839 implements MigrationInterface {
  name = 'Version1716583096839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" ADD "flag" character varying NOT NULL DEFAULT 'default_value'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "flag"`);
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddOcuppationFieldUser1610539007885
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'occupation',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'occupation');
  }
}

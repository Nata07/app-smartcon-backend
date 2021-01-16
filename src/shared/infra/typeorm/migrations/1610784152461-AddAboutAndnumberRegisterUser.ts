import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAboutAndnumberRegisterUser1610784152461
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'register',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'about',
        type: 'varchar',
        isNullable: true,
        length: '1200',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'register');
    await queryRunner.dropColumn('users', 'about');
  }
}

import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class  AddCostumerIdToOrders1740695441944 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders',
        new TableColumn({
          name: 'costumer_id',
          type: 'integer',
          isNullable: true
        }),
      ),
      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          name: 'OrdersCostumer',
          columnNames: ['costumer_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'costumers',
          onDelete: 'SET NULL',
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

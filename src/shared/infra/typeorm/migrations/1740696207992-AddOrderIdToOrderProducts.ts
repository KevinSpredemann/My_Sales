import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class  AddOrderIdToOrderProducts1740696207992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.addColumn(
            'order_products',
            new TableColumn({
              name: 'order_id',
              type: 'integer',
              isNullable: true
            }),
          ),
          await queryRunner.createForeignKey(
            'order_products',
            new TableForeignKey({
              name: 'OrdersProductsOrders',
              columnNames: ['order_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'orders',
              onDelete: 'SET NULL',
            })
          )
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('order_products', 'order_id');
      await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrders');
    }

}

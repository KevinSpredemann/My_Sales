import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class  AddProductIdToOrderProducts1740708639486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
              await queryRunner.addColumn(
                'order_products',
                new TableColumn({
                  name: 'product_id',
                  type: 'integer',
                  isNullable: true
                }),
              ),
              await queryRunner.createForeignKey(
                'order_products',
                new TableForeignKey({
                  name: 'OrdersProductsProduct',
                  columnNames: ['product_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'products',
                  onDelete: 'SET NULL',
                })
              )
            }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('order_products', 'product_id');
      await queryRunner.dropForeignKey('orders_products', 'OrdersProductsProduct');
    }

}

/*
  Warnings:

  - Added the required column `dateUpdated` to the `WarehouseInvoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetWarehouseId` to the `WarehouseInvoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `WarehouseTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryId` to the `WarehouseTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceId` to the `WarehouseTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `checkvouchers` DROP FOREIGN KEY `CheckVouchers_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `counterreceipts` DROP FOREIGN KEY `CounterReceipts_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `customerinvoices` DROP FOREIGN KEY `CustomerInvoices_counterReceiptsId_fkey`;

-- DropForeignKey
ALTER TABLE `customerinvoices` DROP FOREIGN KEY `CustomerInvoices_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `Customers_termId_fkey`;

-- DropForeignKey
ALTER TABLE `customertransactions` DROP FOREIGN KEY `CustomerTransactions_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `customertransactions` DROP FOREIGN KEY `CustomerTransactions_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_warehouseId_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_unitId_fkey`;

-- DropForeignKey
ALTER TABLE `supplierinvoices` DROP FOREIGN KEY `SupplierInvoices_checkVouchersId_fkey`;

-- DropForeignKey
ALTER TABLE `supplierinvoices` DROP FOREIGN KEY `SupplierInvoices_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `suppliers` DROP FOREIGN KEY `Suppliers_termId_fkey`;

-- DropForeignKey
ALTER TABLE `suppliertransactions` DROP FOREIGN KEY `SupplierTransactions_inventoryId_fkey`;

-- DropForeignKey
ALTER TABLE `suppliertransactions` DROP FOREIGN KEY `SupplierTransactions_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `suppliertransactions` DROP FOREIGN KEY `SupplierTransactions_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `warehouseinvoices` DROP FOREIGN KEY `WarehouseInvoices_warehouseId_fkey`;

-- AlterTable
ALTER TABLE `warehouseinvoices` ADD COLUMN `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateUpdated` DATETIME(3) NOT NULL,
    ADD COLUMN `targetWarehouseId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `warehousetransactions` ADD COLUMN `count` INTEGER NOT NULL,
    ADD COLUMN `inventoryId` INTEGER NOT NULL,
    ADD COLUMN `invoiceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brands`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Suppliers` ADD CONSTRAINT `Suppliers_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `Terms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customers` ADD CONSTRAINT `Customers_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `Terms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplierTransactions` ADD CONSTRAINT `SupplierTransactions_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplierTransactions` ADD CONSTRAINT `SupplierTransactions_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplierTransactions` ADD CONSTRAINT `SupplierTransactions_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `SupplierInvoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplierInvoices` ADD CONSTRAINT `SupplierInvoices_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplierInvoices` ADD CONSTRAINT `SupplierInvoices_checkVouchersId_fkey` FOREIGN KEY (`checkVouchersId`) REFERENCES `CheckVouchers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTransactions` ADD CONSTRAINT `CustomerTransactions_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `CustomerInvoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTransactions` ADD CONSTRAINT `CustomerTransactions_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerInvoices` ADD CONSTRAINT `CustomerInvoices_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerInvoices` ADD CONSTRAINT `CustomerInvoices_counterReceiptsId_fkey` FOREIGN KEY (`counterReceiptsId`) REFERENCES `CounterReceipts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WarehouseTransactions` ADD CONSTRAINT `WarehouseTransactions_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WarehouseTransactions` ADD CONSTRAINT `WarehouseTransactions_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `WarehouseInvoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WarehouseInvoices` ADD CONSTRAINT `WarehouseInvoices_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CounterReceipts` ADD CONSTRAINT `CounterReceipts_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckVouchers` ADD CONSTRAINT `CheckVouchers_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

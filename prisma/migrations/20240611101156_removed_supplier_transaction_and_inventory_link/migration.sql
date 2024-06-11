/*
  Warnings:

  - You are about to drop the column `inventoryId` on the `suppliertransactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `suppliertransactions` DROP FOREIGN KEY `SupplierTransactions_inventoryId_fkey`;

-- AlterTable
ALTER TABLE `suppliertransactions` DROP COLUMN `inventoryId`;

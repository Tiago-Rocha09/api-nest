/*
  Warnings:

  - You are about to drop the column `subscription_id` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `subscription_id`,
    ADD COLUMN `transaction_id` VARCHAR(200) NULL;

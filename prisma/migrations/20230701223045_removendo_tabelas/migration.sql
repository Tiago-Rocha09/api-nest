/*
  Warnings:

  - You are about to drop the `banners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `react` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `read_message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `banners`;

-- DropTable
DROP TABLE `groups`;

-- DropTable
DROP TABLE `messages`;

-- DropTable
DROP TABLE `notification_tokens`;

-- DropTable
DROP TABLE `react`;

-- DropTable
DROP TABLE `read_message`;

-- DropTable
DROP TABLE `subscriptions`;

-- DropTable
DROP TABLE `transactions`;

-- CreateTable
CREATE TABLE `plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NULL,
    `description` LONGTEXT NULL,
    `type` VARCHAR(100) NULL,
    `value` FLOAT NULL,
    `logo` LONGTEXT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `plan_id` INTEGER NOT NULL,
    `subscription_id` VARCHAR(200) NULL,
    `payment_amount` FLOAT NOT NULL,
    `status_text` VARCHAR(200) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `payment_type` VARCHAR(100) NOT NULL,
    `start_date` TIMESTAMP(0) NULL,
    `due_date` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

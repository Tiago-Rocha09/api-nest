-- CreateTable
CREATE TABLE `banners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `banner_url` LONGTEXT NULL,
    `status` INTEGER NULL,
    `banner_order` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,
    `teste` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
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
CREATE TABLE `messages` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `type` VARCHAR(200) NOT NULL,
    `text` LONGTEXT NOT NULL,
    `url` LONGTEXT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_tokens` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `token` VARCHAR(200) NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `constraint_user_id_token`(`user_id`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `react` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_group` INTEGER NOT NULL,
    `id_message` INTEGER NOT NULL,
    `type` VARCHAR(200) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `read_message` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_grupo` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_last_message` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `id_grupo`(`id_grupo`, `id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recupera_senha` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `code` VARCHAR(200) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,
    `subscription_id` VARCHAR(200) NULL,
    `payment_amount` FLOAT NOT NULL,
    `status_text` VARCHAR(200) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `payment_type` VARCHAR(100) NOT NULL,
    `current_incoice_uuid` VARCHAR(200) NULL,
    `due_date` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `subscription_id` VARCHAR(200) NOT NULL,
    `transaction_id` VARCHAR(200) NOT NULL,
    `status` VARCHAR(200) NOT NULL,
    `payment_amount` FLOAT NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_google` VARCHAR(200) NOT NULL,
    `cpf` VARCHAR(20) NULL,
    `name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NULL,
    `fone` VARCHAR(20) NOT NULL,
    `birthday` DATE NULL,
    `password` VARCHAR(200) NOT NULL,
    `address_cep` VARCHAR(20) NOT NULL,
    `address_state` VARCHAR(100) NOT NULL,
    `address_city` VARCHAR(100) NOT NULL,
    `address_district` VARCHAR(100) NOT NULL,
    `address_street` VARCHAR(100) NOT NULL,
    `address_number` VARCHAR(10) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `mensagemBoasVindas` INTEGER NOT NULL,
    `root` BOOLEAN NOT NULL DEFAULT false,
    `plan` VARCHAR(100) NOT NULL DEFAULT '0',
    `last_access` TIMESTAMP(0) NULL,

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `cpf_unique`(`cpf`),
    UNIQUE INDEX `email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


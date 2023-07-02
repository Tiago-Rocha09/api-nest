-- AlterTable
ALTER TABLE `users` MODIFY `id_google` VARCHAR(200) NULL,
    MODIFY `address_cep` VARCHAR(20) NULL,
    MODIFY `address_state` VARCHAR(100) NULL,
    MODIFY `address_city` VARCHAR(100) NULL,
    MODIFY `address_district` VARCHAR(100) NULL,
    MODIFY `address_street` VARCHAR(100) NULL,
    MODIFY `address_number` VARCHAR(10) NULL,
    MODIFY `mensagemBoasVindas` INTEGER NOT NULL DEFAULT 0;

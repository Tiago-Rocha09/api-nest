import { BadRequestException } from '@nestjs/common';

export class DuplicatedFieldException extends BadRequestException {
  constructor(fieldName: string) {
    super(`O campo '${fieldName}' está duplicado.`);
  }
}

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DuplicatedFieldException } from '../duplicated-field.exception';

@Catch(DuplicatedFieldException)
export class DuplicatedFieldExceptionFilter implements ExceptionFilter {
  catch(exception: DuplicatedFieldException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}

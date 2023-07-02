import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TransformSignUpDataPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ value });

    if (metadata.type === 'body') {
      value.cpf = value.cpf.replace(/\D/g, '');
      value.phone = value.phone.replace(/\D/g, '');
    }
    console.log({ valueTransformed: value });

    return value;
  }
}
